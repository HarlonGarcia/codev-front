import { Footer } from 'components/Footer';
import { Wrapper } from 'components/shared/Wrapper';

import { Challenges } from './partials/Challenges';
import { Possibilities } from './partials/Possibilities';
import { Technologies } from './partials/Technologies';
import { WelcomeSection } from './partials/Welcome';

export default function Home() {
    return (
        <>
            <Wrapper>
                <WelcomeSection />
                <Possibilities />
                <Technologies />
                <Challenges />
            </Wrapper>
            <Footer />
        </>
    );
}