import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Catalogue() {
    const [livres, setLivres] = useState([])
    const [search, setSearch] = useState('')
    const [genreFilter, setGenreFilter] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8080/api/books')
            .then(res => setLivres(res.data))
    }, [])

    const filtered = livres.filter(l => {
        const matchesSearch = l.titre.toLowerCase().includes(search.toLowerCase()) ||
            l.auteur?.nom.toLowerCase().includes(search.toLowerCase())
        const matchesGenre = !genreFilter || l.genre === genreFilter
        return matchesSearch && matchesGenre
    })

    const genres = [...new Set(livres.map(l => l.genre).filter(Boolean))]

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-5xl font-bold text-center mb-10 text-primary">Notre Catalogue</h1>

            <div className="flex flex-col md:flex-row gap-8 mb-10">
                <input
                    type="text"
                    placeholder="Rechercher un livre ou auteur..."
                    className="input input-bordered input-lg flex-1"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select className="select select-bordered w-full md:w-64" value={genreFilter} onChange={e => setGenreFilter(e.target.value)}>
                    <option value="">Tous les genres</option>
                    {genres.map(g => <option key={g}>{g}</option>)}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filtered.map(livre => (
                    <Link to={`/livre/${livre.id}`} key={livre.id} className="group">
                        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <figure className="px-8 pt-8">
                                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl w-full h-64 flex items-center justify-center border-4 border-dashed border-gray-300 group-hover:border-primary transition-all">
                                    <span className="text-8xl opacity-30">Book</span>
                                </div>
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-xl">{livre.titre}</h2>
                                <p className="text-sm opacity-75">par {livre.auteur?.nom || 'Auteur inconnu'}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="badge badge-lg">{livre.genre}</span>
                                    <div className={`badge ${livre.statut === 'DISPONIBLE' ? 'badge-success' : 'badge-error'} badge-lg`}>
                                        {livre.statut === 'DISPONIBLE' ? 'Disponible' : 'Emprunté'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}