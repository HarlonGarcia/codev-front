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
    
    '> input': {
        display: 'none'
    },

    '> img': {
        width: '10rem',
        height: '10rem',
        border: '1px solid $secondary',
        borderRadius: '50%',
        cursor: 'pointer',
    },
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
  UploadButton,
};