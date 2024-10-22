import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import Link from 'next/link';
import { useState } from 'react';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  // 1. ユーザーの名前を保存するための状態を作成
  const [name, setName] = useState('');
  const [responseMessage, setResponseMessage] = useState('');  // 応答メッセージ用の状態

  // 2. フォームの送信ハンドラー
  const handleSubmit = async (e) => {
    e.preventDefault();  // フォームの自動送信を防止

    try {
      // 3. バックエンドにリクエストを送信
      const response = await fetch('http://127.0.0.1:8000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),  // ユーザーの名前を送信
      });

      // 4. 応答を取得して状態に保存
      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      console.error('エラーが発生しました:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello, World!</h1>
      <p className={styles.description}>これがあなたの最初のNext.jsページです。</p>

      {/* Aboutページへのリンクを追加します */}
      <Link href="/about">
        <span className={styles.link}>このサイトについて (Aboutページへ移動)</span>
      </Link>

      {/* フォームを追加してユーザーからの入力を受け取る */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name">名前を入力してください：</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}  // ユーザーの入力を追跡
          className={styles.input}
        />
        <button type="submit" className={styles.button}>送信</button>
      </form>

      {/* バックエンドからの応答メッセージを表示 */}
      {responseMessage && (
        <p className={styles.response}>{responseMessage}</p>
      )}
    </div>
  );
}
