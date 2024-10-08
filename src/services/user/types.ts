import { IUser } from 'types';

export type IUpdateUserDto = {
  identifier: string;
  user?: IUser;
  newUser: Partial<IUser> & {
    image: File;
  };
}