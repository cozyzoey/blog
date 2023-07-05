import { ReactNode } from "react";
import { HeadProps } from "gatsby";

export default function Layout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export const Head = ({}: HeadProps) => {
  return <title>CozyZoey's Blog</title>;
};
