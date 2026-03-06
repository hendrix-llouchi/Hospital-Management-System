import { useState } from 'react';
import Header from '../../components/Header';
import './PharmacistDashboard.css';

const PRESCRIPTIONS = [
    {
        id: '#RX-2023-8912',
        patient: 'Robert Chen',
        info: 'ID: ER-89234 • Ward: Emergency • Dr. Sarah Jenkins',
        status: 'pending',
        statusLabel: 'Pending - Urgent',
        time: 'Received 5 mins ago',
        medications: [
            { name: 'Epinephrine Auto-Injector 0.3mg', instructions: 'Dispense 2 pens. Inject into outer thigh as directed for severe allergic reaction.', icon: 'urgent' },
            { name: 'Prednisone 20mg', instructions: 'Dispense 10 tablets. Take 1 tablet daily with food for 5 days.', icon: 'pill' },
        ],
        actionLabel: 'Start Preparing',
        secondaryAction: 'View Details',
    },
    {
        id: '#RX-2023-8910',
        patient: 'Elena Rodriguez',
        info: 'ID: IN-45102 • Ward: Cardiology • Dr. Michael Chang',
        status: 'preparing',
        statusLabel: 'Preparing',
        time: 'Started 12 mins ago',
        medications: [
            { name: 'Atorvastatin 40mg', instructions: 'Dispense 30 tablets. Take 1 tablet once daily at bedtime.', icon: 'pill' },
            { name: 'Metoprolol Tartrate 25mg', instructions: 'Dispense 60 tablets. Take 1 tablet twice daily with meals.', icon: 'pill' },
        ],
        actionLabel: 'Mark as Dispensed',
        secondaryAction: 'Print Label',
    },
];

const TABS = ['All Active (24)', 'Pending (12)', 'Preparing (8)', 'Ready for Pickup (4)'];

export default function PharmacistDashboard() {
    const [activeTab, setActiveTab] = useState(0);

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
                    {PRESCRIPTIONS.map((rx) => (
                        <div
                            className={`rx-card ${rx.status === 'pending' ? 'rx-card--urgent' : 'rx-card--preparing'}`}
                            key={rx.id}
                        >
                            {/* Card Header */}
                            <div className={`rx-card__header ${rx.status === 'pending' ? 'rx-card__header--urgent' : ''}`}>
                                <div className="rx-card__header-left">
                                    <div className="rx-card__badges">
                                        <span className={`rx-status-badge rx-status-badge--${rx.status}`}>
                                            {rx.statusLabel}
                                        </span>
                                        <span className="rx-card__time">{rx.time}</span>
                                    </div>
                                    <h3 className="rx-card__patient">{rx.patient}</h3>
                                    <p className="rx-card__info">{rx.info}</p>
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
                                    {rx.medications.map((med, i) => (
                                        <div className="rx-med-item" key={i}>
                                            <div className={`rx-med-item__icon ${med.icon === 'urgent' ? 'rx-med-item__icon--urgent' : ''}`}>
                                                <svg width="12" height="15" viewBox="0 0 12 15" fill="none">
                                                    <rect x="1" y="1" width="10" height="13" rx="2" stroke={med.icon === 'urgent' ? '#dc2626' : '#6ccb75'} strokeWidth="1.5" />
                                                    <path d="M4 5H8M4 8H6" stroke={med.icon === 'urgent' ? '#dc2626' : '#6ccb75'} strokeWidth="1.2" strokeLinecap="round" />
                                                </svg>
                                            </div>
                                            <div className="rx-med-item__content">
                                                <strong className="rx-med-item__name">{med.name}</strong>
                                                <p className="rx-med-item__instructions">{med.instructions}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="rx-card__footer">
                                <button className="btn-text-action">{rx.secondaryAction}</button>
                                <button className="btn-primary-sm">{rx.actionLabel}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
