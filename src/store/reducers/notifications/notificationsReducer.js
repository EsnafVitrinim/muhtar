import * as ACTION_TYPES from "@/store/actionTypes";

const initialState = {
  notifications: [],
  isLoading: false,
  error: null,
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_NOTIFICATIONS.REQUEST:
    case ACTION_TYPES.CREATE_NOTIFICATION.REQUEST:
    case ACTION_TYPES.UPDATE_NOTIFICATION.REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ACTION_TYPES.FETCH_NOTIFICATIONS.ERROR:
    case ACTION_TYPES.CREATE_NOTIFICATION.ERROR:
    case ACTION_TYPES.UPDATE_NOTIFICATION.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload || 'An error occurred!',
      };
    case ACTION_TYPES.FETCH_NOTIFICATIONS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        notifications: action.payload,
      };
    case ACTION_TYPES.CREATE_NOTIFICATION.SUCCESS:
      return {
        ...state,
        isLoading: false,
        notifications: [...state.notifications, action.payload]
      };
    case ACTION_TYPES.UPDATE_NOTIFICATION.SUCCESS:
      const updatedFields = action.payload;
      return {
        ...state,
        isLoading: false,
        notifications: state.notifications.map(item =>
          item.id === updatedFields.id ? { ...item, ...updatedFields } : item
        ),
      };
    default:
      return state;
  }
};

export default notificationsReducer;
