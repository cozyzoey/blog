import type { HeadFC, PageProps } from "gatsby";
import Llayout from "components/layout";

export default function IndexPage(props: PageProps) {
  return <Llayout>Main</Llayout>;
}

export const Head: HeadFC = () => <title>Home Page</title>;
