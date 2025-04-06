"use client"; // App RouterでuseStateなどを使う時に必要！

import { useEffect, useState } from "react";

export default function CountupTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        //setIntervalは1000ミリ秒後に1秒加算する機能
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (s) => {
    //この小文字のsは仮引数 32行目に用いられている
    const minutes = Math.floor(s / 60);
    const secs = s % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>タイマー</h2>
      <h1>{formatTime(seconds)}</h1>
      <button onClick={() => setIsRunning(true)}>開始</button>
      <button onClick={() => setIsRunning(false)}>停止</button>
      <button
        onClick={() => {
          setSeconds(0);
          setIsRunning(false);
        }}
      >
        リセット
      </button>
    </div>
  );
}
