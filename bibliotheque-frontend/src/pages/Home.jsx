import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import BookCard from '../components/BookCard'
import Footer from '../components/Footer'

export default function Home() {
    const [popularBooks, setPopularBooks] = useState([])
    const [loading, setLoading] = useState(true)

    // Fallback data
    const fallbackBooks = Array(8).fill(null).map((_, i) => ({
        id: i + 1,
        titre: `Livre Exemple ${i + 1}`,
        auteur: { nom: "Auteur Inconnu" },
        annee: 2023,
        statut: 'DISPONIBLE',
        imageUrl: null
    }))

    useEffect(() => {
        fetchPopularBooks()
    }, [])

    const fetchPopularBooks = async () => {
        try {
            const res = await axios.get('/api/books/recommandations')
            if (res.data && res.data.length > 0) {
                setPopularBooks(res.data)
            } else {
                setPopularBooks(fallbackBooks)
            }
        } catch (err) {
            console.error("Erreur chargement livres populaires", err)
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
                            <h2 className="text-3xl font-bold text-slate-800 md:text-4xl">Catalogue Récent</h2>
                            <p className="mt-2 text-slate-500">Découvrez nos derniers ajouts et les livres les plus populaires.</p>
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