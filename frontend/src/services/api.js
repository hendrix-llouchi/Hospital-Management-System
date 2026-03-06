const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const api = {
    get: (url) => fetch(`${BASE_URL}${url}`).then(handleResponse),
    post: (url, data) => fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then(handleResponse),
    put: (url, data) => fetch(`${BASE_URL}${url}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then(handleResponse),
    delete: (url) => fetch(`${BASE_URL}${url}`, {
        method: 'DELETE',
    }).then(handleResponse),
};
