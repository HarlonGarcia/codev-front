import { ChallengeSlider } from 'components/ChallengeSlider';
import { Wrapper } from 'components/shared/Wrapper';
import { useCategories } from 'services/category';

export default function Challenges() {
    const { data: categories = [] } = useCategories();

    return (
        <Wrapper className='flex flex-col gap-20'>
            {categories.map((category) => (
                <ChallengeSlider key={category.id} category={category} />
            ))}
        </Wrapper>
    );
}