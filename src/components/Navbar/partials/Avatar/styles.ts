import { styled } from 'styles';

const Container = styled('div', {
    position: 'relative',

    'button+div': {
        display: 'none',
    },
    
    'button:hover + div': {
        display: 'flex',
    },
});

const Avatar = styled('button', {
    '> img': {
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
    },
});

const Popover = styled('div', {
    position: 'absolute',
    top: '2rem',
    right: 0,

    flexDirection: 'column',
    gap: '0.5rem',

    width: '10rem',
    padding: '1rem',

    backgroundColor: '$secondary',
    borderRadius: '0.25rem',

    '> *': {
        width: 'fit-content',
        fontSize: '1rem',
    },

    '> button': {
        marginTop: '1rem',
        color: '$error',
    },

    '&:hover': {
        display: 'flex',
    },
});

export { Container, Avatar, Popover };