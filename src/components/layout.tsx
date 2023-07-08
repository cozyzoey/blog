import { ReactNode } from "react";
import { HeadProps } from "gatsby";
import Header from "./header";
import Footer from "./footer";

export default function ({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-screen-lg mx-auto flex flex-col gap-y-20">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export const Head = ({}: HeadProps) => {
  return <title>CozyZoey's Blog</title>;
};
