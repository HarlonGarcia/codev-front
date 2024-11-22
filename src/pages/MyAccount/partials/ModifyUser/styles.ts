import { styled } from 'styles';
import { WrapperWithPadding } from 'styles/wrapper';

const Container = styled(WrapperWithPadding, {
    display: 'flex',
    flexDirection: 'column',
});

const Header = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',

    '> h2': {
        fontFamily: '$code',
        fontSize: '1.5rem',
    }
});

const FormWrapper = styled('form', {
    display: 'flex',
    flexDirection: 'column',
    gap: '4rem',
    marginTop: '2rem',

    '.image-input': {
        alignSelf: 'center',
    },
});

export {
    Container,
    Header,
    FormWrapper,
};