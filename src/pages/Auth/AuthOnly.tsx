import { Fragment, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthContext } from 'contexts/AuthContext';
import { RequiredRouterProps } from 'types';

export const AuthOnly = ({ children, redirectUrl = '/' }: RequiredRouterProps) => {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  const content = (
    isAuthenticated ? (
      <Fragment>{children}</Fragment>
    ) : (
      <Navigate to={redirectUrl} state={{ from: location }} replace />
    )
  );

  return content;
}
