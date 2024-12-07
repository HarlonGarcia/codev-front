import CharacterCount from '@tiptap/extension-character-count';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import { EditorProvider, ReactNodeViewRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { common, createLowlight } from 'lowlight';
import { twMerge } from 'tailwind-merge';

import CodeBlockComponent  from './CodeBlock';
import { Menu } from './Menu';
import { Toolbar } from './Toolbar';
import { Tooltip } from './Tooltip';

import './styles.scss';

interface RichTextProps {
    content?: string;
    error?: string;
    placeholder?: string;
    outline?: boolean;
    readonly?: boolean;
    onChange?: (content: string) => void;
}

const editorProps = {
    attributes: {
        class: 'text-pink-100 prose prose-sm m-5 outline-none focus:outline-none sm:prose-base lg:prose-lg xl:prose-2xl',
    },
};

const lowlight = createLowlight(common);

lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

const defaultExtensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle,
    CharacterCount.configure({
        limit: 10000,
    }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
        blockquote: {
            HTMLAttributes: {
                class: 'pl-4 my-6 border-l-2 border-pink-900/40',
            },
        },
        horizontalRule: {
            HTMLAttributes: {
                class: 'mt-3 mb-6 border-t border-pink-900/30',
            },
        },
    }),
]

export const RichText = ({
    readonly = false,
    content,
    placeholder = '',
    error,
    onChange,
}: RichTextProps) => {
    const extensions = [
        ...defaultExtensions,
        Placeholder.configure({
            placeholder,
            showOnlyWhenEditable: true,
        }),
        CodeBlockLowlight
            .extend({
                addNodeView() {
                    return ReactNodeViewRenderer(CodeBlockComponent)
                },
            })
            .configure({ lowlight }),
    ];

    const classes = twMerge('bg-purple-800 border-2 border-[transparent] rounded-lg',
        error ? 'border-red-500' : '',
        !readonly ? 'min-h-64' : '',
    );

    return (
        <div>
            <div id='editor' className={classes}>
                <EditorProvider
                    aria-expanded={'false'}
                    extensions={extensions}
                    editorProps={editorProps}
                    slotBefore={!readonly && <Toolbar />}
                    editable={!readonly}
                    content={content}
                    onUpdate={(content) => onChange?.(content.editor.getHTML())}
                >
                    <Tooltip />
                    <Menu />
                </EditorProvider>
            </div>

            {error && (
                <p className='mt-2 text-sm text-red-500'>{error}</p>
            )}
        </div>
    )
}