import { styled } from '../../styles';

const Paragraph = styled('p', {
  lineHeight: '140%',

  '@xs': {
    fontSize: '1.25rem',
  },
});

const Link = styled('a', {
  color: '$highlight',
});

const UnorderedList = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  paddingLeft: '1rem',
  listStyle: 'circle inside',

  '& > li': {
    lineHeight: '140%',
  }
});

const BlockQuote = styled('blockquote', {
  padding: '0.75rem 1rem',
  backgroundColor: '$secondary',
  borderRadius: '0.5rem',
  color: '$alert',
  fontFamily: '$code',

  '@xs': {
    padding: '1rem 1.5rem',
  },

  '@sm': {
    padding: '0.75rem 1.25rem',
  },
});

export { Paragraph, Link, UnorderedList, BlockQuote };