import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import BorrowModal from './BorrowModal'

export default function BookCard({ livre }) {
    const { user } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleBorrowClick = (e) => {
        e.preventDefault() // Prevent navigation to book detail
        e.stopPropagation()
        setIsModalOpen(true)
    }

    return (
        <>
            <Link to={`/livre/${livre.id}`} className="group relative block h-[400px] overflow-hidden rounded-xl bg-gray-100 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                {/* Image Background */}
                <div className="absolute inset-0">
                    {livre.image_url ? (
                        <img
                            src={livre.image_url}
                            alt={livre.titre}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
                            <span className="text-4xl opacity-20">📚</span>
                        </div>
                    )}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <span className="btn btn-primary btn-wide transform scale-90 transition-transform duration-300 group-hover:scale-100 rounded-full">
                        Voir plus
                    </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                    <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                        <h3 className="mb-1 text-xl font-bold leading-tight drop-shadow-md line-clamp-2">{livre.titre}</h3>
                        <p className="text-sm font-medium text-gray-300 drop-shadow-sm mb-2">
                            {livre.auteur?.nom || 'Auteur inconnu'}
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="badge badge-sm border-white/20 bg-white/10 text-white backdrop-blur-md">
                                {livre.annee || 'N/A'}
                            </span>

                            {/* Status and Borrow Button - Only for logged in users */}
                            {user && (
                                <div className="flex items-center gap-2">
                                    <div className={`badge badge-sm ${livre.statut === 'DISPONIBLE' ? 'badge-success' : 'badge-error'} text-white border-none`}>
                                        {livre.statut === 'DISPONIBLE' ? 'Disponible' : 'Indisponible'}
                                    </div>

                                    {livre.statut === 'DISPONIBLE' && (
                                        <button
                                            onClick={handleBorrowClick}
                                            className="btn btn-xs btn-primary z-10"
                                        >
                                            Emprunter
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Link>

            <BorrowModal
                book={livre}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
}
