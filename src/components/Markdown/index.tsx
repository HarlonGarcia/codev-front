import ReactMarkdown from 'react-markdown';

import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

import 'styles/index.scss';
import * as S from './styles';

interface MarkdownProps {
  content: string;
}

export default function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      className='markdown'
      rehypePlugins={[rehypeHighlight]}
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ node, ref, ...props }) => <S.Paragraph {...props} />,
        a: ({ node, ref, ...props }) => <S.Link {...props} />,
        ul: ({ node, ref, ...props }) => <S.UnorderedList {...props} />,
        blockquote: ({ node, ref, ...props }) => <S.BlockQuote {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
