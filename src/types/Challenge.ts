import { Category } from './Category';
import { ChallengeStatus } from './enums/ChallengeStatus';
import { Technology } from './Technology';
import { User } from './User';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  status: ChallengeStatus;
  category: Category | undefined;
  technologies: Technology[];
  author: User;
  createdAt: Date;
  updatedAt: Date;
}

export type ChallengeDto = Pick<Challenge, 'title' | 'description' | 'category' | 'status'>