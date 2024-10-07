import { motion } from 'framer-motion';

import { styled } from 'styles';

const Container = styled('div', {
  '& > h2': {
    fontFamily: '$code',
    fontSize: '1.75rem',
    fontWeight: 600,
    marginBottom: '1rem',
  },

  '.carousel': {
    cursor: 'grab',
    overflow: 'hidden',
    padding: '0.25rem',

    '& > .carousel_inner': {
      display: 'flex',
      gap: '2rem',

      '@xl3': {
        gap: '3.25rem',
      }
    }
  },

  '@sm': {
    '& > h2': {
      marginBottom: '2rem',
    },
  }
});

const Challenge = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',

  padding: '2rem',

  width: '24rem',
  minWidth: '24rem',

  background: '$glass',
  border: '1px solid $shadow',
  borderRadius: '0.5rem',

  boxShadow: '0 0px 3px rgba(124, 58, 237, 0.5)',
  transition: 'all 0.3s ease-in-out',

  '&:hover': {
    border: '1px solid $title',

    '& > img': {
      transform: 'scale(0.98)',
    }
  },
});

const ChallengeHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  fontWeight: 600,
  marginBottom: '1.5rem',

  '& > h2': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '1.25rem',
    color: '$text',
  },

  '& > span': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    lineBreak: 'unset',
    whiteSpace: 'nowrap',
  },

  '@sm': {
    gap: '1rem',
  }
});

const Image = styled('img', {
  position: 'relative',
  height: '16rem',

  marginBottom: '1.5rem',

  borderRadius: '0.25rem',
  transition: 'transform 0.3s ease-in-out',

  objectFit: 'cover',
  pointerEvents: 'none',
  userSelect: 'none',
  draggable: 'false',
});

const SeeChallenge = styled('button', {
  width: '100%',

  padding: '0.75rem',
  margin: '0 auto',

  color: '$text',
  background: '$secondary',
  borderRadius: '0.5rem',

  fontSize: '1.125rem',
  fontWeight: 600,

  transition: 'all 0.3s ease-in-out',

  '&:hover': {
    color: '$primary',
    background: '$highlight',
  },

  '&:disabled': {
    color: '$error',
    background: '$secondary',
    cursor: 'not-allowed',
  },
});

export { Container, Challenge, ChallengeHeader, Image, SeeChallenge };