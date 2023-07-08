import BlogPostTemplate from "../../components/blog-post-template";

export default function BlogPostPreview({
  entry,
  widgetFor,
}: {
  entry: { getIn: Function };
  widgetFor: Function;
}) {
  const tags = entry.getIn(["data", "tags"]);
  const date = entry.getIn(["data", "date"]);
  return (
    <BlogPostTemplate
      content={widgetFor("body")}
      date={date && date.toJS()}
      description={entry.getIn(["data", "description"])}
      tags={tags && tags.toJS()}
      title={entry.getIn(["data", "title"])}
    />
  );
}
