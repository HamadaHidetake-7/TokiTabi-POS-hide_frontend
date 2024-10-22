import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>POSアプリ 管理システム</h1>
      <div className={styles.buttonGroup}>
        <Link href="/addProduct" legacyBehavior>
          <a className={styles.button}>商品を追加</a>
        </Link>
        <Link href="/orderList" legacyBehavior>
          <a className={styles.button}>注文一覧を見る</a>
        </Link>
        <Link href="/adminDashboard" legacyBehavior>
          <a className={styles.button}>管理者ダッシュボード</a>
        </Link>
      </div>
    </div>
  );
}
