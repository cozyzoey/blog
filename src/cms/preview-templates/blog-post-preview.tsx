import BlogPostTemplate from "../../components/blog-post-template";

export default function BlogPostPreview({
  entry,
  widgetFor,
}: {
  entry: { getIn: Function };
  widgetFor: Function;
}) {
  const data = entry.getIn(["data"]).toJS();
  return (
    <BlogPostTemplate
      content={widgetFor("body")}
      date={new Date(data.date).toLocaleDateString()}
      description={data.description}
      tags={data.tags}
      title={data.title}
    />
  );
}
