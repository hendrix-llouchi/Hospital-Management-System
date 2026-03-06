import { api } from './api';

export const notificationService = {
    // Doctor
    getDoctorNotifications: (doctorId) => api.get(`/notifications/doctor/${doctorId}`),
    getDoctorUnread: (doctorId) => api.get(`/notifications/doctor/${doctorId}/unread`),
    getDoctorUnreadCount: (doctorId) => api.get(`/notifications/doctor/${doctorId}/unread-count`),

    // Pharmacist
    getPharmacistNotifications: (pharmacistId) => api.get(`/notifications/pharmacist/${pharmacistId}`),
    getPharmacistUnread: (pharmacistId) => api.get(`/notifications/pharmacist/${pharmacistId}/unread`),
    getPharmacistUnreadCount: (pharmacistId) => api.get(`/notifications/pharmacist/${pharmacistId}/unread-count`),

    // Shared
    markAsRead: (notificationId) => api.put(`/notifications/${notificationId}/read`),
};
