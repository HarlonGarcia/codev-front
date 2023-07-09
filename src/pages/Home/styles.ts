import { styled } from '../../styles';
import { Wrapper } from '../../styles/wrapper';

const Container = styled(Wrapper, {
  minHeight: '100vh',
  backgroundColor: '$primary',
  background: 'linear-gradient(to top left, rgba(124, 58, 237, 0.1), rgb(2, 1, 10))'
});

const Section = styled('section', {
  padding: '2.5rem',
  paddingBottom: '0',
});

const Title = styled('h1', {
  fontWeight: 600,
  marginBottom: '0.75rem',
  
  variants: {
    font: {
      code: {
        fontFamily: '$code',
      },
    },
  },
});

const Instruction = styled('p', {
  fontWeight: 600,
  lineHeight: '120%',

  '& > span': {
    padding: '0.25rem 0.5rem',
    margin: '0 0.25rem',

    background: '$secondary',
    boxShadow: '0px 0px 2px $highlight',
    borderRadius: '0.25rem',
  },
  '& > span > span': {
    fontFamily: '$code',
    fontSize: '.875rem',
    fontWeight: 900,
    background: 'conic-gradient(at left bottom, rgb(139, 92, 246), rgb(249, 168, 212), rgb(191, 219, 254))',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
  }
});

const Paragraph = styled('p', {
  lineHeight: '130%',
});

export { Container, Section, Title, Instruction, Paragraph };