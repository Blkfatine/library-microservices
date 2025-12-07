import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    return (
        <div className="navbar bg-primary text-primary-content shadow-xl">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-2xl font-bold">Bibliothèque Pro</Link>
            </div>
            <div className="flex-none gap-4">
                <Link to="/catalogue" className="btn btn-ghost">Catalogue</Link>
                {user ? (
                    <>
                        <Link to="/profil" className="btn btn-ghost">Profil</Link>
                        {user.role === 'ADMIN' && (
                            <Link to="/admin/dashboard" className="btn btn-warning">Admin</Link>
                        )}
                        <button onClick={() => { logout(); navigate('/') }} className="btn btn-error">Déconnexion</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-ghost">Connexion</Link>
                        <Link to="/register" className="btn btn-success">Inscription</Link>
                    </>
                )}
            </div>
        </div>
    )
}