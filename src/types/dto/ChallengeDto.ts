import { Technology } from '../Technology';

export interface ChallengeDt0 {
  title: string;
  description: string;
  categoryId: string | undefined;
  authorId: string;
  status: string | undefined;
  technologies: Technology[];
}