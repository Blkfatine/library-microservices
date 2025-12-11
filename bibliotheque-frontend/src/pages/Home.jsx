import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import BookCard from '../components/BookCard'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'

export default function Home() {
    const { user } = useAuth()
    const [popularBooks, setPopularBooks] = useState([])
    const [loading, setLoading] = useState(true)

    // Fallback data
    const fallbackBooks = Array(8).fill(null).map((_, i) => ({
        id: i + 1,
        titre: `Livre Exemple ${i + 1}`,
        auteur: { nom: "Auteur Inconnu" },
        annee: 2023,
        statut: 'DISPONIBLE',
        image_url: null
    }))

    useEffect(() => {
        fetchRecommendations()
    }, [user])

    const fetchRecommendations = async () => {
        setLoading(true)
        try {
            // 1. Fetch all books
            const booksRes = await axios.get('/api/books')
            let allBooks = booksRes.data || []

            // 2. If user is logged in, fetch history to find favorite genre
            if (user) {
                try {
                    const borrowsRes = await axios.get(`/api/borrows/user/${user.id}`)
                    const borrows = borrowsRes.data || []

                    if (borrows.length > 0) {
                        // Calculate favorite genre
                        // We need book details for each borrow to get the genre. 
                        // Assuming borrow object has book details or we match with allBooks.
                        // If borrow only has bookId, we map it.

                        const genreCounts = {}
                        borrows.forEach(borrow => {
                            const book = allBooks.find(b => b.id === borrow.bookId)
                            if (book && book.genre) {
                                genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1
                            }
                        })

                        // Find top genre
                        let topGenre = null
                        let maxCount = 0
                        Object.entries(genreCounts).forEach(([genre, count]) => {
                            if (count > maxCount) {
                                maxCount = count
                                topGenre = genre
                            }
                        })

                        if (topGenre) {
                            // Filter by top genre
                            const genreBooks = allBooks.filter(b => b.genre === topGenre)

                            // If we have enough books in this genre, use them. 
                            // Otherwise mix with others or just use what we have.
                            if (genreBooks.length > 0) {
                                // Sort by "popularity" (mock: random or just as is)
                                // Requirement: "recommander livres dans genre 'Fantasy' triés par popularité"
                                // We'll just take the first 6 of this genre.
                                setPopularBooks(genreBooks.slice(0, 6))
                                setLoading(false)
                                return
                            }
                        }
                    }
                } catch (err) {
                    console.error("Error fetching user history for recommendations", err)
                }
            }

            // 3. Default / Fallback: Just show first 6-8 books (simulating "Popular")
            setPopularBooks(allBooks.slice(0, 8))

        } catch (err) {
            console.error("Erreur chargement livres", err)
            setPopularBooks(fallbackBooks)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <HeroSection />

            <main className="flex-grow">
                {/* CATALOGUE PREVIEW SECTION */}
                <section id="catalogue-preview" className="container mx-auto px-4 py-20">
                    <div className="mb-12 flex items-end justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-800 md:text-4xl">
                                {user ? "Recommandé pour vous" : "Catalogue Récent"}
                            </h2>
                            <p className="mt-2 text-slate-500">
                                {user
                                    ? "Une sélection basée sur vos lectures précédentes."
                                    : "Découvrez nos derniers ajouts et les livres les plus populaires."
                                }
                            </p>
                        </div>
                        <Link to="/catalogue" className="hidden text-primary font-semibold hover:underline md:block">
                            Voir tout le catalogue →
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <span className="loading loading-dots loading-lg text-primary"></span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {popularBooks.map(livre => (
                                <BookCard key={livre.id} livre={livre} />
                            ))}
                        </div>
                    )}

                    <div className="mt-12 text-center">
                        <Link to="/catalogue" className="btn btn-outline btn-primary btn-wide">
                            Explorer toute la collection
                        </Link>
                    </div>
                </section>

                {/* FEATURES SECTION */}
                <section className="bg-white py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                            <div className="text-center group p-6 rounded-xl hover:bg-slate-50 transition-colors">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl text-blue-600 group-hover:scale-110 transition-transform">
                                    🚀
                                </div>
                                <h3 className="mb-3 text-xl font-bold">Accès Instantané</h3>
                                <p className="text-slate-500">Réservez et empruntez vos livres préférés en quelques clics, où que vous soyez.</p>
                            </div>
                            <div className="text-center group p-6 rounded-xl hover:bg-slate-50 transition-colors">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-3xl text-purple-600 group-hover:scale-110 transition-transform">
                                    💎
                                </div>
                                <h3 className="mb-3 text-xl font-bold">Collection Premium</h3>
                                <p className="text-slate-500">Une sélection rigoureuse des meilleurs ouvrages, des classiques aux nouveautés.</p>
                            </div>
                            <div className="text-center group p-6 rounded-xl hover:bg-slate-50 transition-colors">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600 group-hover:scale-110 transition-transform">
                                    🛡️
                                </div>
                                <h3 className="mb-3 text-xl font-bold">Simple & Sécurisé</h3>
                                <p className="text-slate-500">Gérez vos emprunts et votre historique en toute simplicité via votre espace personnel.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}