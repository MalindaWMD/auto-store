import React from 'react';
import {useNavigationLinks} from '../../hooks/routes';

export default function FlyoutMenus({as}) {
  const navigation = useNavigationLinks();

  return (
    <div className="flex h-full justify-center space-x-8">
      {navigation.pages.map((page) => (
        <a
          key={page.name}
          href={page.path}
          className="flex items-center text-sm font-medium text-white hover:text-gray-100">
          <span className="h-5 w-5 mr-1">{page.icon}</span>
          {page.name}
        </a>
      ))}
    </div>
  );
}
