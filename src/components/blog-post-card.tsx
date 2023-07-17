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
    <li className="w-full max-w-[300px]" {...props}>
      <Link to={slug} className="block mb-3">
        <img src={img} className="w-full aspect-[3/2] rounded-lg" />
      </Link>
      <p className="text-slate-500 mb-4">{upperCaption}</p>
      <Link to={slug} className="text-2xl font-bold line-clamp-2 mb-2">
        {title}
      </Link>
      <div>{lowerCaption}</div>
    </li>
  );
}
