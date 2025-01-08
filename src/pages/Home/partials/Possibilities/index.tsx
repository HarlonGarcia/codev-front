import { Trans } from 'react-i18next';

import { possibilities } from 'pages/Home/utils';
import { twMerge } from 'tailwind-merge';

export const Possibilities = () => {
    return (
        <div className='codev-home-section'>
            <h2 className='mb-6 text-center text-purple-300 xl:mb-8'>
                <Trans>{'pages.home.introduction.title'}</Trans>
            </h2>
            <p className='mb-8 text-lg font-semibold text-center lg:mb-12 lg:text-xl'>
                <Trans>{'pages.home.introduction.description'}</Trans>
            </p>
            <ul className='flex flex-wrap justify-center gap-8'>
                {possibilities.map(({ label, icon }, index) => {
                    const classes = twMerge(
                        'flex flex-col justify-center items-center h-44 w-4/5 gap-2 p-6 bg-purple-800 rounded-xl text-center transition-all duration-200 ease-in-out shadow-3xl shadow-purple-600/50 sm:w-48 xl:w-56',
                        index % 2 !== 0 ? 'md:animate-floatingDeeper' : 'md:animate-floating',
                    );

                    return (
                        <li  
                            key={index}
                            className={classes}
                        >
                            <span className='mb-3 text-pink-100'>
                                {label}
                            </span>
                            {icon}
                        </li>
                    )})}
            </ul>
        </div>
    )
}
