interface IChallenge {
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

enum IChallengeStatus {
  TO_BEGIN = 'TO_BEGIN',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  CANCELED = 'CANCELED',
}