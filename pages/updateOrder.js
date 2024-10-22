import { useState } from "react";
import axios from "axios";
import styles from "../styles/OrderForm.module.css";

export default function UpdateOrder() {
    const [orderId, setOrderId] = useState("");
    const [newQuantity, setNewQuantity] = useState("");

    const updateOrder = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/orders/${orderId}`, {
                quantity: newQuantity,
            });
            alert("注文が更新されました！");
        } catch (error) {
            console.error(error);
            alert("注文の更新に失敗しました。");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>注文を更新する</h1>
            <div className={styles.formGroup}>
                <label className={styles.label}>注文ID:</label>
                <input
                    type="number"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className={styles.input}
                    placeholder="注文IDを入力してください"
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>新しい注文数量:</label>
                <input
                    type="number"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    className={styles.input}
                    placeholder="新しい数量を入力してください"
                />
            </div>
            <button onClick={updateOrder} className={styles.button}>注文を更新</button>
        </div>
    );
}
