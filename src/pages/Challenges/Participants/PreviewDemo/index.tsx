import { UserLink } from 'components/shared/UserLink'

interface PreviewDemoProps {
    url: string;
    preview: string;
}

export const PreviewDemo = ({ url, preview }: PreviewDemoProps) => {
    return (
        <div className='relative group'>
            <div className='opacity-0 absolute top-8 left-0 max-w-96 p-2 rounded-sm bg-purple-600 transition-all duration-300 ease-in-out pointer-events-none group-hover:opacity-100'>
                <img
                    src={preview}
                    alt='Preview'
                    className='w-full bg-cover'
                />
            </div>
            <UserLink
                href={url}
                spacing
                prettify
            />
        </div>
    )
}