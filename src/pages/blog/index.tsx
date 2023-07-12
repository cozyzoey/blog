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
      <ul className="grid grid-cols-3 gap-10">
        {posts.map(({ node }) => {
          return (
            <BlogPostCard
              img=""
              slug={node.fields?.slug ?? "/blog"}
              title={node.frontmatter?.title ?? ""}
              upperCaption={node.frontmatter?.date ?? ""}
              lowerCaption={<Link to={"/"}>tags</Link>}
              key={node.id}
            />
          );
        })}
      </ul>
    </Layout>
  );
}

export const Head = ({}: HeadProps) => {
  return <title>블로그 인덱스 페이지</title>;
};

export const query = graphql`
  query BlogRoll {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            featuredpost
            featuredimage {
              childImageSharp {
                gatsbyImageData(width: 120, quality: 100, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;
