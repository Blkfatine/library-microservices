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

    useEffect(() => {
        // Mock data fetching - replace with real API calls
        // const fetchStats = async () => { ... }
        setStats({
            totalLivres: 1250,
            totalEmprunts: 85,
            totalUtilisateurs: 340,
            livresPerdus: 12
        })
    }, [])

    const barData = {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [
            {
                label: 'Emprunts',
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
            },
        ],
    }

    const doughnutData = {
        labels: ['Disponibles', 'Empruntés', 'Perdus'],
        datasets: [
            {
                data: [1250 - 85 - 12, 85, 12],
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