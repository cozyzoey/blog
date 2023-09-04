import type { GatsbyNode } from 'gatsby'
import { createFilePath } from 'gatsby-source-filesystem'
import { GraphQLError } from 'graphql'
import path from 'path'

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions

  const result = await graphql<Queries.PostQuery>(`
    query Post {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `)

  if (result.errors || !result.data) {
    result.errors.forEach((e: GraphQLError) => console.error(e.toString()))
    return Promise.reject(result.errors || 'No data found')
  }

  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((edge) => {
    const id = edge.node.id
    createPage({
      path: edge.node.fields?.slug || '',
      component: path.resolve(
        `src/templates/${String(
          edge.node.frontmatter?.templateKey ?? 'blog-post'
        )}.tsx`
      ),
      context: {
        tags: edge.node.frontmatter?.tags,
        id,
      },
    })
  })
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

export const onCreateBabelConfig: GatsbyNode['onCreateBabelConfig'] = ({
  actions,
}) => {
  actions.setBabelPreset({
    name: 'babel-preset-gatsby',
    options: {
      reactRuntime: 'automatic',
    },
  })
}
