import {useMemo} from 'react';
import {matchPath, matchRoutes, useLocation} from 'react-router';
import {routes} from '../routes/routes';
import ShopIcon from '../../icons/shop.svg';
import BrakesIcon from '../../icons/brakes.svg';
import AccessoriesIcon from '../../icons/accessories.svg';
import OilsIcon from '../../icons/oils.svg';
import ToolsIcon from '../../icons/tools.svg';

export const useNavigationLinks = () => {
  const navigation = {
    pages: [
      {
        path: '/shop',
        name: 'Spare parts',
        icon: ShopIcon,
      },
      {
        path: '/shop?types=7',
        name: 'Brakes',
        icon: BrakesIcon,
      },
      {
        path: '/shop?collection=7',
        name: 'Accessories',
        icon: AccessoriesIcon,
      },
      {
        path: '/shop?types=4',
        name: 'Oils',
        icon: OilsIcon,
      },
      {
        path: '/shop?collection=8',
        name: 'Tools',
        icon: ToolsIcon,
      },
    ],
    categories: [],
  };

  return navigation;
};

export const useCurrentRoute = () => {
  const location = useLocation();
  const [{route}] = matchRoutes(routes, location.pathname);

  const isCurrentPath = matchPath(route.path, location.pathname) !== null;

  return {route, isCurrentPath};
};

export const useQueryParams = () => {
  const {search} = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

export const useCurrentPath = () => {
  return useLocation().pathname;
};

export const useCurrentUrl = () => {
  const {pathname, search} = useLocation();
  return pathname+search;
};
