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