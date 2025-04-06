"use client";

import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(60); // 初期値：60秒（1分）
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    // 残り時間が0になったら止める
    if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (s) => {
    const minutes = Math.floor(s / 60);
    const secs = s % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>カウントダウンタイマー</h2>
      <h1>{formatTime(timeLeft)}</h1>
      <button onClick={() => setIsRunning(true)} disabled={timeLeft === 0}>
        開始
      </button>
      <button onClick={() => setIsRunning(false)}>停止</button>
      <button
        onClick={() => {
          setTimeLeft(60); // リセット時は60秒に戻す
          setIsRunning(false);
        }}
      >
        リセット
      </button>
    </div>
  );
}
