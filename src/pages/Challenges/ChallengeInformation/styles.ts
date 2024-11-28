import { styled } from 'styles';
import { WrapperWithPadding } from 'styles/wrapper';

const Container = styled(WrapperWithPadding, {
});

const Header = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',

    '& > h2': {
        color: '$highlight',
        fontSize: '1.25rem',
        textTransform: 'capitalize',

        '@xs': {
            fontSize: '1.5rem',
        },
        '@md': {
            fontSize: '2rem',
        },
    },

    '& > span': {
        display: 'flex',
        gap: '0.4175rem',
        alignItems: 'center',
        color: '$lavender',

        '& strong': {
            color: '$coolgrey',
        },
    },

    '@md': {
        marginBottom: '1.5rem',
    },
});

const Cover = styled('img', {
    width: '100%',
    minHeight: '20rem',
    maxHeight: '40rem',
    objectFit: 'cover',
    borderRadius: '1rem',

    marginBottom: '1rem',

    '@md': {
        minHeight: '25rem',
        marginBottom: '2rem'
    },

    '@xl': {
        minHeight: '30rem',
    },
});

const Details = styled('div', {
    display: 'flex',
    flexDirection: 'column',

    '@md': {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

const Info = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: '2rem',

    '& > div, & > small': {
        marginBottom: '1rem',
        color: '$coolgrey',
        fontSize: '1rem',
        fontWeight: 600,

        '@xs': {
            fontSize: '1.125rem',
        },
    },

    '& > div': {
        display: 'flex',
        gap: '0.375rem',

        ':last-child': {
            color: '$lavender',
            textTransform: 'capitalize',
        },
    },

    '@md': {
        marginBottom: '0rem',

        '& > div, & > small': {
            marginBottom: '1.25rem',
        },
    }
});

const JoinChallengeArea = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse',
    gap: '1rem',

    '> div': {
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',

        '&:hover': {
            opacity: 0.8,
        },
    },

    '@md': {
        flexDirection: 'row',
    }
});

const Technologies = styled('ul', {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    listStyle: 'none',

    '& > li': {
        letterSpacing: '0.125rem',
        padding: '0.5rem 0.75rem',

        backgroundColor: '$secondary',
        fontSize: '0.75rem',
        fontFamily: '$code',
        textTransform: 'uppercase',
        borderRadius: '0.5rem',
    },

    '@sm': {
        gap: '0.75rem',

        '& > li': {
            fontSize: '0.825rem',
            fontWeight: 600,
        },
    },
});

const Button = styled('button', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    gap: '0.5rem',
    padding: '1rem',

    color: '$highlight',
    backgroundColor: '$secondary',
    fontSize: '1rem',
    fontWeight: 600,
    borderRadius: '0.5rem',
    transition: 'all 0.3s ease-in-out',

    '&:hover': {
        color: '$secondary',
        backgroundColor: '$highlight',
    },

    '&:disabled': {
        filter: 'grayscale(0.3)',
        cursor: 'not-allowed',
    },

    '& > svg': {
        display: 'none',
        width: '1.375rem',
        height: '1.375rem',
    },

    variants: {
        isParticipant: {
            true: {
                color: '$error',
                backgroundColor: '$secondary',

                '&:hover': {
                    color: '$primary',
                    backgroundColor: '$error',
                },
            }
        }
    },
    
    '@xs': {
        '& > svg': {
            display: 'block',
        },
    },
    '@md': {
        height: 'fit-content',
        padding: '1rem 1.5rem',
        fontSize: '1.175rem',
    },
});

export {
  Container,
  Header,
  Cover,
  Details,
  Button,
  Info,
  JoinChallengeArea,
  Technologies,
};