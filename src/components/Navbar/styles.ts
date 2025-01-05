import { styled } from 'styles';

const Navigation = styled('nav', {
    display: 'none',
    alignItems: 'center',

    gap: '1rem',

    '@md': {
        display: 'flex',
    }
});

const NavItems = styled('div', {
    display: 'flex',
    alignItems: 'center',

    gap: '2rem',
    marginRight: '1.5rem',

    '& > a, & > button': {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',

        fontSize: '1rem',
        fontWeight: 600,
        color: '$text',

        transition: 'all 300ms ease-in-out',

        '&:hover': {
            color: '$textDarker',
        },
    },
});

const LanguageToggle = styled('button', {
    backgroundColor: '$text',
    padding: '0.25rem',
    borderRadius: '0.25rem',
    transition: 'all 250ms ease-in-out',

    '> svg': {
        color: '$primary',
    },

    '&:hover': {
        backgroundColor: '$textDarker',
    },
});

export { Navigation, NavItems, LanguageToggle };