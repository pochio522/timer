import CountdownTimer from "@/components/CountdownTimer";
import CountupTimer from "../components/CountupTimer"; // 位置はプロジェクトによって調整

export default function Home() {
  return (
    <main>
      <h1>カウントアップアプリ</h1>
      <CountupTimer />
      <h1>タイマー</h1>
      <CountdownTimer />
    </main>
  );
}
