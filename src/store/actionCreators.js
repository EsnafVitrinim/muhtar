import * as ACTION_TYPES from './actionTypes';
import { removeAuthToken } from '@/utils/cookies';

export const signInRequest = (payload) => ({ type: ACTION_TYPES.SIGN_IN.REQUEST, payload });

export const signOutRequest = () => {
  removeAuthToken();
  return {
    type: ACTION_TYPES.SIGN_OUT,
  };
};

export const createUserAction = (payload) => ({ type: ACTION_TYPES.CREATE_USER.REQUEST, payload });
export const updateUserAction = (payload) => ({ type: ACTION_TYPES.UPDATE_USER.REQUEST, payload });

export const createNotificationAction = (payload) => ({ type: ACTION_TYPES.CREATE_NOTIFICATION.REQUEST, payload });
export const updateNotificationAction = (payload) => ({ type: ACTION_TYPES.UPDATE_NOTIFICATION.REQUEST, payload });

export const createCategoryAction = (payload) => ({ type: ACTION_TYPES.CREATE_CATEGORY.REQUEST, payload });
export const updateCategoryAction = (payload) => ({ type: ACTION_TYPES.UPDATE_CATEGORY.REQUEST, payload });
