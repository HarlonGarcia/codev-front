import { ICategory } from './Category';
import { IChallengeStatus } from './enums/ChallengeStatus';
import { ITechnology } from './Technology';
import { IUser } from './User';

export interface IChallenge {
  id: string;
  title: string;
  description: string;
  status: IChallengeStatus;
  category: ICategory | undefined;
  technologies: ITechnology[];
  author: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export type IChallengeDto = Pick<
  IChallenge,
  'title' | 'description' | 'category' | 'status'
>

export type ICreateChallengeDto =
  Pick<IChallenge, 'title' | 'status' | 'description'> & {
  imageUrl: string;
  authorId: string;
  categoryId: string;
  technologies: string[];
}