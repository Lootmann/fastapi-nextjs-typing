"use client";

import React from "react";
import parse from "html-react-parser";
import { Problem } from "../../../typings";

type PageProps = {
  params: {
    problemId: string;
  };
};

function TypingGame({ params: { problemId } }: PageProps) {
  const [pos, setPos] = React.useState<number>(0);

  const [sentence, setSentence] = React.useState<string>("");
  // for adding bolded, colored sentence
  const [showSentence, setShowSentence] = React.useState<string>("");
  const ref = React.useRef(null);
  ref.current = pos;

  // manage to sentence, EventListener loading order.
  const [isDone, setIsDone] = React.useState<boolean>(false);
  const [isDup, setIsDup] = React.useState(false);

  // for debug
  const [current, setCurrent] = React.useState<string>("");

  // run in once
  React.useEffect(() => {
    console.log("*** init: fetch");
    fetch(`http://127.0.0.1:8000/problems/${problemId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSentence(data.sentence);
        setShowSentence(data.sentence);
        setIsDone(true);
      });
  }, [sentence]);

  // typing behavior
  React.useEffect(() => {
    // adjust fetch order
    if (!isDone) return;
    setIsDup(true);
    console.log("*** ref.current");

    window.addEventListener("keydown", (e: any) => typingEvent(e));

    return () => {
      window.removeEventListener("keydown", (e: any) => typingEvent(e));
    };
  }, [isDone]);

  // defTyping();
  const typingEvent = (e: any) => {
    setCurrent(e.key);
    const p = ref.current;
    console.log(`(k, target, pos) = (${e.key}, ${sentence[pos]}, ${pos})`);

    if (e.key == sentence[p]) {
      console.log("Hit that");
      let updated = "<span classname='text-2xl text-white'>";
      updated += sentence.slice(0, p + 1);
      updated += "</span>";
      updated += sentence.slice(p + 1);
      setShowSentence(updated);

      // not working
      setPos((prev) => prev + 1);
    }
  };

  return (
    <div className="w-2/3 mx-auto mt-4 flex flex-col gap-4 text-white">
      <div className="p-4 border-2 border-slate-600 rounded-md">
        <p className="text-xl flex gap-4">
          <span className="border-2 px-2 rounded-md">current: {current}</span>
          <span className="border-2 px-2 rounded-md">
            Target: {sentence[pos]}
          </span>
          <span className="border-2 px-3 py-1 rounded-md">Position: {pos}</span>
        </p>
      </div>

      <div className="p-4 border-2 border-slate-300 rounded-md">
        <p className="text-2xl text-slate-500">{parse(showSentence)}</p>
      </div>
    </div>
  );
}

export default TypingGame;
