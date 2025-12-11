import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Catalogue from './pages/Catalogue'
import LivreDetail from './pages/LivreDetail'
import Profil from './pages/Profil'
import DashboardLayout from './components/DashboardLayout'
import MyBorrows from './pages/MyBorrows'
import Notifications from './pages/Notifications'
import Recommendations from './pages/Recommendations'
import Navbar from './components/Navbar'
import AdminDashboard from './pages/admin/Dashboard'
import AdminLayout from './components/AdminLayout'
import BooksManager from './pages/admin/BooksManager'
import UsersManager from './pages/admin/UsersManager'
import { AuthProvider } from './context/AuthContext'

// Wrapper for public pages that need the main Navbar
const PublicLayout = ({ children }) => (
    <>
        <Navbar />
        {children}
    </>
)

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
                    <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
                    <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
                    <Route path="/catalogue" element={<PublicLayout><Catalogue /></PublicLayout>} />
                    <Route path="/livre/:id" element={<PublicLayout><LivreDetail /></PublicLayout>} />

                    {/* User Dashboard Routes */}
                    <Route path="/profil" element={<DashboardLayout />}>
                        <Route index element={<Profil />} />
                        <Route path="emprunts" element={<MyBorrows />} />
                        <Route path="notifications" element={<Notifications />} />
                        <Route path="recommandations" element={<Recommendations />} />
                    </Route>

                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="books" element={<BooksManager />} />
                        <Route path="users" element={<UsersManager />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App