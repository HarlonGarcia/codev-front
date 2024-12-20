/* eslint-disable react/jsx-key */
import { Translation } from 'react-i18next';

import { Svg } from 'assets/svg';
import { defaultTransition } from 'utils/animations';

export const technologies = [
    <Svg.Angular />,
    <Svg.Vue />,
    <Svg.ReactJs />,
    <Svg.Spring />,
    <Svg.Python />,
    <Svg.NodeJs />,
];

export const possibilities = [{
    label: (
        <Translation>
            {(t) => t('pages.home.introduction.cards.find_solutions')}
        </Translation>
    ),
    icon: <Svg.Solution />,
},
{
    label: (
        <Translation>
            {(t) => t('pages.home.introduction.cards.coding')}
        </Translation>
    ),
    icon: <Svg.Code />,
},
{
    label: (
        <Translation>
            {(t) => t('pages.home.introduction.cards.network')}
        </Translation>
    ),
    icon: <Svg.Network />,
}];

export const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2,
        },
    },
};

export const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

export const sectionAnimationProps = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: defaultTransition,
};
