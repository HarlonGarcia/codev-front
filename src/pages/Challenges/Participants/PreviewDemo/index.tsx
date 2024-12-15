import { Trans } from 'react-i18next';

interface PreviewDemoProps {
    url: string;
    preview: string;
}

export const PreviewDemo = ({ url, preview }: PreviewDemoProps) => {
    return (
        <div className='relative group hover:text-green-800'>
            <div className='z-[2] opacity-0 absolute top-6 -left-48 w-64 rounded-3xl rounded-tr-sm transition-all duration-300 ease-in-out pointer-events-none overflow-hidden group-hover:opacity-100 md:left-0 md:rounded-tr-3xl md:rounded-tl-sm md:w-96'>
                <img
                    src={preview}
                    alt='Preview'
                    className='w-full bg-cover'
                />
            </div>
            <a
                className='font-fira transition-all duration-300 ease-in-out '
                href={url}
                target={'_blank'}
                rel={'noreferrer'}
            >
                <Trans>{'pages.challenge_users.table.columns.demo'}</Trans>
            </a>
        </div>
    )
}