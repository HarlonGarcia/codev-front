import { Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import imagePlaceholder from 'assets/images/card-image-placeholder-2.png';
import { getChallengeStatus } from 'enums/challengeStatus';
import { GrStatusGoodSmall } from "react-icons/gr";
import { IoArrowForwardSharp } from 'react-icons/io5';
import { IChallenge } from 'types';
import { getBase64Image } from 'utils';


interface CardProps {
    challenge: IChallenge;
}

export const Card = ({ challenge }: CardProps) => {
    const { id, title, image } = challenge;
    const status = getChallengeStatus(challenge.status);

    const navigate = useNavigate();

    return (
        <div className='p-6 bg-purple-800 rounded-2xl'>
            <div className='flex items-center gap-4'>
                <span className='text-pink-700 text-md font-fira'>
                    {title || (
                        <Trans>{'pages.challenges.unknown_title'}</Trans>
                    )}
                </span>
                <span
                    className='flex items-center gap-2 px-2 py-1 text-sm font-semibold rounded-lg bg-purple-900/15'
                    style={{ color: status?.color }}
                >
                    <GrStatusGoodSmall className='w-2 h-2' />
                    {status?.label}
                </span>
            </div>
            <img
                src={getBase64Image(image?.file) || imagePlaceholder} 
                alt={title}
                className='object-cover w-full mt-4 rounded-lg pointer-events-none select-none h-72'
                loading='lazy'
            />
            <div className='relative'>
                <button
                    onClick={() => navigate(`/challenges/${id}`)}
                    className='group flex mt-4 justify-center items-center min-w-[170.52px] min-h-14 bg-none text-pink-700 text-lg before:content-[""] before:block before:w-16 before:h-full before:bg-purple-700 before:absolute before:rounded-full before:left-0 before:z-[1] before:transition-all before:animate-spin-delayed before:duration-500 before:ease-in-out hover:before:delay-150 hover:before:w-full hover:before:animate-none'
                    disabled={challenge.status === 'FINISHED'}
                >
                    <span className='z-[2] px-3 font-semibold'>
                        <Trans>{'pages.challenges.see_challenge'}</Trans>
                    </span>
                    <IoArrowForwardSharp
                        className='w-5 h-5 z-[2] transition-all duration-1000 ease-in-out group-hover:translate-x-4'
                    />
                </button>
                <div className='absolute inset-0 z-0 w-full rounded-full bg-purple-900/15 h-14'></div>
            </div>
        </div>
    )
}