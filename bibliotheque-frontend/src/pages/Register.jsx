import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const [form, setForm] = useState({ email: '', nom: '', password: '' })
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await axios.post('http://localhost:8080/api/auth/register', {
                email: form.email,
                nom: form.nom,
                password: form.password,
                role: "CLIENT"   // ← ici c’est obligatoire en MAJUSCULES
            })
            setSuccess("Compte créé avec succès ! Redirection...")
            setTimeout(() => navigate('/login'), 2000)
        } catch (err) {
            setError(err.response?.data?.message || "Erreur lors de l'inscription")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-96 bg-base-100 shadow-2xl">
                <div className="card-body">
                    <h2 className="text-3xl font-bold text-center mb-8">Créer un compte</h2>

                    {success && <div className="alert alert-success mb-4">{success}</div>}
                    {error && <div className="alert alert-error mb-4">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Nom complet"
                            className="input input-bordered w-full mb-4"
                            value={form.nom}
                            onChange={e => setForm({...form, nom: e.target.value})}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered w-full mb-4"
                            value={form.email}
                            onChange={e => setForm({...form, email: e.target.value})}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            className="input input-bordered w-full mb-6"
                            value={form.password}
                            onChange={e => setForm({...form, password: e.target.value})}
                            required
                        />
                        <button type="submit" className="btn btn-primary w-full">
                            S'inscrire
                        </button>
                    </form>

                    <p className="text-center mt-4">
                        Déjà un compte ? <a href="/login" className="link link-primary">Se connecter</a>
                    </p>
                </div>
            </div>
        </div>
    )
}