import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8080/api/auth/login', form)
            login(res.data.token)
            navigate('/catalogue')
        } catch (err) {
            setError("Identifiants incorrects")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-96 bg-base-100 shadow-2xl">
                <div className="card-body">
                    <h2 className="text-3xl font-bold text-center mb-8">Connexion</h2>
                    {error && <div className="alert alert-error">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <input type="email" placeholder="Email" className="input input-bordered w-full mb-4"
                               value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                        <input type="password" placeholder="Mot de passe" className="input input-bordered w-full mb-6"
                               value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
                        <button type="submit" className="btn btn-primary w-full">Se connecter</button>
                    </form>
                </div>
            </div>
        </div>
    )
}