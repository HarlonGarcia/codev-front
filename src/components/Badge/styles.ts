import { styled } from 'styles';
import 'styles/index.scss';

const Container = styled('div', {
    padding: '0.25rem 0.5rem',
    fontFamily: '$code',
    textTransform: 'uppercase',
    letterSpacing: '1px',

    fontSize: '0.75rem',
    fontWeight: '400',
    color: '$highlight',
    backgroundColor: '$secondary',
    borderRadius: '0.25rem',

    variants: {
      border: {
        hidden: {
          borderColor: '1px solid transparent',
        },
        green: {
          border: '1px solid $highlight',
        },
        purple: {
          border: '1px solid $title',
        },
        animated: {
          animation: 'spin 4s linear infinite paused',
          animationPlayState: 'running',

          background: `linear-gradient(
            to bottom, oklch(0.1 0.2 210 / 0.9), oklch(0.1 0.2 240 / 0.9)
          ) padding-box,
          conic-gradient(
            from var(--bg-angle),
            oklch(0.3 0.5 270 / 0.6) 0deg,
            oklch(0.5 0.7 310 / 0.6) 72deg,
            oklch(0.6 0.8 330 / 0.6) 144deg,
            oklch(0.4 0.6 290 / 0.6) 216deg,
            oklch(0.6 0.8 330 / 0.6) 288deg,
            oklch(0.5 0.7 310 / 0.6) 360deg
          ) border-box`,

          border: '1px solid transparent',
        },
      },
    },
});

export {
  Container,
};