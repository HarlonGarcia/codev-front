import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { usePermissions } from '../../../hooks/usePermissions';

export default function RequireAdmin() {
  const location = useLocation();
  const { isAdmin } = usePermissions();

  const content = (
    isAdmin ? (
      <Outlet />
    ) : (
      <Navigate to='/' state={{ from: location }} replace />
    )
  );

  return content;
}
