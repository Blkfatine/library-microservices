import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function LivreDetail() {
    const { id } = useParams()
    const [livre, setLivre] = useState(null)
    const { user } = useAuth()

    useEffect(() => {
        axios.get(`http://localhost:8080/api/books/${id}`)
            .then(res => setLivre(res.data))
    }, [id])

    const emprunter = () => {
        axios.post(`http://localhost:8080/api/emprunts/emprunter/${id}`, {}, {
            headers: { 'X-User-Id': user.id }
        }).then(() => {
            alert("Livre emprunté avec succès !")
            setLivre({...livre, statut: 'EMPRUNTE'})
        }).catch(() => alert("Erreur lors de l'emprunt"))
    }

    if (!livre) return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg"></span></div>

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="flex justify-center">
                    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl w-96 h-96 md:w-full md:h-full max-w-lg flex items-center justify-center border-8 border-dashed border-gray-300">
                        <span className="text-9xl opacity-40">Book</span>
                    </div>
                </div>

                <div>
                    <h1 className="text-5xl font-bold mb-4">{livre.titre}</h1>
                    <p className="text-2xl text-primary mb-6">par {livre.auteur?.nom || 'Inconnu'}</p>

                    <div className="space-y-4 text-lg">
                        <p><strong>Genre :</strong> {livre.genre}</p>
                        <p><strong>Année :</strong> {livre.annee}</p>
                        <p><strong>Description :</strong> {livre.description || 'Aucune description disponible.'}</p>
                        <p><strong>Statut :</strong>
                            <span className={`ml-2 badge badge-lg ${livre.statut === 'DISPONIBLE' ? 'badge-success' : 'badge-error'}`}>
                {livre.statut === 'DISPONIBLE' ? 'Disponible' : 'Emprunté'}
              </span>
                        </p>
                    </div>

                    {user && livre.statut === 'DISPONIBLE' && (
                        <button onClick={emprunter} className="btn btn-success btn-lg mt-8">
                            Emprunter ce livre
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}