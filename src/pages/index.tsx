import type { HeadFC, PageProps } from "gatsby";
import Layout from "components/layout";

export default function IndexPage(props: PageProps) {
  return <Layout>Main</Layout>;
}

export const Head: HeadFC = () => <title>Home Page</title>;
