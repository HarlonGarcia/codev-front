import { useMemo } from 'react';
import SlickSlider from "react-slick";

import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { useChallenges } from 'services/challenge';
import { twMerge } from 'tailwind-merge';
import { IChallenge } from 'types';

import { Arrow } from './partials/Arrow';
import { Card } from './partials/Card';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.scss';

interface SliderProps {
    challenges: IChallenge[];
}

interface ChallengeSliderProps {
    category: ICategory;
}

export const Slider = ({ challenges }: SliderProps) => {
    const settings = {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: false,
        speed: 500,
        prevArrow: <Arrow icon={MdArrowBackIos} />,
        nextArrow: <Arrow icon={MdArrowForwardIos} />,
    };

    const classes = twMerge('relative flex gap-2',
        3 <= challenges.length ? '' : 'left-aligned-slider',
    );

    return (
        <div className='slider-container'>
            <SlickSlider {...settings} className={classes}>
                {challenges.map((challenge) => (
                    <Card key={challenge.id} challenge={challenge} />
                ))}
            </SlickSlider>
        </div>
    );
};

export const ChallengeSlider = ({ category }: ChallengeSliderProps) => {
    const {
        data: { items = [] } = {},
    } = useChallenges();
    
    const challenges = useMemo(
        () => items.filter((challenge) => challenge.category?.id === category.id),
        [items, category.id],
    );

    if (0 === challenges.length) {
        return null;
    }
    return (
        <div>
            <h2 className='mb-6 text-2xl font-semibold text-green-800'>
                {category.name}
            </h2>
            <Slider challenges={challenges} />
        </div>
    );
};
