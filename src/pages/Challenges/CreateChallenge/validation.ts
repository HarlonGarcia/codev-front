import { t } from 'i18next';
import { NONE } from 'utils/constants';
import { z } from 'zod';

// const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const createChallengeSchema = z.object({
  title: z
    .string()
    .min(1, t('pages.create_challenge.fields.title.error')),
  description: z
    .string()
    .min(1, t('pages.create_challenge.fields.description.error')),
  categoryId: z
    .string()
    .min(1, t('pages.create_challenge.fields.category.error'))
    .refine((value) => value !== NONE, t('pages.create_challenge.fields.category.error')),
  status: z.string(),
  image: z
    .any()
    // .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    // .refine(
    //   (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    //   "Only .jpg, .jpeg, .png and .webp formats are supported."
    // ),
});

export type CreateChallengeSchema = z.infer<typeof createChallengeSchema>;