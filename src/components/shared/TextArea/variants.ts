export const textAreaVariants = {
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
        '& > textarea': {
          minHeight: '6rem',
        }
      },
      lg: {
        '& > label': {
          fontSize: '1rem',
        },
        '& > textarea': {
          minHeight: '10rem',
        }
      },
      xl: {
        '& > label': {
          fontSize: '1.25rem',
        },
        '& > textarea': {
          minHeight: '14rem',
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