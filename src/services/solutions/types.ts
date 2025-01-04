export type ICreateSolutionDto = {
    userId?: string;
    repositoryUrl: string;
    deployUrl: string;
    challengeId?: string;
    image?: File;
};