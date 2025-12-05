const generatePromiseActionType = (actionType) => ({
  REQUEST: `${actionType}/REQUEST`,
  SUCCESS: `${actionType}/SUCCESS`,
  ERROR: `${actionType}/ERROR`,
});

export const INITIALIZE_APP = 'INITIALIZE_APP';
export const FETCH_ALL_USERS = generatePromiseActionType('FETCH_ALL_USERS');
export const CREATE_USER = generatePromiseActionType('CREATE_USER');
export const UPDATE_USER = generatePromiseActionType('UPDATE_USER');
export const UPDATE_ALL_USER = generatePromiseActionType('UPDATE_ALL_USER');

export const SIGN_IN = generatePromiseActionType('SIGN_IN');
export const SIGN_OUT = 'SIGN_OUT';

export const FETCH_NOTIFICATIONS = generatePromiseActionType('FETCH_NOTIFICATIONS');
export const CREATE_NOTIFICATION = generatePromiseActionType('CREATE_NOTIFICATION');
export const UPDATE_NOTIFICATION = generatePromiseActionType('UPDATE_NOTIFICATION');

export const FETCH_CATEGORIES = generatePromiseActionType('FETCH_CATEGORIES');
export const CREATE_CATEGORY = generatePromiseActionType('CREATE_CATEGORY');
export const UPDATE_CATEGORY = generatePromiseActionType('UPDATE_CATEGORY');
