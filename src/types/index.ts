export interface IShortcuts {
  [key: string]: {
    icon: JSX.Element;
    title: JSX.Element;
    keys: string[];
    action: () => void;
  };
}

export interface IAuthPayload {
  auth: {
    token: string;
    type: string;
  },
  userState?: {
    name: string;
    email: string;
    githubUrl: string;
    createdAt: Date;
  },
}

export type IRole = 'ADMIN' | 'USER';