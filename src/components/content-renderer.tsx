import { HtmlHTMLAttributes } from "react";

export interface ContentRendererProps
  extends HtmlHTMLAttributes<HTMLDivElement> {
  content: string;
}

const cn = "text-lg";

export default function ({ content }: ContentRendererProps) {
  return <div className={cn}>{content}</div>;
}

export const HTMLContentRenderer = ({ content }: ContentRendererProps) => (
  <div className={cn} dangerouslySetInnerHTML={{ __html: content }} />
);
