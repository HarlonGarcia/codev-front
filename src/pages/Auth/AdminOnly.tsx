import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { AuthContext } from '@contexts/AuthContext';
import { RequiredRouterProps } from '@types';

export default function AdminOnly({ redirectUrl = '/' }: RequiredRouterProps) {
  const location = useLocation();
  const { isAuthenticated: isAdmin } = useContext(AuthContext);

  const content = (
    isAdmin ? (
      <Outlet />
    ) : (
      <Navigate to={redirectUrl} state={{ from: location }} replace />
    )
  );

  return content;
}
