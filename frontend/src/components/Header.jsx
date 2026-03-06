import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { notificationService } from '../services/notificationService';
import './Header.css';

export default function Header({ role = 'doctor', userId = '1', userName = '', specialty = '' }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const fetchUnreadCount = async () => {
            try {
                let count = 0;
                if (role === 'doctor') {
                    count = await notificationService.getDoctorUnreadCount(userId);
                } else if (role === 'pharmacist') {
                    count = await notificationService.getPharmacistUnreadCount(userId);
                }
                setUnreadCount(count.count || count || 0);
            } catch (err) {
                console.error('Failed to fetch notifications:', err);
            }
        };

        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 30000); // Polling every 30s
        return () => clearInterval(interval);
    }, [role, userId]);

    const navItems = {
        doctor: [
            { label: 'Consultation', path: '/doctor' },
            { label: 'Patients', path: '/doctor/patients' },
            { label: 'Appointments', path: '/doctor/appointments' },
        ],
        nurse: [
            { label: 'Registration', path: '/nurse' },
            { label: 'Patients', path: '/nurse/patients' },
            { label: 'Queue', path: '/nurse/queue' },
        ],
        pharmacist: [
            { label: 'Prescriptions', path: '/pharmacist' },
            { label: 'Inventory', path: '/pharmacist/inventory' },
            { label: 'Patients', path: '/pharmacist/patients' },
            { label: 'Reports', path: '/pharmacist/reports' },
        ],
    };

    const items = navItems[role] || [];

    return (
        <header className="app-header">
            <div className="app-header__left">
                <div className="app-header__brand" onClick={() => navigate('/')}>
                    <svg className="app-header__logo" width="23" height="23" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#121613" strokeWidth="2" />
                        <path d="M12 7v10M7 12h10" stroke="#6ccb75" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="app-header__title">Hospital PMS</span>
                </div>
                <div className="app-header__search">
                    <svg className="app-header__search-icon" width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <circle cx="6.5" cy="6.5" r="5.5" stroke="#6a816c" strokeWidth="1.5" />
                        <path d="M10.5 10.5L14 14" stroke="#6a816c" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <input
                        type="text"
                        className="app-header__search-input"
                        placeholder={role === 'pharmacist' ? 'Search Patient ID or Name' : 'Search patients...'}
                    />
                </div>
            </div>

            <div className="app-header__right">
                <nav className="app-header__nav">
                    {items.map((item) => (
                        <a
                            key={item.path}
                            className={`app-header__nav-link ${location.pathname === item.path ? 'app-header__nav-link--active' : ''}`}
                            onClick={() => navigate(item.path)}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="app-header__actions">
                    <button className="app-header__notification-btn" aria-label="Notifications">
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                            <path d="M13 7C13 5.67392 12.4732 4.40215 11.5355 3.46447C10.5979 2.52678 9.32608 2 8 2C6.67392 2 5.40215 2.52678 4.46447 3.46447C3.52678 4.40215 3 5.67392 3 7C3 14 1 16 1 16H15C15 16 13 14 13 7Z" stroke="#6a816c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.15 19C8.87 19.44 8.45 19.72 8 19.72C7.55 19.72 7.13 19.44 6.85 19" stroke="#6a816c" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        {unreadCount > 0 && <span className="notification-dot" />}
                    </button>

                    <div className="app-header__divider" />

                    <div className="app-header__user">
                        <div className="app-header__user-info">
                            <span className="app-header__user-name">{userName || 'Dr. Sarah Jenkins'}</span>
                            <span className="app-header__user-role">{specialty || 'Cardiology'}</span>
                        </div>
                        <div className="app-header__avatar">
                            <div className="app-header__avatar-initial">
                                {(userName || 'Dr. Sarah Jenkins').charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
