import TypeIt from 'typeit-react';
import { gsap } from 'utils/gsap';
import { LuCloudOff  } from "react-icons/lu";


const ANIMATION_SPEED = 100;

export default function Typer() {
    const animateText = (instance: Node | any) => {
        instance
            .type('Let\'s go, dev')
            .pause(ANIMATION_SPEED * 7.5).move(-3)
            .pause(ANIMATION_SPEED * 2).delete(4)
            .pause(ANIMATION_SPEED).type('co')
            .pause(ANIMATION_SPEED).move(3).type('!')
            .pause(ANIMATION_SPEED * 10).delete(12)
            .pause(ANIMATION_SPEED).type("<code>git push</code>")
            .pause(ANIMATION_SPEED * 3);

        return instance;
    };

    const afterComplete = () => {
        gsap.to('#error', {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power4.out',
        });
    };

    return (
        <div className='mb-6 font-bold text-center text-purple-300 font-fira text-3xl md:text-4xl md:mb-8'>
            <div className='flex justify-center gap-2 text-4xl pr-4 mb-2 md:4'>
                {'=>'}
                <TypeIt
                    getBeforeInit={animateText}
                    options={{afterComplete}}
                />
            </div>
            <small
                id='error'
                className='flex justify-center items-center gap-3 translate-y-10 opacity-0 font-code text-red-500'
            >
                <LuCloudOff size={20} />
                <small className='text-xl'>error: failed to push</small>
            </small>
        </div>
    );
}
