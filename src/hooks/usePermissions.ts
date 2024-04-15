import { useState } from 'react';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

import { JwtPayload, jwtDecode as decode } from 'jwt-decode';

import { IRole } from '../types';
import { IUser } from '../types/User';
import { getCookie } from '../utils';
import { AUTH_KEY } from '../utils/constants';

interface JwtContent extends JwtPayload {
  groups: string[];
}

const ADMIN: IRole = 'ADMIN';
interface UsePermissionsReturn {
  isAuthenticated: boolean;
  isAdmin: boolean;
  roles: IRole[];
  user: IUser | null;
  // eslint-disable-next-line no-unused-vars
  setUser: (user: IUser) => void;
  logout: () => void;
}

export const usePermissions = (): UsePermissionsReturn => {
  const signOut = useSignOut();
  const [ user, setUser ] = useState<IUser | null>(null);

  const token = getCookie(AUTH_KEY);

  const logout = () => {
    signOut();
    window.location.reload();
  };

  if (token) {
    const { groups } = decode<JwtContent>(token);
    const roles = groups.map((group) => group.toUpperCase()) as IRole[];
    const isAdmin = roles.find((role) => role === ADMIN);

    return {
      isAuthenticated: true,
      isAdmin: Boolean(isAdmin),
      roles,
      user,
      setUser,
      logout,
    };
  }

  return {
    isAuthenticated: false,
    isAdmin: false,
    roles: [],
    user,
    setUser,
    logout,
  };
};