import { Fragment, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthContext } from 'contexts/AuthContext';
import { RequiredRouterProps } from 'types';

export const AdminOnly = ({ children, redirectUrl = '/' }: RequiredRouterProps) => {
  const location = useLocation();
  const { isAuthenticated: isAdmin } = useContext(AuthContext);

  const content = (
    isAdmin ? (
      <Fragment>{children}</Fragment>
    ) : (
      <Navigate to={redirectUrl} state={{ from: location }} replace />
    )
  );

  return content;
}
