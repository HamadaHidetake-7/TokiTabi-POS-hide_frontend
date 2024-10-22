import { useState } from "react";
import axios from "axios";
import styles from "../styles/ProductForm.module.css";

export default function AddOrder() {
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");

    const addOrder = async () => {
        if (!productId || !quantity) {
            alert("すべての項目を入力してください。");
            return;
        }

        try {
            await axios.post("http://127.0.0.1:8000/orders/", {
                product_id: parseInt(productId),
                quantity: parseInt(quantity),
            });
            alert("注文が追加されました！");
            setProductId("");
            setQuantity("");
        } catch (error) {
            console.error(error);
            alert("注文の追加に失敗しました。");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>注文を追加する</h1>
            <div className={styles.formGroup}>
                <label className={styles.label}>商品ID:</label>
                <input
                    type="number"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className={styles.input}
                    min="1"
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>注文数:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className={styles.input}
                    min="1"
                />
            </div>
            <button onClick={addOrder} className={styles.button}>注文を追加</button>
        </div>
    );
}
