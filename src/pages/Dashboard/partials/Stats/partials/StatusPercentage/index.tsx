import { CircleProgress } from 'components/shared/ProgressCircle';
import { StatusEnumValue } from 'enums/challengeStatus';

interface StatusPercentageProps {
    value: number;
    total: number;
    status: StatusEnumValue;
}

export const StatusPercentage = ({
    status,
    value,
    total,
}: StatusPercentageProps) => {
    const getPercentage = () => {
        return (value * 100) / total;
    };

    return (
        <div className='flex flex-col justify-center items-center bg-purple-800 rounded-3xl p-4 md:p-8'>
            <h3 className='text-lg text-center text-pink-100'>
                {status.label}
            </h3>
            <strong className='mb-2 font-fira text-lg text-pink-700'>
                {`${value}/${total}`}
            </strong>
            <CircleProgress
                size={70}
                percentage={getPercentage()}
                color={status.color}
            />
        </div>
    )
}
