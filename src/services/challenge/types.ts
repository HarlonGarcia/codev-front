import { IChallenge } from 'types/challenge';

export type IGetChallengeParams = {
  orderBy?: string;
  page?: number;
  size?: number;
}

export type ICreateChallengeDto =
  Pick<IChallenge, 'title' | 'status' | 'description'> & {
  imageUrl: string;
  authorId: string;
  categoryId: string;
  technologies: string[];
}