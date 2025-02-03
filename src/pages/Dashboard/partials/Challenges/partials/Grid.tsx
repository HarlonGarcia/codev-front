import imagePlaceholder from 'assets/images/card-image-placeholder-2.png'
import { challengeStatuses } from 'enums/challengeStatus';
import { GrStatusGoodSmall } from 'react-icons/gr';
import { MdDelete, MdEdit } from 'react-icons/md';
import { IChallenge } from 'types';
import { getBase64Image } from 'utils';

interface GridProps {
    onDelete: (challenge: IChallenge) => void;
    onEdit: (challenge: IChallenge) => void;
    items: IChallenge[];
}

export const Grid = ({
    items,
    onDelete,
    onEdit,
}: GridProps) => {
    return (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {items.map((challenge) => {
                const { id, title, image, status, category, technologies } = challenge;

                return (
                    <div
                        key={id}
                        className='p-4 bg-purple-800 rounded-md group lg:p-5'
                    >
                        <img
                            className='object-cover w-full mb-4 rounded-md h-60 codev-transition-default group-hover:brightness-50'
                            src={image ? getBase64Image(image.file) : imagePlaceholder}
                            alt=''
                        />
                        <div className='flex flex-col'>
                            <div className='flex items-center gap-4 mb-3'>
                                <strong className='overflow-hidden text-green-800 text-ellipsis'>{title}</strong>
                                <div className='flex gap-2'>
                                    <button
                                        className='text-green-800 opacity-0 codev-transition-default group-hover:opacity-100'
                                        onClick={() => onEdit(challenge)}
                                    >
                                        <MdEdit className='w-5 h-5' />
                                    </button>
                                    <button
                                        className='text-red-500 opacity-0 codev-transition-default group-hover:opacity-100'
                                        onClick={() => onDelete(challenge)}
                                    >
                                        <MdDelete className='w-5 h-5' />
                                    </button>
                                </div>
                            </div>
                            <div
                                className='flex flex-wrap gap-2 *:font-fira *:px-2 *:py-1 *:text-sm *:rounded-md *:bg-purple-900/30'
                            >
                                <span
                                    className='flex items-center gap-2'
                                    style={{ color: challengeStatuses[status].color }}
                                >
                                    <GrStatusGoodSmall className='w-2 h-2' />
                                    {challengeStatuses[status].label}
                                </span>
                                <span>{category?.name}</span>
                                <span>{technologies.map(({ name }) => name).join(' / ')}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};
