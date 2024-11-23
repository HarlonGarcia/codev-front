import { motion } from 'framer-motion';

import { styled } from 'styles';
import { WrapperDefault } from 'styles/wrapper';

const Container = styled(WrapperDefault, {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundImage: 'radial-gradient(at 100% 99%, hsla(240,100%,21%,0.32) 0px, transparent 50%), radial-gradient(at 6% 100%, hsla(254,100%,17%,0.53) 0px, transparent 50%)',
});

const Header = styled(motion.header, {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.625rem',

    fontSize: '0.925rem',
    marginBottom: '2.75rem',

    '& > *': {
        textAlign: 'center',
    },

    '@sm': {
        fontSize: '1.25rem',
    }
});

const Form = styled('form', {
    position: 'relative',

    display: 'grid',
    gridGap: '1.5rem',
    gridTemplateColumns: '1fr',

    margin: '0 auto',

    maxWidth: '40rem',

    '@md': {
        gridGap: '2rem',
        gridTemplateColumns: '1fr 1fr',
    },
});

const SubmitButton = styled(motion.button, {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.375rem',

    bottom: '-4.25rem',
    left: '25%',

    width: '50%',
    padding: '0.75rem',
    marginTop: '0.75rem',

    margin: '0 auto',

    fontSize: '0.825rem',
    fontWeight: '800',

    color: '$primary',
    backgroundColor: '$highlight',
    borderRadius: '0.25rem',

    transition: 'all 0.3s ease-in-out',

    '&:hover': {
        backgroundColor: 'rgba(50, 255, 130, 1)',
        boxShadow: '0px 0px 24px 2px rgba(50, 255, 120, 0.4)',

        '> svg': {
            transform: 'translateX(3px)',
        },
    },

    '&:focus': {
        filter: 'brightness(0.5)',
    },

    '&:disabled': {
        cursor: 'not-allowed',
        filter: 'brightness(0.5)',
    },

    '> svg': {
        transition: 'all 0.3s ease-in-out',
        height: '0.8rem',
        width: '0.8rem',
    },

    '@sm': {
        bottom: '-5rem',
    }
});

export { Container, Header, Form, SubmitButton };