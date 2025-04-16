"use client"; //利用者側の操作によって動くよっていう合図

import { useEffect, useState } from "react";

//CountdownTimerという関数を定義
export default function CountdownTimer() {
  //constの部分で状態の定義を行っている
  const [oursInput, setOursInput] = useState(0); // 初期0時間
  const [minutesInput, setMinutesInput] = useState(0); // 初期0分 minutesInputには1がはいってる
  const [secondsInput, setSecondsInput] = useState(0); // 初期0秒
  const [timeLeft, setTimeLeft] = useState(0); // 秒単位で管理
  const [isRunning, setIsRunning] = useState(false); //タイマーが動いているかどうか
  const [isStarted, setIsStarted] = useState(false); // スタートボタンが押されたかどうか

  useEffect(() => {
    let interval; //letで定義すると後から値を代入できる constだと代入できない

    //isRunning===trueかつtimeLeft>0のときだけ,1秒ごとにtimeLeftを-1していく。
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    //5秒以内になったら毎秒アラームを鳴らす
    if (timeLeft <= 5 && timeLeft > 0 && isRunning) {
      const tick = new Audio("/決定ボタンを押す2.mp3");
      tick.play();
    }

    //残り時間が0になったら、自動で止める
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);

      //アラームを鳴らす
      const alarm = new Audio("/ビープ音（ポーン）.mp3"); // app/publicにmp3は保存されている。
      alarm.play(); //alarm.playで音が鳴る。
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]); //[]の中は「この値が変わったら再実行して」という指定

  const formatTime = (s) => {
    const ours = Math.floor(s / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${ours.toString().padStart(2, "0")}:
    ${minutes.toString().padStart(2, "0")}:${secs //padStart(2,"0")→1桁のときは前に0をつける
      .toString()
      .padStart(2, "0")}`;
  };

  //開始ボタンを押したときの処理
  const handleStart = () => {
    //parseIntとは文字列を整数に変換する関数
    const totalSeconds =
      parseInt(oursInput) * 3600 +
      parseInt(minutesInput) * 60 +
      parseInt(secondsInput);
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setIsRunning(true);
      setIsStarted(true);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>カウントダウンタイマー</h2>

      {!isStarted && ( //タイマーが開始されていなかったら時間指定のフォームが表示
        <div style={{ marginBottom: "5px" }}>
          <label>
            時:
            <input
              type="text"
              value={oursInput}
              onChange={(e) => setOursInput(e.target.value)}
              min="0"
            />
          </label>
          <label>
            分:
            <input
              type="text"
              value={minutesInput}
              onChange={(e) => setMinutesInput(e.target.value)}
              min="0"
              max="59"
            />
          </label>
          <label style={{ marginLeft: "5px" }}>
            秒:
            <input
              type="text"
              value={secondsInput}
              onChange={(e) => setSecondsInput(e.target.value)}
              min="0"
              max="59"
            />
          </label>
        </div>
      )}

      <h1>{formatTime(timeLeft)}</h1>

      {!isStarted && <button onClick={handleStart}>開始</button>}
      {isStarted && (
        <>
          <button onClick={() => setIsRunning(true)} disabled={timeLeft === 0}>
            再開
          </button>
          <button onClick={() => setIsRunning(false)}>停止</button>
          <button
            onClick={() => {
              setIsRunning(false);
              setIsStarted(false);
              setTimeLeft(60); // 初期化
              setOursInput(0);
              setMinutesInput(0);
              setSecondsInput(0);
            }}
          >
            リセット
          </button>
        </>
      )}
    </div>
  );
}
