import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as endpoints from '@/api/endpoints';
import * as ACTION_TYPES from '@/store/actionTypes';
import { signIn } from 'next-auth/react';
import { showToast } from '@/components/toast';
import SELECTORS from '../selectors';
import { navigateTo } from '@/utils/helpers';

function* fetchAllUsersSaga() {
  try {
    const response = yield call(endpoints.getAllUsers);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.FETCH_ALL_USERS.SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: ACTION_TYPES.FETCH_ALL_USERS.ERROR, payload: error.message });
  }
}


function* createUserSaga(action) {
  try {
    const response = yield call(endpoints.createUser, action.payload);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.CREATE_USER.SUCCESS, payload: response });
    showToast('success', 'Kaydınız başarılı bir şekilde oluşturuldu! Giriş yapabilirsiniz.');
  } catch (error) {
    yield put({ type: ACTION_TYPES.CREATE_USER.ERROR, payload: error.message });
    showToast('error', error.message || 'İşlem yapılırken bir hata oluştu!');
  }
}

function* updateUserSaga(action) {
  const { id: userID, data } = action.payload;
  const { isAdmin: payloadAdmin } = data;
  const isPayloadAdmin = Number(payloadAdmin) === 1;
  const isAdmin = yield select(SELECTORS.getIsAdmin);
  try {
    const response = yield call(endpoints.updateUser, userID, data);
    if (response.error) throw new Error(response.error);
    if (isAdmin && !isPayloadAdmin) {
      yield put({ type: ACTION_TYPES.UPDATE_ALL_USER.SUCCESS, payload: response });
    } else {
      yield put({ type: ACTION_TYPES.UPDATE_USER.SUCCESS, payload: response });
    }
    showToast('success', 'İşlem başarılı bir şekilde gerçekleşti!');
  } catch (error) {
    yield put({ type: ACTION_TYPES.UPDATE_USER.ERROR, payload: error.message });
    showToast('error', error.message || 'İşlem yapılırken bir hata oluştu!');
  }
}

function* signInSaga(action) {
  try {
    const loginResponse = yield call(endpoints.login, action.payload);
    if (loginResponse && !loginResponse.error) {
      const result = yield call(signIn, "credentials", {
        name: action.payload.name,
        password: action.payload.password,
        redirect: false,
        callbackUrl: "/",
        userData: JSON.stringify(loginResponse)
      });

      if (result.error) {
        yield put({
          type: ACTION_TYPES.SIGN_IN.ERROR,
          payload: result.error || "Giriş sırasında bir hata oluştu.",
        });
      } else {
        yield put({
          type: ACTION_TYPES.SIGN_IN.SUCCESS,
          payload: loginResponse,
        });
        showToast('success', 'Giriş başarılı!.');
      }
    } else {
      yield put({
        type: ACTION_TYPES.SIGN_IN.ERROR,
        payload: loginResponse.error || "Giriş başarısız. Geçersiz kimlik bilgileri.",
      });
    }
  } catch (error) {
    yield put({
      type: ACTION_TYPES.SIGN_IN.ERROR,
      payload: error.message || "Beklenmeyen bir hata oluştu.",
    });
    console.log("error", error);
  }
}

export default function* userSaga() {
  yield takeEvery(ACTION_TYPES.FETCH_ALL_USERS.REQUEST, fetchAllUsersSaga);
  yield takeEvery(ACTION_TYPES.CREATE_USER.REQUEST, createUserSaga);
  yield takeEvery(ACTION_TYPES.UPDATE_USER.REQUEST, updateUserSaga);
  yield takeEvery(ACTION_TYPES.SIGN_IN.REQUEST, signInSaga);
}
