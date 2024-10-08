import { styled } from 'styles';

const Container = styled('div', {
  position: 'fixed',
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
	color: '$lavender',
	background: 'rgba(10, 10, 10, 0.4)',
	backdropFilter: 'blur(1px)'
});

export {
  Container,
};