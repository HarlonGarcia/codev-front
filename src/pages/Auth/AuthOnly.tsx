import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { AuthContext } from '@contexts/AuthContext';
import { RequiredRouterProps } from '@types';

export default function AuthOnly({ redirectUrl = '/' }: RequiredRouterProps) {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  const content = (
    isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate to={redirectUrl} state={{ from: location }} replace />
    )
  );

  return content;
}
