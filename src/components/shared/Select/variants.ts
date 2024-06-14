export const selectVariants = {
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
};