import { t } from 'i18next';
import { z } from 'zod';

export const createChallengeSchema = z.object({
  title: z
    .string()
    .min(1, t('pages.create_challenge.fields.title.error')),
  description: z
    .string()
    .min(1, t('pages.create_challenge.fields.description.error')),
  categoryId: z
    .string()
    .min(1, t('pages.create_challenge.fields.category.error')),
  status: z.string(),
});

export type CreateChallengeSchema = z.infer<typeof createChallengeSchema>;