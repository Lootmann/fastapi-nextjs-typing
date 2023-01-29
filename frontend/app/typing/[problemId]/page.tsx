"use client";

import React from "react";
import parse from "html-react-parser";
import { Ubuntu_Mono } from "@next/font/google";

const font = Ubuntu_Mono({
  weight: "400",
  subsets: ["latin"],
});

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
  const ref = React.useRef(pos);
  ref.current = pos;

  const [info, setInfo] = React.useState<string>("init");

  // manage to sentence, EventListener loading order.
  const [isDone, setIsDone] = React.useState<boolean>(false);

  // for debug
  const [current, setCurrent] = React.useState<string>("");

  // run in once
  React.useEffect(() => {
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

    window.addEventListener("keydown", (e: any) => typingEvent(e));

    return () => {
      window.removeEventListener("keydown", (e: any) => typingEvent(e));
    };
  }, [isDone]);

  // End Game
  React.useEffect(() => {
    if (info != "init" && sentence.length <= pos) {
      setInfo("Clear");
    } else if (pos == 1) {
      setInfo("Typing");
    }
  }, [pos]);

  // defTyping();
  const typingEvent = (e: any) => {
    setCurrent(e.key);
    const p: number = ref.current ?? 0;

    setInfo(`(key, target, pos) = (${e.key}, ${sentence[p]}, ${p})`);

    if (e.key == "Enter" || e.key == "Shift" || e.key == "Control") {
      return;
    }

    if (e.key == sentence[p]) {
      // make text white
      let updated = "<span classname='text-2xl text-white'>";
      updated += sentence.slice(0, p + 1);
      updated += "</span>";

      // underline
      updated +=
        "<span className='text-2xl underline underline-offset-8 decoration-slate-50'>";
      updated += sentence.slice(p + 1, p + 2);
      updated += "</span>";

      updated += sentence.slice(p + 2);
      setShowSentence(updated);

      setPos((prev) => prev + 1);
    } else {
      let wrong = "<span classname='text-2xl text-white'>";
      wrong += sentence.slice(0, p);
      wrong += "</span>";

      // wrong word has fonr: red color.
      wrong +=
        "<span className='text-2xl text-red-400 underline underline-offset-8 decoration-slate-50'>";
      wrong += sentence.slice(p, p + 1);
      wrong += "</span>";

      wrong += sentence.slice(p + 1);
      setShowSentence(wrong);
    }
  };

  return (
    <div className="w-2/3 mx-auto mt-4 flex flex-col gap-4 text-white">
      <div className="p-4 border-2 border-slate-600 rounded-md">
        <p className="text-xl flex gap-4">{info}</p>
      </div>

      <div className="p-4 border-2 border-slate-300 rounded-md">
        <p className={`${font.className} text-2xl text-slate-500 break-words`}>
          {parse(showSentence)}
        </p>
      </div>
    </div>
  );
}

export default TypingGame;
