import React from "react";

type TimerProps = {
  params: {
    handleTime: Function;
  };
};

function Timer({ params: { handleTime } }: TimerProps) {
  function hoge() {
    handleTime();
  }

  return (
    <div className="text-2xl p-4 border-2 border-slate-300 rounded-md">
      <p>Timer</p>
    </div>
  );
}

export default Timer;
