import { Fragment, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthContext } from 'contexts/AuthContext';
import { RequiredRouterProps } from 'types';

export const AdminOnly = ({ children, redirectTo = '/' }: RequiredRouterProps) => {
    const location = useLocation();
    const { isAdmin } = useContext(AuthContext);

    const content = (
        isAdmin ? (
            <Fragment>{children}</Fragment>
        ) : (
            <Navigate to={redirectTo} state={{ from: location }} replace />
        )
    );

    return content;
}
