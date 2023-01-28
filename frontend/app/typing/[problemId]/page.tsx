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
    <div className="w-2/3 mx-auto mt-4 flex flex-col gap-4 text-white">
      <div className="p-4 border-2 border-slate-600 rounded-md">
        <p className="text-xl">Count :</p>
      </div>

      <div className="p-4 border-2 border-slate-300 rounded-md">
        <p className="text-2xl">{problem.sentence}</p>
      </div>
    </div>
  );
}

export default TypingGame;
