import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { pharmacistService } from '../../services/pharmacistService';
import './PharmacistDashboard.css';

export default function PharmacistDashboard() {
    const [activeTab, setActiveTab] = useState(0);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPrescriptions = async () => {
            setLoading(true);
            try {
                let data = [];
                if (activeTab === 0) data = await pharmacistService.getPendingPrescriptions();
                else if (activeTab === 1) data = await pharmacistService.getPendingPrescriptions();
                else if (activeTab === 2) data = await pharmacistService.getRecentPatients();
                else data = await pharmacistService.getPendingPrescriptions();

                setPrescriptions(data || []);
            } catch (err) {
                console.error('Failed to fetch prescriptions:', err);
                setPrescriptions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPrescriptions();
    }, [activeTab]);

    const handleDispense = async (prescriptionId) => {
        try {
            await pharmacistService.dispenseDrug(prescriptionId);
            // Refresh
            const data = await pharmacistService.getPendingPrescriptions();
            setPrescriptions(data || []);
        } catch (err) {
            alert(`Error dispensing: ${err.message}`);
        }
    };

    const TABS = ['All Active', 'Pending', 'Preparing', 'Ready'];

    return (
        <div className="pharmacist-page">
            <Header role="pharmacist" userName="Pharmacist Ada" specialty="Dispensary" />

            <main className="pharmacist-main">
                {/* Header */}
                <div className="pharmacist-main__header">
                    <div className="pharmacist-main__header-left">
                        <h1 className="page-heading">Prescription Panel</h1>
                        <p className="page-subtitle">
                            Real-time prescription management for Dr. Smith's Ward and ER.
                        </p>
                    </div>
                    <div className="pharmacist-main__header-actions">
                        <button className="btn-filter">
                            <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
                                <path d="M1 1H10M3 3.5H8M5 6H6" stroke="#415243" strokeWidth="1.3" strokeLinecap="round" />
                            </svg>
                            Filter
                        </button>
                        <button className="btn-filter">
                            <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
                                <path d="M1 1H10M3 3.5H8M5 6H6" stroke="#415243" strokeWidth="1.3" strokeLinecap="round" />
                            </svg>
                            Sort By: Urgency
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="pharmacist-tabs">
                    {TABS.map((tab, i) => (
                        <button
                            key={tab}
                            className={`pharmacist-tab ${activeTab === i ? 'pharmacist-tab--active' : ''}`}
                            onClick={() => setActiveTab(i)}
                        >
                            {tab}
                            {i === 1 && <span className="urgent-badge">URGENT</span>}
                        </button>
                    ))}
                </div>

                {/* Prescription Cards */}
                <div className="prescription-feed">
                    {loading ? (
                        <div className="loading-state">Loading prescriptions...</div>
                    ) : prescriptions.length === 0 ? (
                        <div className="empty-state">No active prescriptions found.</div>
                    ) : (
                        prescriptions.map((rx) => (
                            <div
                                className={`rx-card ${rx.status === 'pending' ? 'rx-card--urgent' : 'rx-card--preparing'}`}
                                key={rx.id}
                            >
                                {/* Card Header */}
                                <div className={`rx-card__header ${rx.status === 'pending' ? 'rx-card__header--urgent' : ''}`}>
                                    <div className="rx-card__header-left">
                                        <div className="rx-card__badges">
                                            <span className={`rx-status-badge rx-status-badge--${rx.status || 'pending'}`}>
                                                {rx.statusLabel || rx.status || 'Pending'}
                                            </span>
                                            <span className="rx-card__time">{rx.time}</span>
                                        </div>
                                        <h3 className="rx-card__patient">{rx.patient?.name || rx.patientName || 'Unknown Patient'}</h3>
                                        <p className="rx-card__info">ID: {rx.patient?.hospitalId || rx.patientId} • Ward: {rx.ward || 'General'}</p>
                                    </div>
                                    <div className="rx-card__header-right">
                                        <span className="rx-card__rx-label">Rx No.</span>
                                        <span className="rx-card__rx-number">{rx.id}</span>
                                    </div>
                                </div>

                                {/* Medications */}
                                <div className="rx-card__body">
                                    <h4 className="rx-card__section-title">Medications</h4>
                                    <div className="rx-med-list">
                                        {(rx.medications || rx.drugs || []).map((med, i) => (
                                            <div className="rx-med-item" key={i}>
                                                <div className={`rx-med-item__icon ${med.isUrgent ? 'rx-med-item__icon--urgent' : ''}`}>
                                                    <svg width="12" height="15" viewBox="0 0 12 15" fill="none">
                                                        <rect x="1" y="1" width="10" height="13" rx="2" stroke={med.isUrgent ? '#dc2626' : '#6ccb75'} strokeWidth="1.5" />
                                                        <path d="M4 5H8M4 8H6" stroke={med.isUrgent ? '#dc2626' : '#6ccb75'} strokeWidth="1.2" strokeLinecap="round" />
                                                    </svg>
                                                </div>
                                                <div className="rx-med-item__content">
                                                    <strong className="rx-med-item__name">{med.name}</strong>
                                                    <p className="rx-med-item__instructions">{med.instructions || med.dosage}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="rx-card__footer">
                                    <button className="btn-text-action" onClick={() => handleDispense(rx.id)}>View Details</button>
                                    <button className="btn-primary-sm" onClick={() => handleDispense(rx.id)}>
                                        {rx.status === 'preparing' ? 'Mark as Dispensed' : 'Start Preparing'}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
