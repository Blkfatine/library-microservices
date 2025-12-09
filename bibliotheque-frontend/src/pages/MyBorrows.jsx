import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function MyBorrows() {
    const { user } = useAuth()
    const [emprunts, setEmprunts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            fetchEmprunts()
        }
    }, [user])

    const fetchEmprunts = async () => {
        try {
            const res = await axios.get(`/api/emprunts/utilisateur/${user.id}`)
            setEmprunts(res.data)
        } catch (err) {
            console.error("Erreur chargement emprunts", err)
        } finally {
            setLoading(false)
        }
    }

    const getStatusBadge = (emprunt) => {
        const today = new Date()
        const dateRetour = new Date(emprunt.dateRetourPrevue)

        if (emprunt.dateRetourReelle) {
            return <span className="badge badge-success badge-outline">Retourné</span>
        } else if (dateRetour < today) {
            return <span className="badge badge-error text-white">En Retard</span>
        } else {
            return <span className="badge badge-info text-white">En Cours</span>
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Mes Emprunts</h1>

            {loading ? (
                <div className="flex justify-center py-10"><span className="loading loading-spinner loading-lg text-primary"></span></div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold">
                                <tr>
                                    <th className="py-4">Livre</th>
                                    <th>Date d'emprunt</th>
                                    <th>Date limite</th>
                                    <th>Statut</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {emprunts.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-8 text-slate-400">
                                            Vous n'avez aucun emprunt en cours.
                                        </td>
                                    </tr>
                                ) : (
                                    emprunts.map(emprunt => (
                                        <tr key={emprunt.id} className="hover:bg-slate-50 transition-colors">
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar placeholder">
                                                        <div className="bg-neutral-focus text-neutral-content rounded-lg w-12 h-16 bg-slate-200">
                                                            <span className="text-xl">📕</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-800">Livre #{emprunt.livreId}</div>
                                                        <div className="text-xs text-slate-500">ID: {emprunt.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{new Date(emprunt.dateEmprunt).toLocaleDateString()}</td>
                                            <td className="font-medium text-slate-700">{new Date(emprunt.dateRetourPrevue).toLocaleDateString()}</td>
                                            <td>{getStatusBadge(emprunt)}</td>
                                            <td>
                                                {!emprunt.dateRetourReelle && (
                                                    <button className="btn btn-xs btn-outline btn-primary">
                                                        Prolonger
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
