import { useState } from 'react';
import Header from '../../components/Header';
import './DoctorDashboard.css';

export default function DoctorDashboard() {
    const [chiefComplaint, setChiefComplaint] = useState('Mild chest pain and shortness of breath during exercise.');
    const [diagnosis, setDiagnosis] = useState(
        'Patient reports episodic chest discomfort primarily upon exertion. Vitals show slight elevation in blood pressure. No history of cardiac events. ECG recommended to rule out ischemic heart disease. Advised rest and monitoring.'
    );
    const [newDrug, setNewDrug] = useState('');
    const [newDosage, setNewDosage] = useState('');
    const [newDuration, setNewDuration] = useState('0');
    const [labTests, setLabTests] = useState(['ECG (Electrocardiogram)', 'Complete Blood Count (CBC)']);

    const medications = [
        {
            name: 'Aspirin (Acetylsalicylic acid)',
            form: '75 mg, Tablets',
            dosage: '1 tab, Once daily',
            duration: '30 days',
        },
    ];

    const removeLabTest = (index) => {
        setLabTests(labTests.filter((_, i) => i !== index));
    };

    return (
        <div className="doctor-page">
            <Header role="doctor" userName="Dr. Sarah Jenkins" specialty="Cardiology" />

            <main className="doctor-main">
                {/* Header Section */}
                <div className="doctor-main__header">
                    <div className="doctor-main__header-left">
                        <div className="doctor-main__header-badges">
                            <span className="badge badge--in-progress">In Progress</span>
                            <div className="doctor-main__time">
                                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="7" stroke="#6a816c" strokeWidth="1.5" />
                                    <path d="M8 4V8L10.5 10.5" stroke="#6a816c" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                <span className="text-muted-sm">10:30 AM - 11:00 AM</span>
                            </div>
                        </div>
                        <h1 className="page-heading">Consultation Dashboard</h1>
                    </div>
                    <button className="btn-primary-action" id="complete-next-btn">
                        Complete & Next Patient
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Content Area */}
                <div className="doctor-content">
                    {/* Left Sidebar */}
                    <aside className="doctor-sidebar">
                        {/* Patient Card */}
                        <div className="patient-card">
                            <div className="patient-card__header">
                                <button className="patient-card__edit-btn" aria-label="Edit patient">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <path d="M13.5 2.25L15.75 4.5L5.25 15H3V12.75L13.5 2.25Z" stroke="#6a816c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                <div className="patient-card__avatar">
                                    <div className="patient-card__avatar-circle">
                                        <span>JD</span>
                                    </div>
                                </div>
                                <h3 className="patient-card__name">John Doe</h3>
                                <p className="patient-card__id">ID: #PT-84729</p>
                                <div className="patient-card__tags">
                                    <span className="tag">Male, 45</span>
                                    <span className="tag">Blood: O+</span>
                                </div>
                            </div>

                            <div className="patient-card__body">
                                <div className="patient-card__stats">
                                    <div className="stat-row">
                                        <span className="stat-label">Height</span>
                                        <span className="stat-value">180 cm</span>
                                    </div>
                                    <div className="stat-row">
                                        <span className="stat-label">Weight</span>
                                        <span className="stat-value">82 kg</span>
                                    </div>
                                    <div className="stat-row">
                                        <span className="stat-label">Allergies</span>
                                        <span className="stat-value stat-value--danger">Penicillin</span>
                                    </div>
                                </div>
                                <button className="btn-outline-primary" id="view-history-btn">View Full History</button>
                            </div>
                        </div>

                        {/* Vitals Card */}
                        <div className="vitals-card">
                            <div className="vitals-card__header">
                                <div className="vitals-card__title-group">
                                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                                        <path d="M1 8H4L7 2L10 14L13 6L16 8H19" stroke="#6ccb75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <h3 className="vitals-card__title">Current<br />Vitals</h3>
                                </div>
                                <div className="vitals-card__by">
                                    <svg width="13" height="7" viewBox="0 0 13 7" fill="none">
                                        <path d="M6.5 0L12.5 7H0.5L6.5 0Z" fill="#6a816c" opacity="0.5" />
                                    </svg>
                                    <span className="text-xs-muted">Nurse<br />Sarah</span>
                                </div>
                            </div>

                            <div className="vitals-grid">
                                <div className="vital-item">
                                    <div className="vital-item__label">
                                        <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                                            <path d="M6 10C6 10 1 7.5 1 4C1 2.5 2.5 1 4 1C5 1 5.7 1.5 6 2C6.3 1.5 7 1 8 1C9.5 1 11 2.5 11 4C11 7.5 6 10 6 10Z" stroke="#6a816c" strokeWidth="1.2" />
                                        </svg>
                                        <span>Heart Rate</span>
                                    </div>
                                    <div className="vital-item__value">72 <small>bpm</small></div>
                                </div>
                                <div className="vital-item">
                                    <div className="vital-item__label">
                                        <svg width="12" height="11" viewBox="0 0 12 12" fill="none">
                                            <path d="M6 1L8 6H4L6 11" stroke="#6a816c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span>Blood<br />Press.</span>
                                    </div>
                                    <div className="vital-item__value">135/85</div>
                                    <div className="vital-item__unit">mmHg</div>
                                </div>
                                <div className="vital-item">
                                    <div className="vital-item__label">
                                        <svg width="6" height="12" viewBox="0 0 6 12" fill="none">
                                            <path d="M3 1V7M1 7C1 8.1 1.9 9 3 9C4.1 9 5 8.1 5 7" stroke="#6a816c" strokeWidth="1.2" strokeLinecap="round" />
                                        </svg>
                                        <span>Temp</span>
                                    </div>
                                    <div className="vital-item__value">98.6 <small>°F</small></div>
                                </div>
                                <div className="vital-item">
                                    <div className="vital-item__label">
                                        <svg width="12" height="10" viewBox="0 0 14 12" fill="none">
                                            <circle cx="7" cy="6" r="5" stroke="#6a816c" strokeWidth="1.2" />
                                            <path d="M5 6L6.5 7.5L9 5" stroke="#6a816c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span>SpO2</span>
                                    </div>
                                    <div className="vital-item__value">98 <small>%</small></div>
                                </div>
                            </div>

                            <p className="vitals-card__timestamp">Recorded 15 mins ago</p>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <section className="doctor-main-content">
                        {/* Consultation Notes */}
                        <div className="card">
                            <div className="card__header card__header--muted">
                                <div className="card__title-group">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M3 4H17M3 8H13M3 12H17M3 16H10" stroke="#6ccb75" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    <h3 className="card__title">Consultation Notes</h3>
                                </div>
                                <div className="card__actions">
                                    <button className="icon-btn" aria-label="Copy">
                                        <svg width="13" height="17" viewBox="0 0 14 18" fill="none">
                                            <rect x="3" y="3" width="10" height="14" rx="1" stroke="#6a816c" strokeWidth="1.5" />
                                            <path d="M11 1H2C1.45 1 1 1.45 1 2V13" stroke="#6a816c" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                    <button className="icon-btn" aria-label="Mic">
                                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                                            <rect x="3.5" y="1" width="5" height="8" rx="2.5" stroke="#6a816c" strokeWidth="1.5" />
                                            <path d="M1 7C1 9.76 3.24 12 6 12C8.76 12 11 9.76 11 7" stroke="#6a816c" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M6 12V15" stroke="#6a816c" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="card__body">
                                {/* Chief Complaint */}
                                <div className="form-section">
                                    <label className="form-section__label">Chief Complaint</label>
                                    <div className="form-section__input-box">
                                        <input
                                            type="text"
                                            className="form-section__input"
                                            value={chiefComplaint}
                                            onChange={(e) => setChiefComplaint(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Diagnosis */}
                                <div className="form-section">
                                    <label className="form-section__label">Diagnosis & Observations</label>
                                    <div className="rte-toolbar">
                                        <button className="rte-btn" aria-label="Bold"><strong>B</strong></button>
                                        <button className="rte-btn" aria-label="Italic"><em>I</em></button>
                                        <button className="rte-btn" aria-label="Underline"><u>U</u></button>
                                        <span className="rte-divider" />
                                        <button className="rte-btn" aria-label="Unordered list">
                                            <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                                                <circle cx="1.5" cy="2" r="1.5" fill="#6a816c" />
                                                <circle cx="1.5" cy="6" r="1.5" fill="#6a816c" />
                                                <circle cx="1.5" cy="10" r="1.5" fill="#6a816c" />
                                                <line x1="5" y1="2" x2="14" y2="2" stroke="#6a816c" strokeWidth="1.5" />
                                                <line x1="5" y1="6" x2="14" y2="6" stroke="#6a816c" strokeWidth="1.5" />
                                                <line x1="5" y1="10" x2="14" y2="10" stroke="#6a816c" strokeWidth="1.5" />
                                            </svg>
                                        </button>
                                        <button className="rte-btn" aria-label="Ordered list">
                                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none">
                                                <text x="0" y="4" fill="#6a816c" fontSize="5" fontWeight="600">1.</text>
                                                <text x="0" y="9" fill="#6a816c" fontSize="5" fontWeight="600">2.</text>
                                                <text x="0" y="14" fill="#6a816c" fontSize="5" fontWeight="600">3.</text>
                                                <line x1="5" y1="2.5" x2="14" y2="2.5" stroke="#6a816c" strokeWidth="1.5" />
                                                <line x1="5" y1="7.5" x2="14" y2="7.5" stroke="#6a816c" strokeWidth="1.5" />
                                                <line x1="5" y1="12.5" x2="14" y2="12.5" stroke="#6a816c" strokeWidth="1.5" />
                                            </svg>
                                        </button>
                                    </div>
                                    <textarea
                                        className="form-section__textarea"
                                        rows="5"
                                        value={diagnosis}
                                        onChange={(e) => setDiagnosis(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Prescription Section */}
                        <div className="card">
                            <div className="card__header">
                                <div className="card__title-group">
                                    <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                                        <rect x="2" y="1" width="16" height="20" rx="2" stroke="#6ccb75" strokeWidth="1.5" />
                                        <path d="M6 6H14M6 10H14M6 14H10" stroke="#6ccb75" strokeWidth="1.3" strokeLinecap="round" />
                                    </svg>
                                    <h3 className="card__title">Prescription</h3>
                                </div>
                                <button className="btn-text-primary" id="add-med-btn">
                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                                        <path d="M5.5 1V10M1 5.5H10" stroke="#6ccb75" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    Add Medication
                                </button>
                            </div>

                            <div className="prescription-list">
                                {medications.map((med, i) => (
                                    <div className="prescription-item" key={i}>
                                        <div className="prescription-item__icon">
                                            <svg width="12" height="15" viewBox="0 0 12 15" fill="none">
                                                <rect x="1" y="1" width="10" height="13" rx="2" stroke="#6ccb75" strokeWidth="1.5" />
                                                <path d="M4 5H8M4 8H6" stroke="#6ccb75" strokeWidth="1.2" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <div className="prescription-item__details">
                                            <div className="prescription-item__drug">
                                                <strong className="prescription-item__name">{med.name}</strong>
                                                <span className="prescription-item__form">{med.form}</span>
                                            </div>
                                            <div className="prescription-item__meta">
                                                <div className="prescription-item__meta-col">
                                                    <span className="meta-label">Dosage</span>
                                                    <span className="meta-value">{med.dosage}</span>
                                                </div>
                                                <div className="prescription-item__meta-col">
                                                    <span className="meta-label">Duration</span>
                                                    <span className="meta-value">{med.duration}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add New Medication Form */}
                            <div className="add-med-form">
                                <div className="add-med-form__row">
                                    <div className="add-med-form__field add-med-form__field--wide">
                                        <label className="add-med-form__label">Drug Name</label>
                                        <div className="add-med-form__input-wrap">
                                            <input
                                                type="text"
                                                className="add-med-form__input"
                                                placeholder="Search drug database..."
                                                value={newDrug}
                                                onChange={(e) => setNewDrug(e.target.value)}
                                            />
                                            <svg className="add-med-form__search-icon" width="14" height="14" viewBox="0 0 15 15" fill="none">
                                                <circle cx="6.5" cy="6.5" r="5.5" stroke="#6b7280" strokeWidth="1.5" />
                                                <path d="M10.5 10.5L14 14" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="add-med-form__field">
                                        <label className="add-med-form__label">Dosage Instruction</label>
                                        <input
                                            type="text"
                                            className="add-med-form__input"
                                            placeholder="e.g., 1 tablet twice daily"
                                            value={newDosage}
                                            onChange={(e) => setNewDosage(e.target.value)}
                                        />
                                    </div>
                                    <div className="add-med-form__field add-med-form__field--narrow">
                                        <label className="add-med-form__label">Duration (Days)</label>
                                        <input
                                            type="number"
                                            className="add-med-form__input"
                                            value={newDuration}
                                            onChange={(e) => setNewDuration(e.target.value)}
                                        />
                                    </div>
                                    <div className="add-med-form__field add-med-form__field--narrow add-med-form__field--buttons">
                                        <button className="btn-secondary" type="button">Cancel</button>
                                        <button className="btn-save" type="button">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Lab Investigations */}
                        <div className="card">
                            <div className="card__header">
                                <div className="card__title-group">
                                    <svg width="14" height="19" viewBox="0 0 14 19" fill="none">
                                        <path d="M5 1V7L1 13C0.5 14 1 15.5 2.5 16H11.5C13 15.5 13.5 14 13 13L9 7V1" stroke="#6ccb75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4 1H10" stroke="#6ccb75" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    <h3 className="card__title">Lab Investigations</h3>
                                </div>
                                <button className="btn-text-muted">
                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                                        <path d="M5.5 1V10M1 5.5H10" stroke="#6a816c" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    Order Test
                                </button>
                            </div>

                            <div className="lab-tests">
                                {labTests.map((test, i) => (
                                    <div className="lab-test-chip" key={i}>
                                        <span>{test}</span>
                                        <button className="lab-test-chip__remove" onClick={() => removeLabTest(i)} aria-label={`Remove ${test}`}>
                                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                                                <path d="M1 1L8 8M8 1L1 8" stroke="#6a816c" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                                <button className="lab-test-add">
                                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                                        <path d="M4.5 0.5V8.5M0.5 4.5H8.5" stroke="#6a816c" strokeWidth="1.2" strokeLinecap="round" />
                                    </svg>
                                    Add Test
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
