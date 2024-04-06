import ReactMarkdown from 'react-markdown';

import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

import '../../styles/alt.scss';
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
        p: ({ node, ...props }) => <S.Paragraph {...props} />,
        a: ({ node, ...props }) => <S.Link {...props} />,
        ul: ({ node, ...props }) => <S.UnorderedList {...props} />,
        blockquote: ({ node, ...props }) => <S.BlockQuote {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
