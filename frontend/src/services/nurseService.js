import { api } from './api';

export const nurseService = {
    // Registration
    registerPatient: (patientData) => api.post('/intake/register', patientData),

    // Vitals
    submitVitals: (intakeId, vitals) => api.post(`/intake/${intakeId}/vitals`, vitals),
    getPatientVitals: (patientId) => api.get(`/intake/patients/${patientId}/vitals`),

    // Intakes & Queue
    getActiveIntakes: (nurseId) => api.get(`/intake/my-active?nurseId=${nurseId}`),
    releaseIntake: (intakeId) => api.delete(`/intake/${intakeId}/release`),

    // Search
    getAllPatients: () => api.get('/intake/patients'),
    getPatientById: (id) => api.get(`/intake/patients/by-patient-id/${id}`),
};
