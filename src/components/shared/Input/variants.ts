export const inputVariants = {
  wrapper: {
    size: {
      sm: {
        '& > label': {
          fontSize: '0.825rem',
        },
      },
      md: {
        '& > label': {
          fontSize: '0.925rem',
        },
      },
      lg: {
        '& > label': {
          fontSize: '1rem',
        },
      },
      xl: {
        '& > label': {
          fontSize: '1.25rem',
        },
        '& > span': {
          fontSize: '0.925rem',
        },
      },
    },
    weight: {
      normal: {
        '& > label': {
          fontWeight: 400,
        },
      },
      bold: {
        '& > label': {
          fontWeight: 600,
        },
      },
    },
  },
  icons: {
    hasIconBefore: {
      true: {
        '& > input': {
          paddingLeft: '2.5rem',
        },
      },
    },
    hasIconAfter: {
      true: {
        '& > input': {
          paddingRight: '2.5rem',
        },
      },
    },
  },
};