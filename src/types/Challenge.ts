import { Category } from './Category';
import { Technology } from './Technology';
import { User } from './User';
import { ChallengeStatus } from './enums/ChallengeStatus';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  status: ChallengeStatus;
  category: Category;
  technologies: Technology[];
  author: User;
  createdAt: Date;
  updatedAt: Date;
}