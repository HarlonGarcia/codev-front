import { styled } from 'styles';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '10rem',
  gap: '1rem',

  '> label': {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '$highlight',
  },
  
  variants: {
    colorSchema: {
      green: {
        '> label': {
          color: '$highlight',
        },
      },
      lavender: {
        '> label': {
          color: '$lavender',
        },
      },
      coolgrey: {
        '> label': {
          color: '$coolgrey',
        },
      },
    }
  }
});

const InputWrapper = styled('div', {
  position: 'relative',
  
  variants: {
    colorSchema: {
      green: {
        '& > img': {
          outlineColor: '$highlight',
        },
      },
      lavender: {
        '& > img': {
          outlineColor: '$lavender',
        },
      },
      coolgrey: {
        '& > img': {
          outlineColor: '$coolgrey',
        },
      },
    },
    hasPreview: {
      true: {
        '& > img': {
          outlineColor: '$error',
        },
      },
    }
  },

  '> input': {
    display: 'none'
  },

  '> img': {
    width: '10rem',
    height: '10rem',
    outline: '3px solid $primary',
    border: '6px solid transparent',
    borderRadius: '50%',
    cursor: 'pointer',
    objectFit: 'cover',
  },
});

const RemoveButton = styled('button', {
  position: 'absolute',
  top: '0.375rem',
  right: '0.375rem',
  padding: '0.25rem',

  fontWeight: '900',
  fontSize: '1.125rem',

  color: '$primary',
  backgroundColor: '$error',
  border: '5px solid $primary',
  borderRadius: '50%',

  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
});

const UploadButton = styled('button', {
  fontSize: '0.875rem',
  fontWeight: '600',
  padding: '0.5rem 1rem',
  borderRadius: '0.25rem',
  backgroundColor: '$highlight',
  color: '$primary',
});

export {
  Container,
  InputWrapper,
  RemoveButton,
  UploadButton,
};