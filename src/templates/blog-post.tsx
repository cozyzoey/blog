import Layout from "../components/layout";
import BlogPostTemplate from "../components/blog-post-template";
import { HTMLContentRenderer } from "../components/content-renderer";
import { graphql, PageProps } from "gatsby";

export default function ({
  data: { markdownRemark: post },
}: PageProps<Queries.BlogPostByIDQuery>) {
  if (!post) return null;
  return (
    <Layout>
      <BlogPostTemplate
        content={post.html ?? ""}
        date={post.frontmatter?.date ?? ""}
        contentComponent={HTMLContentRenderer}
        description={post.frontmatter?.description ?? ""}
        tags={post.frontmatter?.tags ?? ["프론트엔드"]}
        title={post.frontmatter?.title ?? ""}
      />
    </Layout>
  );
}

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
