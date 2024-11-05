import { keyframes } from '@stitches/react';

import { globalCss } from '.';

export const floating = keyframes({
    '0%': { transform: 'translateY(-5%)' },
    '50%': { transform: 'translateY(5%)' },
    '100%': { transform: 'translateY(-5%)' },
});

export const floating2 = keyframes({
    '0%': { transform: 'translateY(5%)' },
    '50%': { transform: 'translateY(10%)' },
    '100%': { transform: 'translateY(5%)' },
});

export const globalStyles = globalCss({
    '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        '-webkit-font-smoothing': 'antialiased',

        '&::selection': {
            color: '$secondary',
            backgroundColor: '$title',
        }
    },
    '*::-webkit-scrollbar': {
        width: '0.375rem',
    },
    '*::-webkit-scrollbar-track': {
        background: '$primary',
    },
    '*::-webkit-scrollbar-thumb': {
        backgroundColor: '$secondary',
    },
});