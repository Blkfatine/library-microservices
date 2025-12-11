import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminLayout() {
    const { logout } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const isActive = (path) => location.pathname === path ? 'bg-blue-600 text-white' : 'hover:bg-slate-100 text-slate-600'

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-xl hidden md:flex flex-col z-10">
                <div className="p-6 border-b border-slate-100">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold text-slate-800">ReadWaves Admin</span>
                    </Link>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-4">Gestion</div>

                    <Link to="/admin/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive('/admin/dashboard')}`}>
                        <span className="font-medium">Dashboard</span>
                    </Link>

                    <Link to="/admin/books" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive('/admin/books')}`}>
                        <span className="font-medium">Livres</span>
                    </Link>

                    <Link to="/admin/users" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive('/admin/users')}`}>
                        <span className="font-medium">Utilisateurs</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button onClick={() => { logout(); navigate('/') }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 w-full transition-colors">
                        <span className="font-medium">Déconnexion</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow overflow-y-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
