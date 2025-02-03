import { challengeStatuses } from 'enums/challengeStatus';
import { GrStatusGoodSmall } from 'react-icons/gr';
import { MdDelete, MdEdit } from 'react-icons/md';
import { IChallenge } from 'types';

interface ListProps {
    onDelete: (challenge: IChallenge) => void;
    onEdit: (challenge: IChallenge) => void;
    items: IChallenge[];
}

export const List = ({
    items,
    onDelete,
    onEdit,
}: ListProps) => {
    const classes = 'py-1.5 px-2.5 font-semibold rounded-md text-sm bg-purple-900/30';

    return (
        <div className='flex flex-col gap-3'>
            {items.map((challenge) => (
                <div
                    className='flex items-center justify-between gap-4 px-5 py-3.5 bg-purple-800 rounded-lg'
                    key={challenge.id}
                >
                    <strong>{challenge.title}</strong>
                    <div className='flex items-center gap-5'>
                        <div className='items-center hidden gap-2 lg:flex'>
                            <span
                                style={{ color: challengeStatuses[challenge.status].color }}
                                className={`${classes} flex items-center gap-2`}
                            >
                                <GrStatusGoodSmall className='w-2 h-2' />
                                <span>
                                    {challengeStatuses[challenge.status].label}
                                </span>
                            </span>
                            <span className={classes}>
                                {challenge.category?.name}
                            </span>
                            <span className={classes}>
                                {challenge.technologies?.map(({ name }) => name).join(' / ')}
                            </span>
                        </div>
                        <div className='flex items-center gap-0.5'>
                            <button
                                onClick={() => onEdit(challenge)}
                                className='p-1.5 transition-all duration-300 ease-in-out rounded-md hover:text-green-800 hover:bg-purple-900/30'
                            >
                                <MdEdit className='w-5 h-5' />
                            </button>
                            <button
                                onClick={() => onDelete(challenge)}
                                className='p-1.5 transition-all duration-300 ease-in-out rounded-lg hover:text-red-500 hover:bg-purple-900/30'
                            >
                                <MdDelete className='w-5 h-5' />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
