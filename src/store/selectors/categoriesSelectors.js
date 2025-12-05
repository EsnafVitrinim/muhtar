import { createSelector } from '@reduxjs/toolkit';

export const selectCategoriesSelector = (state) => state.categories;

export const getCategories = createSelector([selectCategoriesSelector], (categoriesState) => categoriesState.categories.filter(category => !category.deleted_at || category.deleted_at.trim() === ''));
export const getCategoriesLoading = createSelector([selectCategoriesSelector], (categoriesState) => categoriesState.isLoading);
export const getCategoriesError = createSelector([selectCategoriesSelector], (categoriesState) => categoriesState.error);
