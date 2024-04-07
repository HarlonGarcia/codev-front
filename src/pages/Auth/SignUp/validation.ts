export const validate = {
  github: (value: string) => {
    return /\bgithub.com\b/.test(value);
  },
};