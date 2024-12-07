import { useCurrentEditor } from '@tiptap/react'
import { BiParagraph } from 'react-icons/bi';
import {
    LuBold,
    LuCode,
    LuHeading1,
    LuHeading2,
    LuHeading3,
    LuHeading4,
    LuHeading5,
    LuHeading6,
    LuItalic,
    LuList,
    LuListOrdered,
    LuMoveHorizontal,
    LuQuote,
    LuRedo,
    LuSquareCode,
    LuStrikethrough,
    LuUndo,
} from 'react-icons/lu';
import { twMerge } from 'tailwind-merge'

const ICON_SIZE = 22;

export const Toolbar = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    const getButtonClasses = (isActive?: boolean) => {
        return twMerge('px-1.5 py-1 bg-purple-700/40 text-pink-900/80 rounded shadow-md transition-all duration-300 ease-in-out hover:bg-purple-700/80 disabled:bg-purple-600/20 disabled:text-pink-900/30',
            isActive ? 'text-pink-700 bg-purple-600' : '',
        );
    };

    const getActions = () => editor.chain().focus();

    return (
        <div className="p-4">
            <div className="flex flex-wrap gap-2">
                <button
                    type={'button'}
                    onClick={() => getActions().toggleBold().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    className={getButtonClasses(editor.isActive('bold'))}
                >
                    <LuBold size={ICON_SIZE} />
                </button>
                <button
                    type={'button'}
                    onClick={() => getActions().toggleItalic().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                    className={getButtonClasses(editor.isActive('italic'))}
                >
                    <LuItalic size={ICON_SIZE} />
                </button>
                <button
                    type={'button'}
                    onClick={() => getActions().toggleStrike().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleStrike()
                            .run()
                    }
                    className={getButtonClasses(editor.isActive('strike'))}
                >
                    <LuStrikethrough size={ICON_SIZE} />
                </button>
                <button
                    type={'button'}
                    onClick={() => getActions().toggleCode().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleCode()
                            .run()
                    }
                    className={getButtonClasses(editor.isActive('code'))}
                >
                    <LuCode size={ICON_SIZE} />
                </button>
                <button
                    type={'button'}
                    onClick={() => getActions().setParagraph().run()}
                    className={getButtonClasses(editor.isActive('paragraph'))}
                >
                    <BiParagraph size={ICON_SIZE} />
                </button>
                <button
                    type={'button'}
                    onClick={() => getActions().toggleHeading({ level: 1 }).run()}
                    className={getButtonClasses(editor.isActive('heading', { level: 1 }))}
                >
                    <LuHeading1 size={ICON_SIZE} />
                </button>
                <button
                    type={'button'}
                    onClick={() => getActions().toggleHeading({ level: 2 }).run()}
                    className={getButtonClasses(editor.isActive('heading', { level: 2 }))}
                >
                    <LuHeading2 size={ICON_SIZE} />
                </button>
                <button
                    type={'button'}
                    onClick={() => getActions().toggleHeading({ level: 3 }).run()}
                    className={getButtonClasses(editor.isActive('heading', { level: 3 }))}
                >
                    <LuHeading3 size={ICON_SIZE} />
                </button>
                <button
                    type={'button'}
                    onClick={() => getActions().toggleHeading({ level: 4 }).run()}
                    className={getButtonClasses(editor.isActive('heading', { level: 4 }))}
                >
                    <LuHeading4 size={ICON_SIZE} />
                </button>
                <button
                    type={'button'}
                    onClick={() => getActions().toggleHeading({ level: 5 }).run()}
                    className={getButtonClasses(editor.isActive('heading', { level: 5 }))}
                >
                    <LuHeading5 size={ICON_SIZE} />
                </button>
                <button
                    type={'button'}
                    onClick={() => getActions().toggleHeading({ level: 6 }).run()}
                    className={getButtonClasses(editor.isActive('heading', { level: 6 }))}
                >
                    <LuHeading6 size={ICON_SIZE} />
                </button>
                <button
                    type={'button'}
                    onClick={() => getActions().toggleBulletList().run()}
                    className={getButtonClasses(editor.isActive('bulletList'))}
                >
                    <LuList size={ICON_SIZE} />
                </button>
                <button
                    type={'button'}
                    onClick={() => getActions().toggleOrderedList().run()}
                    className={getButtonClasses(editor.isActive('orderedList'))}
                >
                    <LuListOrdered size={ICON_SIZE} />
                </button>
                <button
                    type={'button'}
                    onClick={() => getActions().toggleCodeBlock().run()}
                    className={getButtonClasses(editor.isActive('codeBlock'))}
                >
                    <LuSquareCode size={ICON_SIZE} />
                </button>
                <button
                    type={'button'}
                    onClick={() => getActions().toggleBlockquote().run()}
                    className={getButtonClasses(editor.isActive('blockquote'))}
                >
                    <LuQuote size={ICON_SIZE} />
                </button>
                <button
                    type={'button'}
                    onClick={() => getActions().setHorizontalRule().run()}
                    className={getButtonClasses()}
                >
                    <LuMoveHorizontal size={ICON_SIZE} />
                </button>
                <button
                    type={'button'}
                    onClick={() => getActions().undo().run()}
                    className={getButtonClasses()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .undo()
                            .run()
                    }
                >
                    <LuUndo size={ICON_SIZE} />
                </button>
                <button
                    type={'button'}
                    onClick={() => getActions().redo().run()}
                    className={getButtonClasses()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .redo()
                            .run()
                    }
                >
                    <LuRedo size={ICON_SIZE} />
                </button>
            </div>
        </div>
    )
}