import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import Footer from '../components/Footer'

export default function LivreDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [livre, setLivre] = useState(null)
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [empruntLoading, setEmpruntLoading] = useState(false)

    useEffect(() => {
        fetchData()
    }, [id])

    const fetchData = async () => {
        try {
            const res = await axios.get(`/api/books/${id}`)
            setLivre(res.data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const emprunter = async () => {
        if (!user) {
            navigate('/login')
            return
        }

        setEmpruntLoading(true)
        try {
            await axios.post(`/api/emprunts/emprunter/${id}`, {}, {
                headers: { 'X-User-Id': user.id }
            })
            alert("Livre emprunté avec succès ! Vous avez 14 jours pour le rendre.")
            setLivre({ ...livre, statut: 'EMPRUNTE' })
        } catch (err) {
            console.error(err)
            alert("Erreur lors de l'emprunt. Vous avez peut-être atteint votre limite ou le livre n'est plus disponible.")
        } finally {
            setEmpruntLoading(false)
        }
    }

    if (loading) return <div className="flex justify-center py-20 min-h-screen items-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>
    if (!livre) return <div className="text-center py-20 min-h-screen flex items-center justify-center">Livre introuvable</div>

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-20">
            <div className="container mx-auto px-4 py-12 flex-grow">
                <div className="card lg:card-side bg-white shadow-xl overflow-hidden">
                    <figure className="lg:w-1/3 bg-gray-100 relative min-h-[500px]">
                        {livre.imageUrl ? (
                            <img src={livre.imageUrl} alt={livre.titre} className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-gray-300 bg-slate-200">
                                <span className="text-9xl">📖</span>
                            </div>
                        )}
                        <div className="absolute top-4 left-4">
                            <button onClick={() => navigate(-1)} className="btn btn-circle btn-sm bg-white/80 border-none hover:bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            </button>
                        </div>
                    </figure>

                    <div className="card-body lg:w-2/3 p-8 lg:p-12">
                        <div className="flex flex-col h-full">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`badge badge-lg ${livre.statut === 'DISPONIBLE' ? 'badge-success text-white' : 'badge-error text-white'}`}>
                                        {livre.statut === 'DISPONIBLE' ? 'Disponible' : 'Indisponible'}
                                    </div>
                                    <span className="text-sm text-gray-400 font-mono">ISBN: {livre.isbn || 'N/A'}</span>
                                </div>

                                <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-800">{livre.titre}</h1>
                                <p className="text-2xl text-slate-500 mb-8">par <span className="text-primary font-semibold">{livre.auteur?.nom || 'Auteur Inconnu'}</span></p>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-6 bg-slate-50 rounded-xl border border-slate-100">
                                    <div>
                                        <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Genre</span>
                                        <span className="font-semibold text-slate-700">{livre.genre}</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Année</span>
                                        <span className="font-semibold text-slate-700">{livre.annee}</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Langue</span>
                                        <span className="font-semibold text-slate-700">{livre.langue || 'Français'}</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Éditeur</span>
                                        <span className="font-semibold text-slate-700">{livre.editeur || 'Non spécifié'}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3">Résumé</h3>
                                <p className="text-lg leading-relaxed text-slate-600 mb-8">
                                    {livre.description || "Aucune description n'est disponible pour cet ouvrage. Ce livre fait partie de notre collection et est disponible à l'emprunt selon les conditions habituelles de la bibliothèque."}
                                </p>
                            </div>

                            <div className="mt-auto pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-end items-center">
                                {livre.statut === 'DISPONIBLE' ? (
                                    <button
                                        onClick={emprunter}
                                        disabled={empruntLoading}
                                        className={`btn btn-primary btn-lg px-12 shadow-xl shadow-primary/20 ${empruntLoading ? 'loading' : ''}`}
                                    >
                                        {empruntLoading ? 'Traitement...' : 'Emprunter ce livre'}
                                    </button>
                                ) : (
                                    <button disabled className="btn btn-disabled btn-lg px-12 bg-slate-100 text-slate-400">
                                        Actuellement indisponible
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}