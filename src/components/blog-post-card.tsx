import { HTMLAttributes, ReactNode } from "react";
import { Link } from "gatsby";

export default function ({
  img,
  slug,
  title,
  upperCaption,
  lowerCaption,
  ...props
}: {
  img: string;
  slug: string;
  title: string;
  upperCaption: string;
  lowerCaption: ReactNode;
} & HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      className="rounded-lg p-4 bg-slate-100 hover:drop-shadow-xl hover:-translate-y-1 transition ease-in-out"
      {...props}
    >
      {/* <div>{img}</div> */}
      <p className="mb-2">{upperCaption}</p>
      <Link to={slug} className="text-2xl font-bold line-clamp-2 mb-2">
        {title}
      </Link>
      <div>{lowerCaption}</div>
    </li>
  );
}
