import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="p-5 bg-slate-700 flex gap-5">
      <Link
        href="/"
        className="px-2 py-1 bg-white text-blue-700 text-xl hover:font-bold rounded-md"
      >
        Home
      </Link>

      <Link
        href="/typing"
        className="px-2 py-1 bg-white text-blue-700 text-xl hover:font-bold rounded-md"
      >
        Typing
      </Link>
    </header>
  );
}

export default Header;
