import { fetchRequest as api } from './fetchRequest';

export const createUser = (data) => api('users', 'POST', data);
export const updateUser = (id, data) => api(`users/${id}`, 'PUT', data);
export const getUser = (userID) => api(`user/${userID}`, 'GET');
export const login = (data) => api('login', 'POST', data);
export const getAllUsers = () => api('users', 'GET');

export const getNotifications = (userID) => api(`tebligatlar/${userID}`, 'GET');
export const createNotification = (data) => api(`tebligatlar`, 'POST', data);
export const updateNotification = (id, data) => api(`tebligatlar/${id}`, 'PUT', data);

export const getCategories = () => api(`categories`, 'GET');
export const createaCategory = (data) => api(`categories`, 'POST', data);
export const updateCategory = (id, data) => api(`categories/${id}`, 'PUT', data);
