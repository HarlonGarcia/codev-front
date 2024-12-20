import { globalCss } from '.';

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