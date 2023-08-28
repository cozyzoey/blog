import { graphql, PageProps, HeadProps } from "gatsby";
import Layout from "components/layout";
import BlogPostCard from "components/blog-post-card";
import { Link } from "gatsby";

export default function ({
  data: {
    allMarkdownRemark: { edges: posts },
  },
}: PageProps<Queries.BlogRollQuery>) {
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-14">Blog</h1>
      <ul className="grid grid-cols-3 gap-10">
        {posts.map(({ node }) => {
          return (
            <BlogPostCard
              img={node.frontmatter?.featuredimage ?? ""}
              slug={node.fields?.slug ?? "/blog"}
              title={node.frontmatter?.title ?? ""}
              date={node.frontmatter?.date ?? ""}
              tags={node.frontmatter?.tags ?? [""]}
              key={node.id}
            />
          );
        })}
      </ul>
    </Layout>
  );
}

export const Head = ({}: HeadProps) => {
  return <title>블로그 목록 - CozyZoey's Blog</title>;
};

export const query = graphql`
  query BlogRoll {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            featuredpost
            featuredimage
            tags
          }
        }
      }
    }
  }
`;
