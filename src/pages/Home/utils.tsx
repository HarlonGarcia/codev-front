/* eslint-disable react/jsx-key */
import { Translation } from 'react-i18next';

import { Svg } from 'assets/svg';

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