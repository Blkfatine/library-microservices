import { useState, useEffect } from 'react'
import axios from 'axios'
import BookCard from '../components/BookCard'

export default function Recommendations() {
    const [recommendations, setRecommendations] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchRecommendations()
    }, [])

    const fetchRecommendations = async () => {
        try {
            // Using the existing endpoint for recommendations
            const res = await axios.get('/api/books/recommandations')
            setRecommendations(res.data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                    <span className="text-4xl">🤖</span> Recommandations IA
                </h1>
                <p className="text-slate-500 mt-2">
                    Basé sur vos lectures précédentes et les tendances actuelles, voici une sélection de livres que vous pourriez aimer.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center py-10"><span className="loading loading-spinner loading-lg text-primary"></span></div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {recommendations.map(livre => (
                        <BookCard key={livre.id} livre={livre} />
                    ))}
                </div>
            )}
        </div>
    )
}
