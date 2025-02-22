import { useTranslation } from 'react-i18next';

import { MdOutlineClose } from 'react-icons/md';

interface SelectedTechnologiesProps {
    items: ITechnology[];
    onClick: (id: string) => void;
}

export const SelectedTechnologies = ({ onClick, items }: SelectedTechnologiesProps) => {
    const { t } = useTranslation();

    if (0 === items.length) {
        return null;
    }

    return (
        <div className='flex flex-col gap-4'>
            <strong className='text-lg text-green-800'>
                {t('pages.create_challenge.fields.selected_technologies.label')}
            </strong>
            <div className='flex flex-wrap gap-2'>
                {items.map(({ id, name, color }) => (
                    <li
                        key={id}
                        className='flex items-center gap-2 px-3 py-2 bg-purple-800 rounded-lg'
                    >
                        <span
                            className='font-fira'
                            style={{ color }}
                        >
                            {name}
                        </span>
                        <button
                            className='text-red-500 hover:text-red-500/80'
                            onClick={() => onClick(id)}
                        >
                            <MdOutlineClose />
                        </button>
                    </li>
                ))}
            </div>
        </div>
    );
};
