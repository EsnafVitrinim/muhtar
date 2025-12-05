import { all, takeLatest, put, select } from 'redux-saga/effects';
import * as ACTION_TYPES from '@/store/actionTypes';
import SELECTORS from '../selectors';
import userSaga from './userSaga';
import notificationsSaga from './notificationsSaga';
import categoriesSaga from './categoriesSaga';

function* initializeAppSaga() {
  const userID = yield select(SELECTORS.getUserID);
  const isAdmin = yield select(SELECTORS.getIsAdmin);
  if (userID) {
    if (isAdmin) {
      yield put({ type: ACTION_TYPES.FETCH_ALL_USERS.REQUEST });
    } else {
      yield put({ type: ACTION_TYPES.FETCH_NOTIFICATIONS.REQUEST, payload: userID });
    }
    yield put({ type: ACTION_TYPES.FETCH_CATEGORIES.REQUEST });
  }
}

export default function* rootSaga() {
  yield takeLatest(ACTION_TYPES.INITIALIZE_APP, initializeAppSaga);
  yield all([
    userSaga(),
    notificationsSaga(),
    categoriesSaga()
  ]);
}
