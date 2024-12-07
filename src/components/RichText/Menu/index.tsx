import { FloatingMenu, useCurrentEditor } from '@tiptap/react'
import {
    LuHeading1,
    LuHeading2,
    LuHeading3,
    LuHeading4,
    LuHeading5,
    LuHeading6,
    LuList,
    LuListOrdered,
} from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';

export const Menu = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    const getButtonClasses = (isActive?: boolean) => {
        return twMerge('bg-[unset] p-1.5 rounded-md transition-all duration-300 ease-in-out hover:bg-purple-800/50',
            isActive ? 'bg-purple-800 hover:bg-purple-900/60' : '',
        );
    };

    return (
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className="flex gap-1 p-1 bg-purple-700 text-pink-700 border-1 shadow-md rounded-lg">
                <button
                    type={'button'}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={getButtonClasses(editor.isActive('heading', { level: 1 }))}
                >
                    <LuHeading1 />
                </button>
                <button
                    type={'button'}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={getButtonClasses(editor.isActive('heading', { level: 2 }))}
                >
                    <LuHeading2 />
                </button>
                <button
                    type={'button'}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={getButtonClasses(editor.isActive('heading', { level: 3 }))}
                >
                    <LuHeading3 />
                </button>
                <button
                    type={'button'}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={getButtonClasses(editor.isActive('heading', { level: 4 }))}
                >
                    <LuHeading4 />
                </button>
                <button
                    type={'button'}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={getButtonClasses(editor.isActive('heading', { level: 5 }))}
                >
                    <LuHeading5 />
                </button>
                <button
                    type={'button'}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    className={getButtonClasses(editor.isActive('heading', { level: 6 }))}
                >
                    <LuHeading6 />
                </button>
                <button
                    type={'button'}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={getButtonClasses(editor.isActive('bulletList'))}
                >
                    <LuList />
                </button>
                <button
                    type={'button'}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={getButtonClasses(editor.isActive('orderedList'))}
                >
                    <LuListOrdered />
                </button>
            </div>
        </FloatingMenu>
    )
}