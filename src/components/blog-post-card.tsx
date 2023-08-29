import { HTMLAttributes, ReactNode } from "react";
import { Link } from "gatsby";

export default function ({
  img,
  slug,
  title,
  date,
  tags,
  ...props
}: {
  img: string;
  slug: string;
  title: string;
  date: string;
  tags: ReadonlyArray<string | null>;
} & HTMLAttributes<HTMLLIElement>) {
  return (
    <li className="w-full max-w-[300px]" {...props}>
      <Link to={slug} className="block mb-4">
        <img
          src={img}
          className="w-full aspect-[3/2] rounded-lg object-cover"
        />
      </Link>
      <time className="block text-slate-500 mb-4">{date}</time>
      <Link to={slug} className="text-2xl font-bold line-clamp-2 mb-3">
        <h2>{title}</h2>
      </Link>
      <div className="line-clamp-2 text-slate-500">{tags.join(", ")}</div>
    </li>
  );
}
