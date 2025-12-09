import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function DashboardLayout() {
    const { user, logout } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const isActive = (path) => location.pathname === path ? 'bg-primary text-white' : 'hover:bg-slate-100 text-slate-600'

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-xl hidden md:flex flex-col z-10">
                <div className="p-6 border-b border-slate-100">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">B</div>
                        <span className="text-xl font-bold text-slate-800">Bibliovox</span>
                    </Link>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-4">Mon Espace</div>

                    <Link to="/profil" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive('/profil')}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        <span className="font-medium">Mon Profil</span>
                    </Link>

                    <Link to="/profil/emprunts" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive('/profil/emprunts')}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        <span className="font-medium">Mes Emprunts</span>
                    </Link>

                    <Link to="/profil/notifications" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive('/profil/notifications')}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <span className="font-medium">Notifications</span>
                    </Link>

                    <Link to="/profil/recommandations" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive('/profil/recommandations')}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        <span className="font-medium">Pour Vous</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button onClick={() => { logout(); navigate('/') }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 w-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        <span className="font-medium">Déconnexion</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow overflow-y-auto">
                <div className="md:hidden bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-20">
                    <Link to="/" className="font-bold text-lg">Bibliovox</Link>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to="/profil">Profil</Link></li>
                            <li><Link to="/profil/emprunts">Mes Emprunts</Link></li>
                            <li><Link to="/profil/notifications">Notifications</Link></li>
                            <li><Link to="/profil/recommandations">Recommandations</Link></li>
                            <li><button onClick={logout}>Déconnexion</button></li>
                        </ul>
                    </div>
                </div>

                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
