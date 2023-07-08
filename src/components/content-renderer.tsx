export interface ContentRendererProps {
  content: string;
}

export default function ContentRenderer({ content }: ContentRendererProps) {
  return <div>{content}</div>;
}

export const HTMLContentRenderer = ({ content }: ContentRendererProps) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
);
