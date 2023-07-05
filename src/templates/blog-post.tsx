import Layout from "../components/Layout";
import { graphql, PageProps } from "gatsby";

export default function BlogPost({
  data: { markdownRemark: post },
}: PageProps<Queries.BlogPostByIDQuery>) {
  if (!post) return null;
  return (
    <Layout>
      <BlogPostTemplate
        content={post.html ?? ""}
        description={post.frontmatter?.description ?? ""}
        tags={post.frontmatter?.tags ?? ["프론트엔드"]}
        title={post.frontmatter?.title ?? ""}
      />
    </Layout>
  );
}

export const BlogPostTemplate = ({
  content,
  description,
  tags,
  title,
}: {
  content: string;
  description: string;
  tags: ReadonlyArray<string | null>;
  title: string;
}) => {
  return (
    <div>
      {content}
      {description}
      {tags}
      {title}
    </div>
  );
};

export const query = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;
