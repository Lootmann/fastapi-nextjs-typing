import React from "react";
import { Problem } from "../../../typings";

type PageProps = {
  params: {
    problemId: string;
  };
};

async function fetchProblem(problemId: string) {
  const res = await fetch(`http://127.0.0.1:8000/problems/${problemId}`);
  const problem: Problem = await res.json();
  return problem;
}

async function TypingGame({ params: { problemId } }: PageProps) {
  const problem = await fetchProblem(problemId);

  return (
    <div className="text-2xl p-4">
      <h2 className="text-xl mb-2">Problems {problem.id}</h2>
      <p>{problem.sentence}</p>
    </div>
  );
}

export default TypingGame;
