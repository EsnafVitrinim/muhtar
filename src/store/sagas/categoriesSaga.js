import { call, put, takeEvery } from 'redux-saga/effects';
import * as endpoints from '@/api/endpoints';
import * as ACTION_TYPES from '@/store/actionTypes';
import { setCreateCategoryModal } from '../reducers/ui/uiReducer';
import { showToast } from '@/components/toast';

function* fetchCategoriesSaga() {
  try {
    const response = yield call(endpoints.getCategories);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.FETCH_CATEGORIES.SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: ACTION_TYPES.FETCH_CATEGORIES.ERROR, payload: error.message });
  }
}

function* createCategorySaga(action) {
  try {
    const response = yield call(endpoints.createaCategory, action.payload);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.CREATE_CATEGORY.SUCCESS, payload: response });
    yield put(setCreateCategoryModal(false));
    showToast('success', 'Kategori başarılı bir şekilde eklendi!');
  } catch (error) {
    yield put({ type: ACTION_TYPES.CREATE_CATEGORY.ERROR, payload: error.message });
    showToast('error', 'İşlem yapılırken bir hata oluştu!');
  }
}

function* updateCategorySaga(action) {
  const { id: categoryID, data } = action.payload;
  try {
    const response = yield call(endpoints.updateCategory, categoryID, data);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.UPDATE_CATEGORY.SUCCESS, payload: response });
    showToast('success', 'İşlem başarılı bir şekilde gerçekleşti!');
  } catch (error) {
    yield put({ type: ACTION_TYPES.UPDATE_CATEGORY.ERROR, payload: error.message });
    showToast('error', 'İşlem yapılırken bir hata oluştu!');
  }
}

export default function* userSaga() {
  yield takeEvery(ACTION_TYPES.FETCH_CATEGORIES.REQUEST, fetchCategoriesSaga);
  yield takeEvery(ACTION_TYPES.CREATE_CATEGORY.REQUEST, createCategorySaga);
  yield takeEvery(ACTION_TYPES.UPDATE_CATEGORY.REQUEST, updateCategorySaga);
}
