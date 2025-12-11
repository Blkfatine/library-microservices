import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function BorrowModal({ book, isOpen, onClose }) {
    const { user } = useAuth()
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        dateRetour: ''
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (isOpen && user) {
            // Pre-fill email if available in user object (though user object structure might vary)
            setFormData(prev => ({ ...prev, email: user.email || '' }))
        }
    }, [isOpen, user])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const payload = {
            userId: user.id,
            bookId: book.id,
            nom: formData.nom,
            prenom: formData.prenom,
            email: formData.email,
            dateEmprunt: new Date().toISOString(),
            dateRetour: new Date(formData.dateRetour).toISOString(),
            status: 'PENDING'
        }

        try {
            await axios.post('/borrow/requests', payload)
            setSuccess(true)
            setTimeout(() => {
                onClose()
                setSuccess(false)
                setFormData({ nom: '', prenom: '', email: '', dateRetour: '' })
            }, 2000)
        } catch (err) {
            console.error("Error submitting borrow request", err)
            setError("Une erreur est survenue lors de l'envoi de la demande.")
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="p-6 bg-primary text-white">
                    <h3 className="text-xl font-bold">Emprunter "{book.titre}"</h3>
                    <p className="text-primary-content/80 text-sm mt-1">Veuillez remplir ce formulaire pour valider votre demande.</p>
                </div>
                
                <div className="p-6">
                    {success ? (
                        <div className="alert alert-success">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Demande envoyée avec succès ! En attente de validation.</span>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="alert alert-error text-sm py-2">
                                    <span>{error}</span>
                                </div>
                            )}
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Nom</span></label>
                                    <input type="text" name="nom" required value={formData.nom} onChange={handleChange} className="input input-bordered w-full" placeholder="Votre nom" />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Prénom</span></label>
                                    <input type="text" name="prenom" required value={formData.prenom} onChange={handleChange} className="input input-bordered w-full" placeholder="Votre prénom" />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text">Email</span></label>
                                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="input input-bordered w-full" placeholder="votre@email.com" />
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text">Date de retour prévue</span></label>
                                <input type="datetime-local" name="dateRetour" required value={formData.dateRetour} onChange={handleChange} className="input input-bordered w-full" />
                            </div>

                            <div className="modal-action mt-6">
                                <button type="button" onClick={onClose} className="btn btn-ghost">Annuler</button>
                                <button type="submit" className={`btn btn-primary ${loading ? 'loading' : ''}`} disabled={loading}>
                                    {loading ? 'Envoi...' : 'Confirmer la demande'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
