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
      <h2 className="text-xl">Problems</h2>

      <ul>
        {problems.map((problem) => (
          <li key={problem.id} className="text-lg">
            {problem.id}. {problem.sentence.substring(0, 50)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Typing;
