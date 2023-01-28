import Link from "next/link";
import React from "react";
import { Problem } from "../../typings";

async function getProblems() {
  const url = "http://127.0.0.1:8000/problems";
  const res = await fetch(url);
  return res.json();
}

async function Typing() {
  const problems: Problem[] = await getProblems();

  return (
    <div className="text-2xl p-4">
      <h2 className="text-xl mb-2">Problems</h2>

      <ul className="flex flex-col gap-2">
        {problems.map((problem) => (
          <li
            key={problem.id}
            className="text-lg bg-slate-400 hover:bg-slate-200 px-2 py-1 rounded-md"
          >
            <Link href={`/typing/${problem.id}`}>
              {problem.id}. {problem.sentence.substring(0, 50)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Typing;
