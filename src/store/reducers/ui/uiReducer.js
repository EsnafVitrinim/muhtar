import { isMobileOrTablet, isWindowAvailable } from '@/utils/helpers';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkTheme: true,
  sidebarOpen: !isMobileOrTablet(),
  createCategoryModalOpen: false,
  updateCategoryModal: {
    isOpen: false,
    data: {}
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkTheme = !state.darkTheme;
      if (isWindowAvailable()) {
        localStorage.setItem('muhtarDarkTheme', state.darkTheme);
        document.body.classList.toggle('dark', state.darkTheme);
      }
    },
    setDarkTheme(state, action) {
      state.darkTheme = action.payload;
      if (isWindowAvailable()) {
        localStorage.setItem('muhtarDarkTheme', state.darkTheme);
        document.body.classList.toggle('dark', state.darkTheme);
      }
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setCreateCategoryModal(state, action) {
      state.createCategoryModalOpen = action.payload;
    },
    setUpdateCategoryModal(state, action) {
      const { data, isOpen } = action.payload
      state.updateCategoryModal.isOpen = isOpen;
      state.updateCategoryModal.data = data;
    },
  },
});

export const {
  toggleDarkMode,
  setDarkTheme,
  toggleSidebar,
  setCreateCategoryModal,
  setUpdateCategoryModal
} = uiSlice.actions;

export default uiSlice.reducer;
