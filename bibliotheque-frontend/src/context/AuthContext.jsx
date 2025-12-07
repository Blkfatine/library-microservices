import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token)
            setUser({
                id: decoded.userId,
                email: decoded.sub,
                role: decoded.role
            })
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }, [token])

    const login = (newToken) => {
        localStorage.setItem('token', newToken)
        setToken(newToken)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        delete axios.defaults.headers.common['Authorization']
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}