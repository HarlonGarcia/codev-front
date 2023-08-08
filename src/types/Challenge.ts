import { User } from './User';
import { ChallengeStatus } from './enums/ChallengeStatus';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  status: ChallengeStatus;
  technologies: string[];
  author: User;
  createdAt: Date;
  updatedAt: Date;
}