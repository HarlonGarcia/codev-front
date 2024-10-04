import { styled } from 'styles';

const Content = styled('a', {
  '&:hover': {
    color: '$highlight',
  },

  variants: {
    spacing: {
      true: {
        letterSpacing: '1px',
      }
    },
  }
});

export {
  Content,
};