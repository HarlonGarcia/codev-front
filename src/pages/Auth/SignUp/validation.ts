import { t } from 'i18next';
import { z } from 'zod';

const githubUrlRegex = new RegExp(/\bgithub.com\b/);

export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, t('pages.signup.form.fields.name.error')),
  email: z
    .string()
    .email(t('pages.signup.form.fields.email.error')),
  password: z
    .string()
    .min(8, t('pages.signup.form.fields.password.error.min'))
    .max(20, t('pages.signup.form.fields.password.error.max')),
  passwordConfirmation: z
    .string()
    .min(8, t('pages.signup.form.fields.confirmationPassword.error')),
  githubUrl: z
    .string()
    .regex(githubUrlRegex, t('pages.signup.form.fields.githubUrl.error')),
  additionalUrl: z
    .string()
    .optional(),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: t('pages.signup.form.fields.confirmationPassword.error'),
  path: ['passwordConfirmation'],
});

export type SignUpSchema = z.infer<typeof signUpSchema>;