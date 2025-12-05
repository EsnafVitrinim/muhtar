import { call, put, takeEvery } from 'redux-saga/effects';
import * as endpoints from '@/api/endpoints';
import * as ACTION_TYPES from '@/store/actionTypes';
import { showToast } from '@/components/toast';

function* fetchNotificationsSaga(action) {
  try {
    const response = yield call(endpoints.getNotifications, action.payload);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.FETCH_NOTIFICATIONS.SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: ACTION_TYPES.FETCH_NOTIFICATIONS.ERROR, payload: error.message });
  }
}

function* createNotificationSaga(action) {
  try {
    const response = yield call(endpoints.createNotification, action.payload);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.CREATE_NOTIFICATION.SUCCESS, payload: response });
    showToast('success', 'Tebligat başarılı bir şekilde eklendi!');
  } catch (error) {
    yield put({ type: ACTION_TYPES.CREATE_NOTIFICATION.ERROR, payload: error.message });
    showToast('error', 'İşlem yapılırken bir hata oluştu!');
  }
}

function* updateNotificationSaga(action) {
  const { id: notificationID, data } = action.payload;
  try {
    const response = yield call(endpoints.updateNotification, notificationID, data);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.UPDATE_NOTIFICATION.SUCCESS, payload: response });
    showToast('success', 'İşlem başarılı bir şekilde gerçekleşti!');
  } catch (error) {
    yield put({ type: ACTION_TYPES.UPDATE_NOTIFICATION.ERROR, payload: error.message });
    showToast('error', 'İşlem yapılırken bir hata oluştu!');
  }
}

export default function* userSaga() {
  yield takeEvery(ACTION_TYPES.FETCH_NOTIFICATIONS.REQUEST, fetchNotificationsSaga);
  yield takeEvery(ACTION_TYPES.CREATE_NOTIFICATION.REQUEST, createNotificationSaga);
  yield takeEvery(ACTION_TYPES.UPDATE_NOTIFICATION.REQUEST, updateNotificationSaga);
}
