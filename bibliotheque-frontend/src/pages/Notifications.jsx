import { useState } from 'react'

export default function Notifications() {
    // Mock notifications since backend might not have this endpoint yet
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'info', message: 'Bienvenue sur Bibliovox ! Commencez par explorer notre catalogue.', date: '2023-10-25', read: false },
        { id: 2, type: 'warning', message: 'Rappel : Le livre "1984" est à rendre dans 2 jours.', date: '2023-10-28', read: false },
        { id: 3, type: 'success', message: 'Votre emprunt du livre "Le Petit Prince" a été confirmé.', date: '2023-10-30', read: true },
    ])

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
    }

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Vos Notifications</h1>

            <div className="space-y-4">
                {notifications.map(notif => (
                    <div
                        key={notif.id}
                        className={`alert ${notif.read ? 'bg-white border-slate-100' : 'bg-blue-50 border-blue-100'} shadow-sm flex items-start gap-4`}
                    >
                        {notif.type === 'warning' && <svg xmlns="http://www.w3.org/2000/svg" className="stroke-warning shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
                        {notif.type === 'info' && <svg xmlns="http://www.w3.org/2000/svg" className="stroke-info shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        {notif.type === 'success' && <svg xmlns="http://www.w3.org/2000/svg" className="stroke-success shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}

                        <div className="flex-1">
                            <h3 className={`font-bold ${notif.read ? 'text-slate-600' : 'text-slate-900'}`}>{notif.type.toUpperCase()}</h3>
                            <div className="text-sm text-slate-600">{notif.message}</div>
                            <div className="text-xs text-slate-400 mt-1">{notif.date}</div>
                        </div>

                        {!notif.read && (
                            <button onClick={() => markAsRead(notif.id)} className="btn btn-xs btn-ghost">Marquer comme lu</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
