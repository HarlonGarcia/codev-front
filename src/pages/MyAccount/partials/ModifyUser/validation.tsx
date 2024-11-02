import { t } from 'i18next';
import { githubUrlRegex } from 'utils';
import { z } from 'zod';

export const modifyUserSchema = z.object({
    name: z
        .string()
        .optional(),
    email: z
        .string()
        .email(t('pages.signup.fields.email.error'))
        .optional(),
    password: z
        .string()
        .min(8, t('pages.signup.fields.password.error.min'))
        .max(20, t('pages.signup.fields.password.error.max'))
        .optional(),
    passwordConfirmation: z
        .string()
        .min(8, t('pages.signup.fields.confirmation_password.error'))
        .optional(),
    githubUrl: z
        .string()
        .regex(githubUrlRegex, t('pages.signup.fields.github.error'))
        .optional(),
    additionalUrl: z
        .string()
        .optional(),
    image: z
        .any(),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: t('pages.signup.fields.confirmation_password.error'),
    path: ['passwordConfirmation'],
});

export type ModifyUserSchema = z.infer<typeof modifyUserSchema>;