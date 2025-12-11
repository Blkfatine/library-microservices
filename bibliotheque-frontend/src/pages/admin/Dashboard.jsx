import { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import axios from 'axios'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
)

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalLivres: 0,
        totalEmprunts: 0,
        totalUtilisateurs: 0,
        livresPerdus: 0
    })
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            // Parallel fetching for better performance
            const [booksRes, usersRes, requestsRes] = await Promise.all([
                axios.get('/books'),
                axios.get('/users'),
                axios.get('/borrow/requests') // Assuming this endpoint returns all requests or pending ones
            ])

            const books = booksRes.data || []
            const users = usersRes.data || []
            const allRequests = requestsRes.data || []

            // Calculate stats
            const totalLivres = books.length
            const totalEmprunts = books.filter(b => b.statut === 'EMPRUNTÉ').length
            const livresPerdus = books.filter(b => b.statut === 'PERDU').length
            const totalUtilisateurs = users.length

            setStats({
                totalLivres,
                totalEmprunts,
                totalUtilisateurs,
                livresPerdus
            })

            // Filter pending requests
            setRequests(allRequests.filter(r => r.status === 'PENDING'))

        } catch (error) {
            console.error("Error fetching dashboard data", error)
        } finally {
            setLoading(false)
        }
    }

    const handleRequestAction = async (requestId, action) => {
        try {
            // action: 'approve' or 'reject'
            // Assuming endpoints: POST /borrow/requests/{id}/approve or /reject
            // Or PUT /borrow/requests/{id} with status

            // Based on requirements: "appeler borrow-service via API Gateway pour approuver la demande"
            // We'll assume a standard REST pattern or specific action endpoints.
            // Let's try PUT with status update first as it's common.

            const status = action === 'approve' ? 'APPROVED' : 'REJECTED'
            await axios.put(`/borrow/requests/${requestId}`, { status })

            // Refresh data
            fetchData()

            // Show toast/alert (simplified)
            alert(`Demande ${action === 'approve' ? 'validée' : 'refusée'} avec succès`)
        } catch (error) {
            console.error(`Error ${action} request`, error)
            alert("Une erreur est survenue")
        }
    }

    const barData = {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [
            {
                label: 'Emprunts',
                data: [65, 59, 80, 81, 56, 55], // Mock data for history as we don't have historical endpoint yet
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
            },
        ],
    }

    const doughnutData = {
        labels: ['Disponibles', 'Empruntés', 'Perdus'],
        datasets: [
            {
                data: [stats.totalLivres - stats.totalEmprunts - stats.livresPerdus, stats.totalEmprunts, stats.livresPerdus],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.5)',
                    'rgba(59, 130, 246, 0.5)',
                    'rgba(239, 68, 68, 0.5)',
                ],
                borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(239, 68, 68, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    if (loading) return <div className="p-8 text-center">Chargement...</div>

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-8">Tableau de Bord Administrateur</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="card bg-white shadow-sm p-6 border-l-4 border-blue-500">
                    <div className="text-slate-500 text-sm uppercase font-bold">Total Livres</div>
                    <div className="text-3xl font-bold text-slate-800">{stats.totalLivres}</div>
                </div>
                <div className="card bg-white shadow-sm p-6 border-l-4 border-green-500">
                    <div className="text-slate-500 text-sm uppercase font-bold">Emprunts Actifs</div>
                    <div className="text-3xl font-bold text-slate-800">{stats.totalEmprunts}</div>
                </div>
                <div className="card bg-white shadow-sm p-6 border-l-4 border-purple-500">
                    <div className="text-slate-500 text-sm uppercase font-bold">Utilisateurs</div>
                    <div className="text-3xl font-bold text-slate-800">{stats.totalUtilisateurs}</div>
                </div>
                <div className="card bg-white shadow-sm p-6 border-l-4 border-red-500">
                    <div className="text-slate-500 text-sm uppercase font-bold">Livres Perdus</div>
                    <div className="text-3xl font-bold text-slate-800">{stats.livresPerdus}</div>
                </div>
            </div>

            {/* Borrow Requests Section */}
            <div className="card bg-white shadow-sm p-6 mb-12">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    Demandes d'emprunt en attente
                    {requests.length > 0 && <span className="badge badge-primary">{requests.length}</span>}
                </h3>

                {requests.length === 0 ? (
                    <p className="text-slate-500 italic">Aucune demande en attente.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Utilisateur</th>
                                    <th>Livre</th>
                                    <th>Retour Prévu</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map(req => (
                                    <tr key={req.id}>
                                        <td>{new Date(req.dateEmprunt).toLocaleDateString()}</td>
                                        <td>
                                            <div className="font-bold">{req.prenom} {req.nom}</div>
                                            <div className="text-xs opacity-50">{req.email}</div>
                                        </td>
                                        <td>Livre #{req.bookId}</td>
                                        <td>{new Date(req.dateRetour).toLocaleDateString()}</td>
                                        <td className="flex gap-2">
                                            <button
                                                onClick={() => handleRequestAction(req.id, 'approve')}
                                                className="btn btn-sm btn-success text-white"
                                            >
                                                Valider
                                            </button>
                                            <button
                                                onClick={() => handleRequestAction(req.id, 'reject')}
                                                className="btn btn-sm btn-error text-white"
                                            >
                                                Refuser
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card bg-white shadow-sm p-6">
                    <h3 className="text-xl font-bold mb-6">Évolution des Emprunts</h3>
                    <Bar options={{ responsive: true }} data={barData} />
                </div>
                <div className="card bg-white shadow-sm p-6">
                    <h3 className="text-xl font-bold mb-6">État du Stock</h3>
                    <div className="w-2/3 mx-auto">
                        <Doughnut data={doughnutData} />
                    </div>
                </div>
            </div>
        </div>
    )
}