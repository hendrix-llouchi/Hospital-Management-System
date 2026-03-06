import { api } from './api';

export const pharmacistService = {
    // Patients & Queue
    getOutpatientQueue: () => api.get('/pharmacist/patients'),
    getRecentPatients: () => api.get('/pharmacist/patients/recent'),

    // Prescriptions & Meds
    getPrescriptionDetail: (patientId) => api.get(`/pharmacist/patients/${patientId}/prescription`),
    getPendingPrescriptions: () => api.get('/pharmacist/prescriptions/pending'),
    getDispensedPrescriptions: () => api.get('/pharmacist/prescriptions/dispensed'),
    getPatientDrugs: (patientId) => api.get(`/pharmacist/patients/${patientId}/drugs`),
    getPatientPendingDrugs: (patientId) => api.get(`/pharmacist/patients/${patientId}/drugs/pending`),

    // Actions
    dispenseDrug: (drugId) => api.put(`/pharmacist/prescriptions/${drugId}/dispense`),
    cancelPrescription: (drugId) => api.put(`/pharmacist/prescriptions/${drugId}/cancel`),
    completeDispensing: (patientId) => api.put(`/pharmacist/patients/${patientId}/complete`),
};
