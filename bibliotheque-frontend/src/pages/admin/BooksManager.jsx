import { useState, useEffect } from 'react'
import axios from 'axios'

export default function BooksManager() {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        titre: '',
        auteurId: '',
        image_url: '',
        dateParution: '',
        isbn: '',
        description: '',
        statut: 'DISPONIBLE'
    })

    useEffect(() => {
        fetchBooks()
    }, [])

    const fetchBooks = async () => {
        try {
            const res = await axios.get('/books')
            setBooks(res.data)
        } catch (err) {
            console.error("Error fetching books", err)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce livre ?")) return
        try {
            await axios.delete(`/books/${id}`)
            fetchBooks()
        } catch (err) {
            console.error("Error deleting book", err)
            alert("Erreur lors de la suppression")
        }
    }

    const handleStatusChange = async (id, currentStatus) => {
        const newStatus = currentStatus === 'DISPONIBLE' ? 'PERDU' : 'DISPONIBLE'
        if (!window.confirm(`Changer le statut de ${currentStatus} à ${newStatus} ?`)) return

        try {
            // Assuming PATCH or PUT for status update
            await axios.put(`/books/${id}/status?status=${newStatus}`)
            // Or full update: axios.put(`/books/${id}`, { ...book, statut: newStatus })
            // Let's assume a specific endpoint or query param for simplicity as per common microservice patterns
            fetchBooks()
        } catch (err) {
            console.error("Error updating status", err)
            alert("Erreur lors de la mise à jour du statut")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/books', formData)
            setIsModalOpen(false)
            setFormData({
                titre: '',
                auteurId: '',
                image_url: '',
                dateParution: '',
                isbn: '',
                description: '',
                statut: 'DISPONIBLE'
            })
            fetchBooks()
        } catch (err) {
            console.error("Error creating book", err)
            alert("Erreur lors de la création")
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Gestion des Livres</h1>
                <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">Ajouter un livre</button>
            </div>

            {loading ? (
                <div>Chargement...</div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Titre</th>
                                <th>Auteur (ID)</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>
                                        <div className="font-bold">{book.titre || book.title}</div>
                                        <div className="text-xs opacity-50">{book.isbn}</div>
                                    </td>
                                    <td>{book.auteurId || book.author_id}</td>
                                    <td>
                                        <span className={`badge ${book.statut === 'DISPONIBLE' ? 'badge-success' : book.statut === 'PERDU' ? 'badge-error' : 'badge-ghost'} text-white`}>
                                            {book.statut}
                                        </span>
                                    </td>
                                    <td className="flex gap-2">
                                        <button
                                            onClick={() => handleStatusChange(book.id, book.statut)}
                                            className="btn btn-xs btn-outline"
                                            disabled={book.statut === 'EMPRUNTÉ'}
                                        >
                                            {book.statut === 'DISPONIBLE' ? 'Marquer Perdu' : 'Marquer Dispo'}
                                        </button>
                                        <button onClick={() => handleDelete(book.id)} className="btn btn-xs btn-error text-white">Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal Creation */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">Nouveau Livre</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" name="titre" placeholder="Titre" className="input input-bordered w-full" required value={formData.titre} onChange={handleChange} />
                            <input type="number" name="auteurId" placeholder="ID Auteur" className="input input-bordered w-full" required value={formData.auteurId} onChange={handleChange} />
                            <input type="text" name="image_url" placeholder="URL Image" className="input input-bordered w-full" value={formData.image_url} onChange={handleChange} />
                            <input type="date" name="dateParution" className="input input-bordered w-full" required value={formData.dateParution} onChange={handleChange} />
                            <input type="text" name="isbn" placeholder="ISBN" className="input input-bordered w-full" required value={formData.isbn} onChange={handleChange} />
                            <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full" value={formData.description} onChange={handleChange}></textarea>

                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-ghost">Annuler</button>
                                <button type="submit" className="btn btn-primary">Créer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
