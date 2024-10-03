import { styled } from 'styles';

const Container = styled('div', {
    padding: '0.25rem 0.5rem',
    textTransform: 'uppercase',

    fontSize: '0.75rem',
    fontWeight: '600',
    color: '$coolgrey',
    backgroundColor: '$secondary',
    borderRadius: '0.25rem',

    variants: {
      bordered: {
        true: {
          position: 'relative',
          backgroundClip: 'padding-box',
          border: 'solid -1px transparent',
          borderRadius: '0.25rem',

          '&:before': {
            content: '',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: '-1',
            margin: '-1px',
            borderRadius: '0.25rem',
            background: 'linear-gradient(217deg, #FF00FF77, rgba(255,0,0,0) 70.71%),linear-gradient(127deg, $title, rgba(0,255,0,0) 70.71%), linear-gradient(336deg, $text, rgba(0,0,255,0) 70.71%)',
          }
        },
      },
    },
});

export {
  Container,
};