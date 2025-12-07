import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function Profil() {
    const { user } = useAuth()
    const [emprunts, setEmprunts] = useState([])

    useEffect(() => {
        if (user) {
            axios.get('http://localhost:8080/api/emprunts/mes-emprunts', {
                headers: { 'X-User-Id': user.id }
            }).then(res => setEmprunts(res.data))
        }
    }, [user])

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Mon Profil</h1>
            <div className="card bg-base-100 shadow-xl p-8 mb-8">
                <p><strong>Email :</strong> {user?.email}</p>
                <p><strong>Rôle :</strong> <span className="badge badge-primary">{user?.role}</span></p>
            </div>

            <h2 className="text-3xl font-bold mb-6">Mes emprunts</h2>
            <div className="grid gap-6">
                {emprunts.map(e => (
                    <div key={e.id} className="card bg-base-100 shadow-lg p-6">
                        <p><strong>Livre ID :</strong> {e.livreId}</p>
                        <p><strong>Date emprunt :</strong> {new Date(e.dateEmprunt).toLocaleDateString()}</p>
                        <p><strong>Retour prévu :</strong> {new Date(e.dateRetourPrevue).toLocaleDateString()}</p>
                        {e.retard && <div className="badge badge-error mt-2">EN RETARD</div>}
                    </div>
                ))}
            </div>
        </div>
    )
}