import { Link } from "gatsby";
export default function Header() {
  return (
    <header className="pt-10 pb-4 border-solid border-b border-gray-300">
      <Link to="/" className="text-3xl font-medium block pb-5">
        CozyZoey's blog
      </Link>
      <nav className="text-xl">
        <Link to="/blog">Blog</Link>
      </nav>
    </header>
  );
}
