import { IUser } from 'types';

interface ISolution {
    id: string;
    author: IUser;
    challengeId: string;
    repositoryUrl: string;
    deployUrl: string;
    liked: boolean;
    likes: number;
}