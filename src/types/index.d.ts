export * from './category';
export * from './challenge';
export * from './technology';

export type RequiredRouterProps = {
  redirectUrl?: string;
  children?: ReactNode;
}

export type CustomQueryOptions<T> = Partial<UseQueryOptions<T>>;

export type IRole = 'ADMIN' | 'USER';

export interface IShortcuts {
  [key: string]: {
    icon: JSX.Element;
    title: JSX.Element;
    keys: string[];
    action: () => void;
  };
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  githubUrl: string;
  additionalUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
  labels: {
    id: string;
    title: string;
    description: string;
  }[];
  image?: {
    file: string;
    fileName: string;
  } | null;
}

export interface ILoginPayload {
  email: string;
  password: string;
}