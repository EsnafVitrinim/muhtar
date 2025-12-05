import * as ACTION_TYPES from "@/store/actionTypes";

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_CATEGORIES.REQUEST:
    case ACTION_TYPES.CREATE_CATEGORY.REQUEST:
    case ACTION_TYPES.UPDATE_CATEGORY.REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ACTION_TYPES.FETCH_CATEGORIES.ERROR:
    case ACTION_TYPES.CREATE_CATEGORY.ERROR:
    case ACTION_TYPES.UPDATE_CATEGORY.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload || 'An error occurred!',
      };
    case ACTION_TYPES.FETCH_CATEGORIES.SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      };
    case ACTION_TYPES.CREATE_CATEGORY.SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: [...state.categories, action.payload]
      };
    case ACTION_TYPES.UPDATE_CATEGORY.SUCCESS:
      const updatedFields = action.payload;
      return {
        ...state,
        isLoading: false,
        categories: state.categories.map(item =>
          item.id === updatedFields.id ? { ...item, ...updatedFields } : item
        ),
      };
    default:
      return state;
  }
};

export default categoriesReducer;
