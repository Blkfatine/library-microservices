import { useAuth } from '../context/AuthContext'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [scrolled, setScrolled] = useState(false)

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const isHome = location.pathname === '/'

    // Dynamic classes based on scroll and page
    const navbarClasses = `fixed top-0 z-50 w-full transition-all duration-300 ${scrolled || !isHome
            ? 'bg-white/80 backdrop-blur-md shadow-md text-slate-800 py-3'
            : 'bg-transparent text-white py-5'
        }`

    return (
        <nav className={navbarClasses}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${scrolled || !isHome ? 'bg-primary text-white' : 'bg-white text-primary'}`}>
                        <span className="font-bold text-xl">B</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight group-hover:opacity-80 transition-opacity">
                        Bibliovox
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 font-medium">
                    <Link to="/catalogue" className="hover:text-primary transition-colors">Catalogue</Link>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/profil" className="hover:text-primary transition-colors">Mon Espace</Link>
                            {user.role === 'ADMIN' && (
                                <Link to="/admin/dashboard" className="text-warning hover:text-warning/80 transition-colors">Admin</Link>
                            )}

                            {/* Notification Bell (Mock) */}
                            <button className="btn btn-ghost btn-circle btn-sm">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                    <span className="badge badge-xs badge-primary indicator-item"></span>
                                </div>
                            </button>

                            <div className="h-6 w-px bg-current opacity-20"></div>

                            <button
                                onClick={() => { logout(); navigate('/') }}
                                className={`btn btn-sm ${scrolled || !isHome ? 'btn-error btn-outline' : 'btn-error bg-white/10 border-none text-white hover:bg-white/20'}`}
                            >
                                Déconnexion
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="hover:text-primary transition-colors">Connexion</Link>
                            <Link
                                to="/register"
                                className={`btn btn-sm px-6 ${scrolled || !isHome ? 'btn-primary' : 'bg-white text-primary border-none hover:bg-gray-100'}`}
                            >
                                Inscription
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}