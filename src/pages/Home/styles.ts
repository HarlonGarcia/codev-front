import { motion } from 'framer-motion';

import { styled } from 'styles';
import { floating, floating2 } from 'styles/global';
import { WrapperWithPadding } from 'styles/wrapper';

const Container = styled(WrapperWithPadding, {
});

const Section = styled(motion.section, {
    display: 'flex',
    flexDirection: 'column',

    padding: '2rem',

    '& > a': {
        alignSelf: 'center',

        fontSize: '1rem',
        fontWeight: 600,

        color: '$highlight',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',

        '&:hover': {
            filter: 'brightness(0.7)',
        },
    },

    '@sm': {
        padding: '3rem',
    },

    '@lg': {
        padding: '4rem',

        '& > a': {
            fontSize: '1.25rem',
        },
    }
});

const Title = styled('h2', {
    marginBottom: '1.5rem',
    color: '$title',

    fontWeight: 600,
    textAlign: 'center',

    variants: {
        font: {
            code: {
                fontFamily: '$code',
            },
        },
    },

    '@xs': {
        fontSize: '1.75rem',
    },

    '@lg': {
        fontSize: '2rem',
        marginBottom: '1.75rem',
    },
});

const Paragraph = styled('p', {
    textAlign: 'center',
    marginBottom: '2rem',
    lineHeight: '130%',

    '@xs': {
        fontSize: '1.25rem',
        marginBottom: '2.75rem',
    },

    '@lg': {
        width: '80%',

        margin: '0 auto',
        marginBottom: '3.5rem',

        fontSize: '1.5rem',
        lineHeight: '140%',
    }
});

const Possibilities = styled(motion.ul, {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2rem',

    listStyle: 'none',
});

const CardItem = styled(motion.li, {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',

    height: '11rem',
    width: '80%',

    padding: '1.5rem',

    background: '$secondary',
    borderRadius: '0.5rem',
    boxShadow: '0 0 12px rgba(5, 2, 25, 0.5), 0 0 24px rgba(5, 2, 25, 0.5), 0 0 36px rgba(5, 2, 25, 0.5), 0 0 48px rgba(5, 2, 25, 0.4)',

    textAlign: 'center',
    transform: 'translateY(0%)',

    '& > span': {
        fontWeight: 600,
        marginBottom: '0.75rem',
    },

    variants: {
        animation: {
            diff: {
                '@md': {
                    animation: `${floating2} 3s ease-in-out infinite`,
                }
            },
        }
    },

    '@sm': {
        width: '12rem',
    },

    '@md': {
        transition: 'all 0.2s ease-in-out',
        animation: `${floating} 3s ease-in-out infinite`,
    },

    '@xl': {
        width: '16rem',
    },
});

const Technologies = styled(motion.ul, {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',

    margin: '0 auto',

    '@sm': {
        gridTemplateColumns: 'repeat(3, 1fr)',
    },
    '@md': {
        gridTemplateColumns: 'repeat(4, 1fr)',
    },
    '@xl2': {
        width: '60rem',
    },
});

const Tech = styled(motion.li, {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.375rem',

    padding: '1rem',

    background: '$secondary',
    color: '$text',
    borderRadius: '0.375rem',

    '& > span': {
        fontSize: '2rem',
    },
    '& > small': {
        fontSize: '1rem',
    },

    '@md': {
        padding: '2rem',
    },
});

const LatestChallenges = styled('div', {
    position: 'relative',

    '& > .expand_challenges': {
        position: 'absolute',
        bottom: 0,
        left: 0,

        width: '100%',
        textAlign: 'center',
        margin: 0,
        padding: '140px 0',

        backgroundImage: 'linear-gradient(to bottom, transparent, $primary)',
    },

    '@lg': {
        '& .expand_challenges': {
            padding: '200px 0',
        },
    }
});

const ChallengeList = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',

    '& > div': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.25rem',

        width: '90%',

        letterSpacing: '120%',
        background: '$secondary',
        borderRadius: '0.5rem',

        '& > small': {
            fontSize: '1rem',
        },

        '& > span': {
            padding: '0.5rem',

            fontSize: '0.75rem',
            textTransform: 'uppercase',

            color: '$highlight',
            background: 'rgba(0, 255, 0, 0.05)',
            border: '1px solid $highlight',
            borderRadius: '0.75rem',
        }
    },

    '@md': {
        gap: '1.5rem',

        '& > div': {
            maxWidth: '60rem',
            padding: '1.5rem',
            fontSize: '1.25rem',

            '& > small': {
                fontSize: '1.25rem',
            },

            '& > span': {
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                fontWeight: 600,
            }
        }
    },

    '@xl': {
        '& > div': {
            '& > small': {
                fontSize: '1.5rem',
            },
        }
    }
});

export {
    Container,
    Section,
    Title,
    Paragraph,
    Possibilities,
    CardItem,
    Technologies,
    Tech,
    LatestChallenges,
    ChallengeList,
};