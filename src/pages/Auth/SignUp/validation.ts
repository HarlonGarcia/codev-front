import { t } from 'i18next';
import { githubUrlRegex } from 'utils';
import { z } from 'zod';

export const signUpSchema = z.object({
    name: z
        .string()
        .min(1, t('pages.signup.fields.name.error')),
    email: z
        .string()
        .email(t('pages.signup.fields.email.error')),
    password: z
        .string()
        .min(8, t('pages.signup.fields.password.error.min'))
        .max(20, t('pages.signup.fields.password.error.max')),
    passwordConfirmation: z
        .string()
        .min(8, t('pages.signup.fields.confirmation_password.error')),
    githubUrl: z
        .string()
        .regex(githubUrlRegex, t('pages.signup.fields.github.error')),
    additionalUrl: z
        .string()
        .optional(),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: t('pages.signup.fields.confirmation_password.error'),
    path: ['passwordConfirmation'],
});

export type SignUpSchema = z.infer<typeof signUpSchema>;