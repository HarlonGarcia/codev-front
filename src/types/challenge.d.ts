import { ChallengeStatusEnum } from './enums/challenge';

interface IChallenge {
  id: string;
  title: string;
  description: string;
  status: ChallengeStatusEnum;
  category: ICategory | undefined;
  technologies: ITechnology[];
  author: IUser;
  createdAt: Date;
  updatedAt: Date;
}

type IChallengeDto = Pick<
  IChallenge,
  'title' | 'description' | 'category' | 'status'
>

type ICreateChallengeDto =
  Pick<IChallenge, 'title' | 'status' | 'description'> & {
  imageUrl: string;
  authorId: string;
  categoryId: string;
  technologies: string[];
}