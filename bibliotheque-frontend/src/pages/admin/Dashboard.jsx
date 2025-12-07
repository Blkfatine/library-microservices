import { useEffect, useState } from 'react'
import axios from 'axios'
import { Bar, Pie, Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement)

export default function Dashboard() {
    const [stats, setStats] = useState({ livres: 0, emprunts: 0, retards: 0 })

    useEffect(() => {
        Promise.all([
            axios.get('http://localhost:8080/api/books'),
            axios.get('http://localhost:8080/api/emprunts/retards')
        ]).then(([livresRes, retardsRes]) => {
            setStats({
                livres: livresRes.data.length,
                emprunts: livresRes.data.filter(l => l.statut === 'EMPRUNTE').length,
                retards: retardsRes.data.length
            })
        })
    }, [])

    const barData = {
        labels: ['Livres totaux', 'Empruntés', 'En retard'],
        datasets: [{
            label: 'Statistiques',
            data: [stats.livres, stats.emprunts, stats.retards],
            backgroundColor: ['#3b82f6', '#10b981', '#ef4444']
        }]
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-5xl font-bold text-center mb-12 text-primary">Dashboard Administrateur</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="stats shadow bg-blue-500 text-white">
                    <div className="stat">
                        <div className="stat-title text-white">Livres</div>
                        <div className="stat-value">{stats.livres}</div>
                    </div>
                </div>
                <div className="stats shadow bg-green-500 text-white">
                    <div className="stat">
                        <div className="stat-title text-white">Empruntés</div>
                        <div className="stat-value">{stats.emprunts}</div>
                    </div>
                </div>
                <div className="stats shadow bg-red-500 text-white">
                    <div className="stat">
                        <div className="stat-title text-white">En retard</div>
                        <div className="stat-value">{stats.retards}</div>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-2xl p-8">
                <Bar data={barData} options={{ responsive: true }} />
            </div>
        </div>
    )
}