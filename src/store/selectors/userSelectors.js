import { createSelector } from '@reduxjs/toolkit';

export const selectUserState = (state) => state.user;

export const getUser = createSelector([selectUserState], (userState) => userState.user);
export const getUserID = createSelector([selectUserState], (userState) => userState.user.id);
export const getIsAdmin = createSelector([selectUserState], (userState) => Number(userState.user.isAdmin) === 1);
export const getUserLoading = createSelector([selectUserState], (userState) => userState.isLoading);
export const getUserError = createSelector([selectUserState], (userState) => userState.error);
export const getAllUsers = createSelector([selectUserState], (userState) => userState.allUsers);
