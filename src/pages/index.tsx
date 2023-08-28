import type { HeadFC, PageProps } from "gatsby";
import Layout from "components/layout";

export default function IndexPage(props: PageProps) {
  return <Layout>프론트엔드 개발자 김반석입니다.</Layout>;
}

export const Head: HeadFC = () => <title>Home Page</title>;
