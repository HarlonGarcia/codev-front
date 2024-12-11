import { twJoin, twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

interface AvatarProps {
    url?: string;
    name?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    border?: boolean;
    className?: string;
    onClick?: () => void;
}

const avatar = tv({
    base: 'flex justify-center items-center w-8 h-8 rounded-full p-1.5 bg-purple-800 text-green-800 text-sm font-fira border',
    variants: {
        size: {
            sm: 'text-sm',
            md: 'w-10 h-10 text-base',
            lg: 'w-24 h-24 text-3xl',
            xl: 'w-32 h-32 text-5xl',
        },
    },
    compoundVariants: [
        {
            size: ['lg', 'xl'],
            class: 'border-2',
        },
    ],
    defaultVariants: {
        size: 'sm',
    },
});

const image = tv({
    base: 'rounded-full object-cover',
    variants: {
        size: {
            sm: 'w-7 h-7',
            md: 'w-9 h-9',
            lg: 'w-20 h-20',
            xl: 'w-28 h-28',
        },
    },
    defaultVariants: {
        size: 'sm',
    },
});
  
export const Avatar = ({
    name,
    url,
    size,
    border = false,
    className = '',
    onClick = () => {},
}: AvatarProps) => {
    const getPlaceholder = (text?: string): string => {
        const initials = text?.split(' ')
            .map((word) => word.charAt(0).toUpperCase())
            .join('');
 
        return initials?.slice(0, 2) || '';
    };

    const placeholder = getPlaceholder(name);

    const defaultClasses = twJoin(avatar({ size }),
        border && 'border-green-800',
    );

    const classes = twMerge(defaultClasses, className);

    return (
        <div title={name} className={classes}>
            <button type='button' onClick={onClick} className='overflow-hidden'>
                {url
                    ? (
                        <img className={image({ size })} src={url} alt={name} />
                    )
                    : placeholder}
            </button>
        </div>
    )
}