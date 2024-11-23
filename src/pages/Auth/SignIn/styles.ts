import { motion } from 'framer-motion';

import { styled } from 'styles';
import { WrapperDefault } from 'styles/wrapper';

const Container = styled(WrapperDefault, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  backgroundImage: 'radial-gradient(at 100% 58%, hsla(240,100%,21%,0.29) 0px, transparent 50%), radial-gradient(at 6% 100%, hsla(283,100%,17%,0.43) 0px transparent 50%)',
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
    display: 'flex',
    flexDirection: 'column',
    gap: '1.75rem',

    width: '20rem',

    '& > a': {
        fontSize: '1rem',
        fontWeight: '600',
        color: '$text',
        textDecoration: 'underline',
        textDecorationColor: 'rgba(255, 220, 255, 0.5)',

        '&:hover': {
        cursor: 'pointer',
        color: '$title',
        textDecorationColor: 'rgba(165, 100, 255, 0.5)',
        },
    },

    '@sm': {
        minWidth: '28rem',
    }
});

const SubmitButton = styled(motion.button, {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',

    width: '50%',
    padding: '0.75rem',
    margin: '0 auto',
    marginTop: '0.75rem',

    color: '$primary',
    backgroundColor: '$highlight',
    borderRadius: '0.25rem',

    fontSize: '0.825rem',
    fontWeight: '800',

    transition: 'all 0.3s ease-in-out',

    '&:hover:not(:disabled)': {
        backgroundColor: 'rgba(50, 255, 130, 1)',
        boxShadow: '0px 0px 24px 2px rgba(50, 255, 120, 0.3)',

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

    '& > svg': {
        height: '0.8rem',
        width: '0.8rem',
        transition: 'all 0.3s ease-in-out',
    },

    '@xs': {
        '& > button': {
        width: '75%',
        marginTop: '1rem',
        fontSize: '1rem',
        },
    }
});

export {
  Container,
  Header,
  Form,
  SubmitButton,
};