import { ReactNode } from "react";

export interface ContentRendererProps {
  content: ReactNode;
}

const cn = "markdown";

export default function ({ content }: ContentRendererProps) {
  return <div className={cn}>{content}</div>;
}

export const HTMLContentRenderer = ({ content }: ContentRendererProps) => (
  <div className={cn} dangerouslySetInnerHTML={{ __html: content as string }} />
);
