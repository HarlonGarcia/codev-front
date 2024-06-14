import { IAuthPayload } from '../../types';

export type ILoginParams = {
  payload: {
    email: string;
    password: string;
  },
  // eslint-disable-next-line no-unused-vars
  saveAuthData: (data: IAuthPayload) => void;
  callback: () => void;
}

export type ISignUpParams = {
  payload: {
    name: string;
    email: string;
    password: string;
    githubUrl: string;
    additionalUrl?: string;
  },
  // eslint-disable-next-line no-unused-vars
  saveAuthData: (data: IAuthPayload) => void;
  callback: () => void;
}