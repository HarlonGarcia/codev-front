import { z } from 'zod';

export const createChallengeSchema = z.object({
  title: z
    .string()
    .min(1, 'Some message'),
  description: z
    .string()
    .min(1, 'Some message'),
  category: z
    .string()
    .min(1, 'Some message'),
  technologies: z
    .array(z.string())
    .min(1, 'Some message'),
});

export type CreateChallengeSchema = z.infer<typeof createChallengeSchema>;