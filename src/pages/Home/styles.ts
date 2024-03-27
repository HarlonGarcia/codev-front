import { styled } from '../../styles';
import { floating, floating2 } from '../../styles/global';
import { WrapperWithPadding } from '../../styles/wrapper';

import { motion } from 'framer-motion';

const Container = styled(WrapperWithPadding, {
});

const Section = styled(motion.section, {
  display: 'flex',
  flexDirection: 'column',

  padding: '2rem',

  '& .latest_challenges': {
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
  },

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

    '& .latest_challenges > .expand_challenges': {
      padding: '200px 0',
    },
  }
});

const Hero = styled(Section, {
  padding: '3rem',
  
  position: 'relative',
  height: 'fit-content',
  width: '100%',

  '&::before': {
    content: '" "',
    backgroundImage: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 1) 80%), url(/images/programming.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '200%',
    zIndex: -1,
  },
});

const Title = styled('h1', {
  marginBottom: '1.5rem',

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
    marginBottom: '1.5rem',
  },
  
  '@lg': {
    fontSize: '2rem',
    marginBottom: '1.75rem',
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
  Hero, 
  Title, 
  Instruction, 
  Paragraph, 
  Possibilities, 
  CardItem,
  Technologies,
  Tech,
  LatestChallenges
};