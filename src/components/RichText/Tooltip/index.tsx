import { BubbleMenu, useCurrentEditor } from '@tiptap/react'
import {
    LuBold,
    LuItalic,
    LuSquareCode,
    LuStrikethrough,
} from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';

export const Tooltip = () => {
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
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className="flex gap-1 p-1 bg-purple-700 text-pink-700 border-1 shadow-md rounded-lg">
                <button
                    type={'button'}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={getButtonClasses(editor.isActive('bold'))}
                >
                    <LuBold />
                </button>
                <button
                    type={'button'}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={getButtonClasses(editor.isActive('italic'))}
                >
                    <LuItalic />
                </button>
                <button
                    type={'button'}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={getButtonClasses(editor.isActive('strike'))}
                >
                    <LuStrikethrough />
                </button>
                <button
                    type={'button'}
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={getButtonClasses(editor.isActive('codeBlock'))}
                >
                    <LuSquareCode />
                </button>
            </div>
        </BubbleMenu>
    )
}