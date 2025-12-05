import React, { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import LinkItem from './LinkItem';
import MenuItem from './MenuItem';
import { useSelector } from 'react-redux';
import SELECTORS from '@/store/selectors';

const SidebarLinks = ({ routes, mainPath }) => {
  const pathname = usePathname();
  const isAdmin = useSelector(SELECTORS.getIsAdmin);

  const activeRoute = useCallback(
    (routeName) => {
      if (pathname === routeName) {
        return true;
      }
      return routeName !== '/' && pathname.includes(routeName);
    },
    [pathname]
  );

  const createLinks = (routes) => {
    return routes?.map((route, index) => {
      if ((isAdmin && route.hideAdmin) || (!isAdmin && route.hideUser)) {
        return null;
      }
      return (
        route.menuLinks ?
          <MenuItem key={index} activeRoute={activeRoute} route={route} />
          : <LinkItem key={index} activeRoute={activeRoute} route={route} mainPath={mainPath} />
      );
    });
  };

  return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
