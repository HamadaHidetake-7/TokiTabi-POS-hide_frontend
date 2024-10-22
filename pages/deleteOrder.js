import { useState } from "react";
import axios from "axios";
import styles from "../styles/OrderForm.module.css";

export default function DeleteOrder() {
    const [orderId, setOrderId] = useState("");

    const deleteOrder = async () => {
        if (!orderId) {
            alert("注文IDを入力してください。");
            return;
        }
        try {
            await axios.delete(`http://127.0.0.1:8000/orders/${orderId}`);
            alert("注文が削除されました！");
        } catch (error) {
            console.error(error);
            alert("注文の削除に失敗しました。");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>注文を削除する</h1>
            <div className={styles.formGroup}>
                <label className={styles.label}>注文ID:</label>
                <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className={styles.input}
                />
            </div>
            <button onClick={deleteOrder} className={styles.button}>注文を削除</button>
        </div>
    );
}
