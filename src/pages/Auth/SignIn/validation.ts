import { t } from 'i18next';
import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .email(t('pages.signin.form.fields.email.error')),
  password: z
    .string()
    .min(1, t('pages.signin.form.fields.password.error'))
});

export type SignInSchema = z.infer<typeof signInSchema>;