import { useEffect } from 'react'

import { gsap } from 'utils/gsap';

export const Preloader = () => {
    const initialState = {
        y: -50,
        opacity: 0,
    };

    const lettersIn = {
        y: 0,
        opacity: 1,
    };

    const lettersOut = {
        y: 100,
        opacity: 0,
    };
    
    const delay = '=-0.7';

    useEffect(function initializeAnimations() {
        const timeline = gsap.timeline({
            defaults: {
                duration: 1,
                ease: 'power3.inOut',
            }
        });

        timeline
            .fromTo('#one', initialState, lettersIn)
            .fromTo('#two', initialState, lettersIn, delay)
            .fromTo('#three', initialState, lettersIn, delay)
            .fromTo('#four', initialState, {
                y: 0,
                opacity: 1,
                rotate: 180,
            }, delay)
            .fromTo('#five', initialState, lettersIn, delay)
            .to('#one', lettersOut, delay)
            .to('#two', lettersOut, delay)
            .to('#three', lettersOut, delay)
            .to('#four', lettersOut, delay)
            .to('#five', lettersOut, '=-1')
            .to('#preloader', {
                duration: 0.75,
                y: '100%',
            }, '=-0.75')
            .to('#preloader', {
                duration: 0,
                css: {
                    display: 'none',
                }
            })
    });

    return (
        <div id='preloader' className='fixed top-0 left-0 w-screen h-screen z-50 bg-purple-900'>
            <div className='space-x-4 flex justify-center items-center h-full text-8xl font-bold font-fira leading-6 text-pink-700 *:opacity-0'>
                <span id='one'>C</span>
                <span id='two'>0</span>
                <span id='three'>D</span>
                <span id='four'>3</span>
                <span id='five'>{'>'}</span>
            </div>
        </div>
    )
}
