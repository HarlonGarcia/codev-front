import { twJoin } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

interface AvatarProps {
    url?: string;
    name?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    border?: boolean;
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
  
export const Avatar = ({
    name,
    url,
    size,
    border = false,
    onClick = () => {},
}: AvatarProps) => {
    const getPlaceholder = (text?: string): string => {
        const initials = text?.split(' ')
            .map((word) => word.charAt(0).toUpperCase())
            .join('');
 
        return initials?.slice(0, 2) || '';
    };

    const placeholder = getPlaceholder(name);

    const classNames = twJoin(avatar({ size }),
        border && 'border-green-800',
    );

    return (
        <div title={name} className={classNames}>
            <button type='button' onClick={onClick}>
                {url
                    ? (
                        <img src={url} alt={name} />
                    )
                    : placeholder}
            </button>
        </div>
    )
}