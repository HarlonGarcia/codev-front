import { styled } from 'styles';
import { WrapperWithPadding } from 'styles/wrapper';

const Container = styled(WrapperWithPadding, {
    maxWidth: '80rem',
    margin: '0 auto',

    '> button': {
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',

        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        backgroundColor: '$secondary',
        marginBottom: '2rem',

        '> *': {
            transition: 'all 0.3s ease-in-out',
        },

        '&:hover': {
            color: '$highlight',

            '> svg': {
                transform: 'translateX(-10%)',
            },
        },
    },
});

export { Container }