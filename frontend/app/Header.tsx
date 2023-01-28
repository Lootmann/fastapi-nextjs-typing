import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="p-5 bg-slate-700">
      <Link
        href="/"
        className="px-2 py-1 bg-white text-blue-700 text-xl hover:font-bold rounded-md"
      >
        Go Back to Home
      </Link>
    </header>
  );
}

export default Header;
