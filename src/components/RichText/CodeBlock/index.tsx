 
import { FunctionComponent } from 'react'

import { NodeViewContent, NodeViewWrapper, NodeViewProps } from '@tiptap/react'

import '../styles.scss'

const CodeBlockComponent: FunctionComponent<NodeViewProps> = ({
    node: {
        attrs: {
            language: defaultLanguage,
        },
    },
    updateAttributes,
    extension,
}) => (
    <NodeViewWrapper className='code-block'>
        <div className='languages'>
            <select
                defaultValue={defaultLanguage}
                onChange={(event) => updateAttributes({ language: event.target.value })}
            >
                <option value='null'>
                    auto
                </option>
                <option disabled>
                    —
                </option>
                {extension.options.lowlight.listLanguages()
                    .map((languageLabel: string, index: number) => (
                        <option key={index} value={languageLabel}>
                            {languageLabel}
                        </option>
                    ))}
            </select>
        </div>
        <pre>
            <NodeViewContent as='code' />
        </pre>
    </NodeViewWrapper>
);

export default CodeBlockComponent;
