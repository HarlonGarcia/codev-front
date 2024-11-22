import { ChallengeStatusEnum, IChallenge } from 'types/challenge';

export type IGetChallengeParams = {
  category?: string;
  authorId?: string;
  technology?: string;
  status?: ChallengeStatusEnum;
  order?: 'asc' | 'desc';
  orderBy?: 'popularity' | 'created_at';
  page?: number;
  size?: number;
}

export type ICreateChallengeDto =
  Pick<IChallenge, 'title' | 'status' | 'description'> & {
  image: File;
  authorId: string;
  categoryId: string;
  technologies: string[];
}

export type IJoinChallengeDto = {
  userId?: string;
  challengeId?: string;
};