import { graphql, PageProps, HeadProps } from "gatsby";
import Layout from "../../components/Layout";

export default function BlogPage({
  data: {
    allMarkdownRemark: { edges },
  },
}: PageProps<Queries.BlogRollQuery>) {
  console.log(edges);

  return <Layout>블로그 페이지입니다</Layout>;
}

export const Head = ({}: HeadProps) => {
  return <title>블로그 인덱스 페이지</title>;
};

export const query = graphql`
  query BlogRoll {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
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
