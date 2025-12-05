import { setDarkTheme } from '@/store/reducers/ui/uiReducer';
import { isWindowAvailable } from '@/utils/helpers';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useDarkMode = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isWindowAvailable()) {
      const storedTheme = localStorage.getItem('muhtarDarkTheme') === 'true';
      dispatch(setDarkTheme(storedTheme));
    }
  }, [dispatch]);

};

export default useDarkMode;
