import ContentRenderer, { ContentRendererProps } from "./content-renderer";
import dayjs from "dayjs";

export default function ({
  content,
  date,
  contentComponent,
  description,
  tags,
  title,
}: {
  content: string;
  date: string;
  contentComponent?: ({ content }: ContentRendererProps) => JSX.Element;
  description: string;
  tags: ReadonlyArray<string | null>;
  title: string;
}) {
  const ContentComponent = contentComponent || ContentRenderer;
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <div className="text-xl font-light mb-16 text-slate-500">
        <time>{dayjs(date).format("YYYY.MM.DD")}</time>
      </div>
      <ContentComponent content={content} />
      {description}
      {tags}
    </>
  );
}
