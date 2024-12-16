import { motion } from 'framer-motion';

import { styled } from 'styles';

const Hero = styled(motion.section, {
    padding: '3rem',

    position: 'relative',
    height: 'fit-content',
    width: '100%',

    '&::before': {
        content: '" "',
        backgroundImage: 'radial-gradient(ellipse at center, #13121BAA 0%, #02010A 80%), url(/images/programming.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '200%',
        zIndex: -1,
        mixBlendMode: 'exclusion',
    },
});

const Instruction = styled('p', {
    fontSize: '1rem',
    fontWeight: 600,
    textAlign: 'center',
    lineHeight: '120%',

    '& > span': {
        padding: '0.25rem 0.5rem',
        margin: '0 0.25rem',

        background: '$secondary',
        boxShadow: '0px 0px 2px $highlight',
        borderRadius: '0.25rem',
    },
    '& > span > *': {
        fontWeight: 900,
        background: 'conic-gradient(at left bottom, rgb(139, 92, 246), rgb(249, 168, 212), rgb(191, 219, 254))',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
    },

    '@xs': {
        fontSize: '1.25rem',

        '& > span > *': {
            fontSize: '1rem',
        },
    },

    '@sm': {
        fontSize: '1.5rem',

        '& > span > *': {
            fontSize: '1.25rem',
        },
    }
});

export {
    Hero,
    Instruction,
}