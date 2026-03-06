import { useState } from 'react';
import Header from '../../components/Header';
import { nurseService } from '../../services/nurseService';
import './NurseDashboard.css';

export default function NurseDashboard() {
    const [loading, setLoading] = useState(false);
    const [activeIntakes, setActiveIntakes] = useState([]);
    const [patient, setPatient] = useState({
        name: '', age: '', gender: '', phone: '',
        temperature: '', weight: '', height: '',
        hospitalId: '', nhis: '', notes: '',
    });

    // Dummy nurseId for demo, in real app get from auth context
    const NURSE_ID = 1;

    useEffect(() => {
        const fetchIntakes = async () => {
            try {
                const data = await nurseService.getActiveIntakes(NURSE_ID);
                setActiveIntakes(data || []);
            } catch (error) {
                console.error('Failed to fetch intakes:', error);
            }
        };
        fetchIntakes();
        // Poll every 30 seconds
        const interval = setInterval(fetchIntakes, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (field) => (e) => {
        setPatient({ ...patient, [field]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const registeredPatient = await nurseService.registerPatient(patient);
            // If the intake ID is returned or if we need to submit vitals separately
            const intakeId = registeredPatient.id || registeredPatient.intakeId;
            if (intakeId) {
                await nurseService.submitVitals(intakeId, {
                    temperature: patient.temperature,
                    weight: patient.weight,
                    height: patient.height,
                });
            }
            alert('Patient registered and vitals submitted successfully!');
            setPatient({
                name: '', age: '', gender: '', phone: '',
                temperature: '', weight: '', height: '',
                hospitalId: '', nhis: '', notes: '',
            });
            // Refresh queue after registration
            const queueData = await nurseService.getActiveIntakes(NURSE_ID);
            setActiveIntakes(queueData || []);
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="nurse-page">
            <Header role="nurse" userName="Nurse Sarah" specialty="General Ward" />

            <main className="nurse-main">
                <div className="nurse-main__header">
                    <div>
                        <div className="nurse-main__header-badges">
                            <span className="badge badge--in-progress">Active</span>
                            <span className="text-muted-sm">Registration Queue: {activeIntakes.length} patients</span>
                        </div>
                        <h1 className="page-heading">Patient Registration</h1>
                    </div>
                    <button className="btn-primary-action" id="submit-patient-btn" onClick={handleSubmit}>
                        Register Patient
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="nurse-content">
                    {/* Left: Registration Form */}
                    <section className="nurse-form-section">
                        <div className="card">
                            <div className="card__header card__header--muted">
                                <div className="card__title-group">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <circle cx="10" cy="7" r="4" stroke="#6ccb75" strokeWidth="1.5" />
                                        <path d="M3 18C3 14.5 6 12 10 12C14 12 17 14.5 17 18" stroke="#6ccb75" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    <h3 className="card__title">Patient Information</h3>
                                </div>
                            </div>

                            <div className="card__body">
                                <div className="form-grid">
                                    <div className="form-section">
                                        <label className="form-section__label">Full Name</label>
                                        <div className="form-section__input-box">
                                            <input className="form-section__input" placeholder="Enter patient's full name" value={patient.name} onChange={handleChange('name')} />
                                        </div>
                                    </div>
                                    <div className="form-grid__row-2">
                                        <div className="form-section">
                                            <label className="form-section__label">Age</label>
                                            <div className="form-section__input-box">
                                                <input className="form-section__input" type="number" placeholder="Age" value={patient.age} onChange={handleChange('age')} />
                                            </div>
                                        </div>
                                        <div className="form-section">
                                            <label className="form-section__label">Gender</label>
                                            <div className="form-section__select-box">
                                                <select className="form-section__select" value={patient.gender} onChange={handleChange('gender')}>
                                                    <option value="">Select gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-section">
                                        <label className="form-section__label">Phone Number</label>
                                        <div className="form-section__input-box">
                                            <input className="form-section__input" placeholder="Enter phone number" value={patient.phone} onChange={handleChange('phone')} />
                                        </div>
                                    </div>
                                    <div className="form-grid__row-2">
                                        <div className="form-section">
                                            <label className="form-section__label">Hospital ID</label>
                                            <div className="form-section__input-box">
                                                <input className="form-section__input" placeholder="e.g., PT-84729" value={patient.hospitalId} onChange={handleChange('hospitalId')} />
                                            </div>
                                        </div>
                                        <div className="form-section">
                                            <label className="form-section__label">NHIS Number (Optional)</label>
                                            <div className="form-section__input-box">
                                                <input className="form-section__input" placeholder="NHIS number" value={patient.nhis} onChange={handleChange('nhis')} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vitals */}
                        <div className="card">
                            <div className="card__header card__header--muted">
                                <div className="card__title-group">
                                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                                        <path d="M1 8H4L7 2L10 14L13 6L16 8H19" stroke="#6ccb75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <h3 className="card__title">Vital Signs</h3>
                                </div>
                            </div>

                            <div className="card__body">
                                <div className="form-grid__row-3">
                                    <div className="form-section">
                                        <label className="form-section__label">Temperature (°F)</label>
                                        <div className="form-section__input-box">
                                            <input className="form-section__input" type="number" step="0.1" placeholder="e.g., 98.6" value={patient.temperature} onChange={handleChange('temperature')} />
                                        </div>
                                    </div>
                                    <div className="form-section">
                                        <label className="form-section__label">Weight (kg)</label>
                                        <div className="form-section__input-box">
                                            <input className="form-section__input" type="number" placeholder="e.g., 82" value={patient.weight} onChange={handleChange('weight')} />
                                        </div>
                                    </div>
                                    <div className="form-section">
                                        <label className="form-section__label">Height (cm)</label>
                                        <div className="form-section__input-box">
                                            <input className="form-section__input" type="number" placeholder="e.g., 180" value={patient.height} onChange={handleChange('height')} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="card">
                            <div className="card__header card__header--muted">
                                <div className="card__title-group">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M3 4H17M3 8H13M3 12H17M3 16H10" stroke="#6ccb75" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    <h3 className="card__title">Chief Complaint / Notes</h3>
                                </div>
                            </div>
                            <div className="card__body">
                                <textarea
                                    className="form-section__textarea form-section__textarea--full"
                                    rows="4"
                                    placeholder="Brief description of patient's current symptoms..."
                                    value={patient.notes}
                                    onChange={handleChange('notes')}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Right: Notifications / Queue */}
                    <aside className="nurse-sidebar">
                        <div className="card">
                            <div className="card__header">
                                <div className="card__title-group">
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                                        <path d="M13 7C13 5.67 12.47 4.4 11.54 3.46C10.6 2.53 9.33 2 8 2C6.67 2 5.4 2.53 4.46 3.46C3.53 4.4 3 5.67 3 7C3 14 1 16 1 16H15C15 16 13 14 13 7Z" stroke="#6a816c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9.15 19C8.87 19.44 8.45 19.72 8 19.72C7.55 19.72 7.13 19.44 6.85 19" stroke="#6a816c" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    <h3 className="card__title">Notifications</h3>
                                </div>
                                <span className="notification-count">3</span>
                            </div>
                            <div className="notification-list">
                                <div className="notification-item notification-item--new">
                                    <div className="notification-item__dot" />
                                    <div className="notification-item__content">
                                        <p className="notification-item__text"><strong>Doctor is available</strong> — Please prepare next patient for consultation.</p>
                                        <span className="notification-item__time">2 mins ago</span>
                                    </div>
                                </div>
                                <div className="notification-item">
                                    <div className="notification-item__dot notification-item__dot--read" />
                                    <div className="notification-item__content">
                                        <p className="notification-item__text">Patient <strong>Elena Rodriguez</strong> consultation completed.</p>
                                        <span className="notification-item__time">15 mins ago</span>
                                    </div>
                                </div>
                                <div className="notification-item">
                                    <div className="notification-item__dot notification-item__dot--read" />
                                    <div className="notification-item__content">
                                        <p className="notification-item__text">Prescription sent to pharmacist for <strong>Robert Chen</strong>.</p>
                                        <span className="notification-item__time">32 mins ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Queue */}
                        <div className="card">
                            <div className="card__header">
                                <div className="card__title-group">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <rect x="2" y="2" width="16" height="16" rx="2" stroke="#6ccb75" strokeWidth="1.5" />
                                        <path d="M6 7H14M6 10H14M6 13H10" stroke="#6ccb75" strokeWidth="1.2" strokeLinecap="round" />
                                    </svg>
                                    <h3 className="card__title">Waiting Queue</h3>
                                </div>
                            </div>
                            <div className="queue-list">
                                {activeIntakes.length === 0 ? (
                                    <div className="empty-state-sm">Queue is empty</div>
                                ) : (
                                    activeIntakes.map((intake, i) => (
                                        <div className="queue-item" key={intake.id || i}>
                                            <div className="queue-item__number">{i + 1}</div>
                                            <div className="queue-item__info">
                                                <span className="queue-item__name">{intake.patient?.name || intake.patientName || 'Unknown Patient'}</span>
                                                <span className="queue-item__status">
                                                    {intake.status || 'Waiting'}
                                                </span>
                                            </div>
                                            <button
                                                className="btn-text-action btn-destructive"
                                                onClick={async () => {
                                                    try {
                                                        await nurseService.releaseIntake(intake.id);
                                                        setActiveIntakes(activeIntakes.filter(it => it.id !== intake.id));
                                                    } catch (err) {
                                                        alert(`Failed to release: ${err.message}`);
                                                    }
                                                }}
                                                title="Release Patient"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
