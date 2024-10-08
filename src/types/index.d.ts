export * from './category';
export * from './challenge';
export * from './technology';

export type RequiredRouterProps = {
  redirectUrl?: string;
  children?: ReactNode;
}

export type CustomQueryOptions<T> = Partial<UseQueryOptions<T>>;

export type IRoleName = 'ADMIN' | 'USER';

export interface IShortcuts {
  [key: string]: {
    icon: JSX.Element;
    title: JSX.Element;
    keys: string[];
    action: () => void;
  };
}

export interface ILabel {
  id: string;
  title: string;
  description: string;
}

export interface IRole {
  id: string;
  name: IRoleName;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  githubUrl: string;
  additionalUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
  labels?: ILabel[];
  roles?: IRole[];
  image?: {
    file: string;
    fileName: string;
  } | null;
}

export interface ILoginPayload {
  email: string;
  password: string;
}