import { tv } from 'tailwind-variants';

export const tvUploadArea = tv({
    base: 'flex justify-center items-center w-full text-center leading-10 border border-dashed rounded-lg cursor-pointer transition-all duration-300 ease-in-out',
    variants: {
        color: {
            primary: 'bg-purple-900/20 border-purple-800 hover:bg-purple-900/30',
            secondary: 'bg-purple-800 border-pink-900/40 hover:bg-purple-800/70'
        },
        size: {
            sm: 'h-36',
            md: 'h-48',
            lg: 'h-56',
            xl: 'h-72 text-lg',
        }
    },
    defaultVariants: {
        color: 'primary',
        size: 'lg',
    },
});

export const tvUploadDragOver = tv({
    variants: {
        color: {
            primary: 'border-pink-700 bg-purple-900/30',
            secondary: 'border-pink-900 bg-purple-800/60'
        },
    },
    defaultVariants: {
        color: 'primary',
    },
});

export const tvPreview = tv({
    base: 'group relative w-full border-2 border-dashed border-pink-900/70 rounded-lg overflow-hidden cursor-pointer hover:border-red-500',
    variants: {
        size: {
            sm: 'h-36',
            md: 'h-48',
            lg: 'h-56',
            xl: 'h-72',
        },
    },
    defaultVariants: {
        size: 'lg',
    },
});