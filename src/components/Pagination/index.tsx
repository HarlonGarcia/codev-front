import {
    Pagination as HeadlessPagination,
    PrevButton,
    NextButton,
    PageButton,
    IPaginationProps,
} from 'react-headless-pagination';

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import { IPagination } from 'types';

interface PaginationProps extends Partial<IPagination>, Partial<IPaginationProps> {
    onPageChange: (page: number) => void;
    className?: string;
}

export const Pagination = ({
    page = 1,
    total = 1,
    size = 1,
    className,
    onPageChange,
    ...args
}: PaginationProps) => {
    const totalPages = Math.ceil(total / size);

    return (
        <HeadlessPagination
            {...args}
            currentPage={page}
            totalPages={totalPages}
            setCurrentPage={onPageChange}
            edgePageCount={2}
            middlePagesSiblingCount={1}
            className={twMerge('flex items-center h-10 text-sm select-none w-fit font-fira',
                className
            )}
            truncableText='...'
            truncableClassName='w-10 px-0.5 text-center'
        >
            <PrevButton
                as={<button />}
                className={twMerge('flex items-center mr-2 text-pink-700 transition-all duration-300 ease-in-out',
                    page !== 0 ? 'cursor-pointer hover:text-pink-100' : 'opacity-40'
                )}
            >
                <FiArrowLeft size={20} className='mr-3' />
            </PrevButton>

            <nav className="flex justify-center flex-grow">
                <ul className="flex items-center">
                    <PageButton
                        activeClassName="bg-purple-800 text-pink-100 hover:bg-purple-800/85"
                        inactiveClassName="text-pink-900"
                        className='flex items-center justify-center transition-all duration-300 ease-in-out outline-none cursor-pointer w-9 h-9 focus:font-bold hover:text-pink-700 focus:text-pink-700 rounded-xl xl:text-lg'
                    />
                </ul>
            </nav>

            <NextButton
                className={twMerge('flex items-center mr-2 text-pink-700 transition-all duration-300 ease-in-out',
                    page !== totalPages - 1 ? 'cursor-pointer hover:text-pink-100' : 'opacity-40'
                )}
            >
                <FiArrowRight size={20} className='ml-3' />
            </NextButton>
        </HeadlessPagination>
    );
};
