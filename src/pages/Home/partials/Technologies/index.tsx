import { useEffect } from 'react';
import { Trans } from 'react-i18next';

import { technologies } from 'pages/Home/utils';
import { gsap } from 'utils/gsap';

export const Technologies = () => {
    useEffect(function animateTechnologies() {
        const targetsShown = 4;

        const duration = 1;
        const pause = 0.75;
        const itemSize = 140;
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

            timeline.fromTo(
                element,
                { scale: 0, transformOrigin: "right center", xPercent: "100" },
                { scale: 1, transformOrigin: "left center", xPercent: "-=100" });

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
    }, []);

    return (
        <div className='codev-home-section'>
            <h2 className='mb-6 text-center text-purple-300 xl:mb-8'>
                <Trans>{'pages.home.technologies.title'}</Trans>
            </h2>
            <p className='mb-8 text-lg font-semibold text-center lg:mb-12 lg:text-xl'>
                <Trans
                    components={{
                        code: <code className='px-1 py-1 text-sm font-semibold text-purple-900 bg-pink-700 rounded' />
                    }}
                >
                    {'pages.home.technologies.description'}
                </Trans>
            </p>
            <div className='relative hidden w-auto h-auto mx-auto codev-home-technologies xl:flex'>
                {technologies.map((icon, index) => (
                    <div
                        className='absolute top-0 grid p-4 bg-purple-900 aspect-square place-items-center left-3/4'
                        key={index}
                    >
                        {icon}
                    </div>
                ))}
            </div>
            <div className='flex flex-wrap justify-center gap-4 xl:hidden'>
                {technologies.map((icon, index) => (
                    <div
                        className='w-16 md:w-20'
                        key={index}
                    >
                        {icon}
                    </div>
                ))}
            </div>
        </div>
    )
}
