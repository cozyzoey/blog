import { BlogPostTemplate } from "../../templates/blog-post";

export default function BlogPostPreview({
  entry,
  widgetFor,
}: {
  entry: { getIn: Function };
  widgetFor: Function;
}) {
  const tags = entry.getIn(["data", "tags"]);
  return (
    <BlogPostTemplate
      content={widgetFor("body")}
      description={entry.getIn(["data", "description"])}
      tags={tags && tags.toJS()}
      title={entry.getIn(["data", "title"])}
    />
  );
}
