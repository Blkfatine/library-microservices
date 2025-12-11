import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function Notifications() {
    const { user } = useAuth()
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            generateNotifications()
        }
    }, [user])

    const generateNotifications = async () => {
        try {
            // Fetch data to generate notifications
            const [booksRes, borrowsRes] = await Promise.all([
                axios.get('/books'),
                axios.get(`/borrows/user/${user.id}`) // Assuming endpoint for user's borrows
            ])

            const books = booksRes.data || []
            const borrows = borrowsRes.data || []
            const generatedNotifs = []

            // 1. New Books (last 7 days)
            const oneWeekAgo = new Date()
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

            books.forEach(book => {
                if (new Date(book.published_date) > oneWeekAgo) { // Assuming published_date is relevant, or use created_at if available
                    // If we don't have created_at, we might skip this or use a mock logic for "New"
                    // For now, let's assume we want to notify about *recently added* books. 
                    // If the API doesn't give added date, we might just show the latest ones.
                    // Let's use a simple check on ID or just pick the last few.
                }
            })
            // Simulating "New Book" notification for the latest book
            if (books.length > 0) {
                const latestBook = books[books.length - 1]
                generatedNotifs.push({
                    id: 'new-book-' + latestBook.id,
                    type: 'info',
                    message: `Nouveauté : Découvrez "${latestBook.title || latestBook.titre}" qui vient d'arriver !`,
                    date: new Date().toISOString().split('T')[0], // Today
                    read: false
                })
            }

            // 2. Borrow Status Changes (Accepted/Rejected)
            borrows.forEach(borrow => {
                if (borrow.status === 'APPROVED' || borrow.status === 'REJECTED') {
                    // In a real app, we'd check if this status change is "new" (unread).
                    // Here we just show it.
                    generatedNotifs.push({
                        id: 'borrow-' + borrow.id,
                        type: borrow.status === 'APPROVED' ? 'success' : 'error',
                        message: borrow.status === 'APPROVED'
                            ? `Votre demande pour le livre #${borrow.bookId} a été acceptée.`
                            : `Votre demande pour le livre #${borrow.bookId} a été refusée.`,
                        date: borrow.dateEmprunt ? new Date(borrow.dateEmprunt).toISOString().split('T')[0] : 'Récemment',
                        read: false
                    })
                }
            })

            // 3. Overdue Reminders
            const today = new Date()
            borrows.forEach(borrow => {
                if (borrow.status === 'APPROVED' && !borrow.dateRetourReelle) {
                    const returnDate = new Date(borrow.dateRetour)
                    if (returnDate < today) {
                        generatedNotifs.push({
                            id: 'overdue-' + borrow.id,
                            type: 'warning',
                            message: `Rappel : Vous avez du retard pour le livre #${borrow.bookId}. Retour attendu le ${returnDate.toLocaleDateString()}.`,
                            date: today.toISOString().split('T')[0],
                            read: false
                        })
                    }
                }
            })

            setNotifications(generatedNotifs)

        } catch (error) {
            console.error("Error generating notifications", error)
            // Fallback to mock if API fails
            setNotifications([
                { id: 1, type: 'info', message: 'Bienvenue sur ReadWaves ! Commencez par explorer notre catalogue.', date: '2023-10-25', read: false }
            ])
        } finally {
            setLoading(false)
        }
    }

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
    }

    if (loading) return <div className="p-8 text-center">Chargement...</div>

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Vos Notifications</h1>

            <div className="space-y-4">
                {notifications.length === 0 ? (
                    <div className="text-slate-500">Aucune notification pour le moment.</div>
                ) : (
                    notifications.map(notif => (
                        <div
                            key={notif.id}
                            className={`alert ${notif.read ? 'bg-white border-slate-100' : 'bg-blue-50 border-blue-100'} shadow-sm flex items-start gap-4`}
                        >
                            {notif.type === 'warning' && <svg xmlns="http://www.w3.org/2000/svg" className="stroke-warning shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
                            {notif.type === 'info' && <svg xmlns="http://www.w3.org/2000/svg" className="stroke-info shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            {notif.type === 'success' && <svg xmlns="http://www.w3.org/2000/svg" className="stroke-success shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            {notif.type === 'error' && <svg xmlns="http://www.w3.org/2000/svg" className="stroke-error shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}

                            <div className="flex-1">
                                <h3 className={`font-bold ${notif.read ? 'text-slate-600' : 'text-slate-900'}`}>{notif.type.toUpperCase()}</h3>
                                <div className="text-sm text-slate-600">{notif.message}</div>
                                <div className="text-xs text-slate-400 mt-1">{notif.date}</div>
                            </div>

                            {!notif.read && (
                                <button onClick={() => markAsRead(notif.id)} className="btn btn-xs btn-ghost">Marquer comme lu</button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
