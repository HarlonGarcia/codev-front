/* eslint-disable react/jsx-key */
import { Translation } from 'react-i18next';

import { Svg } from 'assets/svg';
import { defaultTransition } from 'utils/animations';
import { gsap } from 'utils/gsap';

export const technologies = [
    <Svg.Angular size={140} />,
    <Svg.Vue size={140} />,
    <Svg.ReactJs size={140} />,
    <Svg.Spring size={140} />,
    <Svg.NodeJs size={140} />,
    <Svg.Python size={140} />,
];

export const possibilities = [{
    id: 'solution',
    label: (
        <Translation>
            {(t) => <span>{t('pages.home.introduction.cards.find_solutions')}</span>}
        </Translation>
    ),
    icon: <Svg.Solution />,
},
{
    id: 'coding',
    label: (
        <Translation>{
            (t) => <span>{t('pages.home.introduction.cards.coding')}</span>}
        </Translation>
    ),
    icon: <Svg.Code />,
},
{
    id: 'network',
    label: (
        <Translation>
            {(t) => <span>{t('pages.home.introduction.cards.network')}</span>}
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

export const runInfiniteSliderAnimation = () => {
    const targetsShown = 4;
    const duration = 1;
    const pause = 0.75;
    const itemSize = 160;
    const unitOfMeasure = "px";

    const targets = gsap.utils.toArray(".codev-home-technologies > div");

    const repeatDelay = (targets.length - targetsShown) * (pause + duration) - duration;

    gsap.set(targets, {
        width: itemSize + unitOfMeasure,
        right: -itemSize + unitOfMeasure,
        scale: 0
    });

    gsap.set(".codev-home-technologies", {
        width: itemSize * targetsShown + unitOfMeasure,
        height: itemSize + unitOfMeasure
    });

    const parentTimeline = gsap.timeline();

    (targets as HTMLElement[]).forEach((element, index) => {
        element.style.zIndex = String(targetsShown - index);
            
        const timeline = gsap.timeline({
            delay: index * (duration + pause),
            defaults: { duration, ease: "power3.inOut" },
            repeat: -1,
            repeatDelay,
        });

        timeline.to(element, {
            scale: 1,
            transformOrigin: "left center",
            xPercent: "100",
        });

        for (let i = 1; i < targetsShown; i++) {
            timeline.to(element, { xPercent: "-=100" }, "+=" + pause);
        }

        timeline.to(
            element,
            { scale: 0, transformOrigin: "right center", xPercent: "-=100" },
            "+=" + pause
        );

        parentTimeline.add(timeline, 0);
    });

    const prep = targetsShown * (duration + pause) - pause;
    parentTimeline.time(prep);
}