import { useState, useEffect } from 'react'
import axios from 'axios'

export default function UsersManager() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '', // In real app, handle securely
        role: 'USER'
    })

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const res = await axios.get('/users')
            setUsers(res.data)
        } catch (err) {
            console.error("Error fetching users", err)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.")) return
        try {
            await axios.delete(`/users/${id}`)
            fetchUsers()
        } catch (err) {
            console.error("Error deleting user", err)
            alert("Erreur lors de la suppression")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Assuming POST /auth/register or /users for creation
            // Usually admin creates via /users endpoint if allowed, or register endpoint
            await axios.post('/auth/register', formData)
            setIsModalOpen(false)
            setFormData({
                nom: '',
                prenom: '',
                email: '',
                password: '',
                role: 'USER'
            })
            fetchUsers()
            alert("Utilisateur créé avec succès")
        } catch (err) {
            console.error("Error creating user", err)
            alert("Erreur lors de la création")
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Gestion des Utilisateurs</h1>
                <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">Ajouter un utilisateur</button>
            </div>

            {loading ? (
                <div>Chargement...</div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Rôle</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.nom} {user.prenom}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`badge ${user.role === 'ADMIN' ? 'badge-warning' : 'badge-ghost'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(user.id)} className="btn btn-xs btn-error text-white">Supprimer</button>
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
                    <div className="bg-white p-6 rounded-xl w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Nouvel Utilisateur</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" name="nom" placeholder="Nom" className="input input-bordered w-full" required value={formData.nom} onChange={handleChange} />
                                <input type="text" name="prenom" placeholder="Prénom" className="input input-bordered w-full" required value={formData.prenom} onChange={handleChange} />
                            </div>
                            <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required value={formData.email} onChange={handleChange} />
                            <input type="password" name="password" placeholder="Mot de passe" className="input input-bordered w-full" required value={formData.password} onChange={handleChange} />
                            <select name="role" className="select select-bordered w-full" value={formData.role} onChange={handleChange}>
                                <option value="USER">Utilisateur</option>
                                <option value="ADMIN">Administrateur</option>
                            </select>

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
