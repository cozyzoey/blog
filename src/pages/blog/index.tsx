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
        <ul className='flex flex-col gap-y-12'>
          {posts.map(({ node }) => {
            return (
              <BlogPostCard
                img={node.frontmatter?.featuredimage ?? ''}
                slug={node.fields?.slug ?? '/blog'}
                title={node.frontmatter?.title ?? ''}
                desc={node.frontmatter?.description ?? ''}
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
            description
            templateKey
            date(formatString: "MMM DD, YYYY")
            featuredimage
            tags
          }
        }
      }
    }
  }
`
