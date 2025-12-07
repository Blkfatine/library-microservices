import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Catalogue from './pages/Catalogue'
import LivreDetail from './pages/LivreDetail'
import Profil from './pages/Profil'
import Dashboard from './pages/admin/Dashboard'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/catalogue" element={<Catalogue />} />
                        <Route path="/livre/:id" element={<LivreDetail />} />
                        <Route path="/profil" element={<Profil />} />
                        <Route path="/admin/dashboard" element={<Dashboard />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App