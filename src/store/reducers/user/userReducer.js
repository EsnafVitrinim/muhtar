import * as ACTION_TYPES from "@/store/actionTypes";

const initialState = {
  user: {},
  allUsers: [],
  isLoading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL_USERS.REQUEST:
    case ACTION_TYPES.CREATE_USER.REQUEST:
    case ACTION_TYPES.UPDATE_USER.REQUEST:
    case ACTION_TYPES.SIGN_IN.REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ACTION_TYPES.FETCH_ALL_USERS.ERROR:
    case ACTION_TYPES.CREATE_USER.ERROR:
    case ACTION_TYPES.UPDATE_USER.ERROR:
    case ACTION_TYPES.SIGN_IN.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload || 'An error occurred!',
      };
    case ACTION_TYPES.FETCH_ALL_USERS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        allUsers: action.payload,
      };
    case ACTION_TYPES.CREATE_USER.SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null
      };
    case ACTION_TYPES.UPDATE_USER.SUCCESS:
      const updatedFields = action.payload;
      return {
        ...state,
        isLoading: false,
        user: { ...state.user, ...updatedFields }
      };
    case ACTION_TYPES.UPDATE_ALL_USER.SUCCESS:
      const updatedData = action.payload;
      return {
        ...state,
        isLoading: false,
        allUsers: state.allUsers.map(item =>
          item.id === updatedData.id ? { ...item, ...updatedData } : item
        ),
      };
    case ACTION_TYPES.SIGN_IN.SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
      };
    case ACTION_TYPES.SIGN_OUT:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export default userReducer;
