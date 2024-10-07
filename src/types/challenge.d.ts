type ChallengeStatusEnum = 'TO_BEGIN' | 'IN_PROGRESS' | 'FINISHED' | 'CANCELED';

export interface IChallenge {
  id: string;
  title: string;
  description: string;
  status: ChallengeStatusEnum;
  category: ICategory | undefined;
  technologies: ITechnology[];
  image: {
    file: string;
  };
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
  authorId: string;
  categoryId: string;
  technologies: string[];
}