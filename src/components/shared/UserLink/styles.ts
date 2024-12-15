import { styled } from 'styles';

const Content = styled('a', {
    maxWidth: '20rem',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',

    '&:hover': {
        color: '$highlight',
    },

    variants: {
        spacing: {
            true: {
                letterSpacing: '1px',
            },
        },
    }
});

export {
    Content,
};