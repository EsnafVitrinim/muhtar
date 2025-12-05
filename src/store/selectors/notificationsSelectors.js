import { createSelector } from '@reduxjs/toolkit';

export const selectNotificationsSelector = (state) => state.notifications;

export const getAllNotifications = createSelector([selectNotificationsSelector], (notificationState) => notificationState.notifications);;
export const getNotifications = createSelector([selectNotificationsSelector], (notificationState) => notificationState.notifications.filter(notification => !notification.deleted_at || notification.deleted_at.trim() === ''));
export const getDeletedNotifications = createSelector([selectNotificationsSelector], (notificationState) => notificationState.notifications.filter(notification => notification.deleted_at));
export const getNotificationsLoading = createSelector([selectNotificationsSelector], (notificationState) => notificationState.isLoading);
export const getNotificationsError = createSelector([selectNotificationsSelector], (notificationState) => notificationState.error);
