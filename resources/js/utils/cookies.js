import Cookies from 'js-cookie';

// @param expire in days
export const setCookie = (key, value, expire=1) => {
  value = JSON.stringify(value);
  return Cookies.set(key, value, {expires: expire});
};

export const getCookie = (key) => {
  const value = Cookies.get(key);
  return value ? JSON.parse(value) : null;
};

export const removeCookie = (key) => {
  Cookies.remove(key);
};
