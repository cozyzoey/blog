import { ReactNode } from "react";
import { HeadProps } from "gatsby";
import Header from "components/header";
import Footer from "components/footer";

export default function ({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-screen-lg mx-auto flex flex-col gap-y-12">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export const Head = ({}: HeadProps) => {
  return <title>CozyZoey's Blog</title>;
};
