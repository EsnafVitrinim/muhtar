import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import uiReducer from '@/store/reducers/ui/uiReducer';
import userReducer from '@/store/reducers/user/userReducer';
import notificationsReducer from '@/store/reducers/notifications/notificationsReducer';
import categoriesReducer from './reducers/categories/categoriesReducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    notifications: notificationsReducer,
    categories: categoriesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
