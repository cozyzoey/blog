import BlogPostCard from 'components/blog-post-card'
import Layout from 'components/layout'
import { graphql, PageProps } from 'gatsby'
import genPageTitle from 'utils/genPageTitle'

export default function ({
  data: {
    allMarkdownRemark: { edges: posts },
  },
}: PageProps<Queries.BlogRollQuery>) {
  return (
    <Layout>
      <div className='center-content'>
        <h1 className='text-4xl text-center font-bold mb-14'>Blog</h1>
        <ul className='grid justify-center grid-col-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 place-items-center'>
          {posts.map(({ node }) => {
            return (
              <BlogPostCard
                img={node.frontmatter?.featuredimage ?? ''}
                slug={node.fields?.slug ?? '/blog'}
                title={node.frontmatter?.title ?? ''}
                date={node.frontmatter?.date ?? ''}
                tags={node.frontmatter?.tags ?? ['']}
                key={node.id}
              />
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

export function Head() {
  return <title>{genPageTitle('Blog')}</title>
}

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
            featuredimage
            tags
          }
        }
      }
    }
  }
`
