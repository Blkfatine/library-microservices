import { useState, useEffect } from 'react'
import axios from 'axios'
import BookCard from '../components/BookCard'
import Footer from '../components/Footer'

export default function Catalogue() {
    const [livres, setLivres] = useState([])
    const [loading, setLoading] = useState(true)

    // Filters
    const [search, setSearch] = useState('')
    const [genre, setGenre] = useState('')
    const [auteur, setAuteur] = useState('')

    // Derived lists for filter dropdowns
    const [genres, setGenres] = useState([])
    const [auteurs, setAuteurs] = useState([])

    // Pagination
    const [visibleCount, setVisibleCount] = useState(24)

    useEffect(() => {
        fetchBooks()
    }, [search, genre, auteur])

    const fetchBooks = async () => {
        setLoading(true)
        try {
            // Build query params
            const params = new URLSearchParams()
            if (search) params.append('titre', search)
            if (genre) params.append('genre', genre)
            if (auteur) params.append('auteur', auteur)

            const url = params.toString()
                ? `/api/books/search?${params.toString()}`
                : '/api/books'

            const res = await axios.get(url)
            setLivres(res.data)

            // Extract unique values for filters
            if (!genre && !auteur && !search) {
                setGenres([...new Set(res.data.map(l => l.genre).filter(Boolean))])
                setAuteurs([...new Set(res.data.map(l => l.auteur?.nom).filter(Boolean))])
            }
        } catch (err) {
            console.error("Erreur chargement catalogue", err)
        } finally {
            setLoading(false)
        }
    }

    const loadMore = () => {
        setVisibleCount(prev => prev + 12)
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-20">
            <div className="container mx-auto px-4 py-8 flex-grow">
                <h1 className="text-4xl font-bold text-center mb-10 text-slate-800">📚 Notre Collection Complète</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className="w-full lg:w-1/4 space-y-6">
                        <div className="card bg-white shadow-lg p-6 sticky top-24">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                                Filtres
                            </h3>

                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-medium">Recherche</span></label>
                                <input
                                    type="text"
                                    placeholder="Titre..."
                                    className="input input-bordered w-full bg-slate-50"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>

                            <div className="form-control w-full mt-4">
                                <label className="label"><span className="label-text font-medium">Genre</span></label>
                                <select className="select select-bordered bg-slate-50" value={genre} onChange={e => setGenre(e.target.value)}>
                                    <option value="">Tous les genres</option>
                                    {genres.map(g => <option key={g} value={g}>{g}</option>)}
                                </select>
                            </div>

                            <div className="form-control w-full mt-4">
                                <label className="label"><span className="label-text font-medium">Auteur</span></label>
                                <select className="select select-bordered bg-slate-50" value={auteur} onChange={e => setAuteur(e.target.value)}>
                                    <option value="">Tous les auteurs</option>
                                    {auteurs.map(a => <option key={a} value={a}>{a}</option>)}
                                </select>
                            </div>

                            <button className="btn btn-outline btn-block mt-6" onClick={() => {
                                setSearch(''); setGenre(''); setAuteur('');
                            }}>
                                Réinitialiser
                            </button>
                        </div>
                    </div>

                    {/* Book Grid */}
                    <div className="w-full lg:w-3/4">
                        {loading ? (
                            <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {livres.slice(0, visibleCount).map(livre => (
                                        <BookCard key={livre.id} livre={livre} />
                                    ))}
                                </div>

                                {livres.length === 0 && (
                                    <div className="col-span-full text-center py-20 text-gray-500 bg-white rounded-xl shadow-sm">
                                        <p className="text-xl">Aucun livre trouvé pour ces critères.</p>
                                        <button className="btn btn-link" onClick={() => { setSearch(''); setGenre(''); setAuteur(''); }}>Effacer les filtres</button>
                                    </div>
                                )}

                                {visibleCount < livres.length && (
                                    <div className="mt-12 text-center">
                                        <button onClick={loadMore} className="btn btn-primary btn-wide shadow-lg">
                                            Afficher plus de livres
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}