import Link from "next/link";

const Header = () => (
  <nav className="flex items-center justify-between max-w-3xl p-4 mx-auto">
    <Link href="/">
      <a className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
        🎭
      </a>
    </Link>

    <ul className="flex items-center space-x-2 text-sm font-medium text-gray-500">
      <li>
        <Link href="/events">
          <a className="px-3 py-2 rounded-lg">Events</a>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Header;
