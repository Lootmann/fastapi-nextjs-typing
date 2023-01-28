import Link from "next/link";
import React from "react";
import { Problem } from "../../typings";

async function getProblems() {
  const url = "http://127.0.0.1:8000/problems";
  const res = await fetch(url);
  return res.json();
}

function truncate(sentence: string) {
  return sentence.length > 60 ? sentence.substring(0, 60) + "..." : sentence;
}

async function Typing() {
  const problems: Problem[] = await getProblems();

  return (
    <div className="text-2xl p-4">
      <h2 className="text-xl text-white mb-2">Sentence List</h2>

      <div className="flex flex-col gap-2">
        {problems.map((problem) => (
          <Link
            href={`/typing/${problem.id}`}
            className="text-white hover:bg-cyan-800 rounded-md pl-2"
          >
            {problem.id}. ({problem.sentence.length}){" "}
            {truncate(problem.sentence)}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Typing;
