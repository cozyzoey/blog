import Layout from 'components/layout'
import type { HeadFC, PageProps } from 'gatsby'

export default function IndexPage(props: PageProps) {
  console.log(props)
  return <Layout>안녕하세요. 프론트엔드 개발자 김반석입니다.</Layout>
}

export const Head: HeadFC = () => <title>Home Page</title>
