import Cookies from 'js-cookie';

export const setAuthToken = (token) => {
  Cookies.set('pushMarkAuthToken', token, { expires: 1 });
};

export const getAuthToken = () => {
  return Cookies.get('pushMarkAuthToken');
};

export const removeAuthToken = () => {
  Cookies.remove('pushMarkAuthToken');
};
