const crypto = require('crypto');
import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';
import { bottomRoutes, hiddenRoutes } from '@/routes';
import moment from 'moment';

export const isWindowAvailable = () => typeof window !== 'undefined';

export const findCurrentRoute = (routes, pathname) => {
  if (!isWindowAvailable()) return null;

  for (let route of routes) {
    if (route.menuLinks) {
      const found = findCurrentRoute(route.menuLinks, pathname);
      if (found) return found;
    }
    if (pathname === route.path && route) return route;
  }

  for (let route of bottomRoutes) {
    if (pathname === route.path && route) return route;
  }

  return null;
};

export const getActiveRoute = (routes, pathname) => {
  const route = findCurrentRoute(routes, pathname);
  if (route?.name) {
    return route.name;
  } else {
    const firstPath = pathname.split('/')[1];
    const hiddenRoute = findCurrentRoute(hiddenRoutes, firstPath);
    if (hiddenRoute) {
      return hiddenRoute.name;
    }
  }
  return '';
};

export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const generateUniqueID = () => {
  const uniqueID = uuidv4();
  return uniqueID;
};

export const generateUniqueCode = () => {
  const now = new Date().toISOString();
  return crypto.createHash('sha256').update(now).digest('hex').slice(0, 8);
}

export const generateUniqueIdByDate = (data, userID) => {
  const currentDate = moment();
  const year = currentDate.format('YY');
  const month = currentDate.format('MM');
  const day = currentDate.format('DD');
  const index = data.length + 1;
  const formattedIndex = String(index).padStart(2, '0');

  const unique = `${year}${month}${day}-${userID}-${formattedIndex}`;
  return unique;
}

export const splitName = (fullName) => {
  const nameArray = fullName.trim().split(" ");
  let firstname = '';
  let surname = '';

  if (nameArray.length > 1) {
    surname = nameArray.pop();
    firstname = nameArray.join(" ");
  } else {
    firstname = fullName;
  }

  return { firstname, surname };
};

export const navigateTo = (url) => {
  redirect(url);
};

export const isMobile = () => {
  return isWindowAvailable() && window.innerWidth <= 768;
};

export const isTablet = () => {
  return isWindowAvailable() && window.innerWidth > 768 && window.innerWidth <= 1024;
};

export const isMobileOrTablet = () => {
  return isMobile() || isTablet();
};
