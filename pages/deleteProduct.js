import { useState } from "react";
import axios from "axios";
import styles from "../styles/ProductForm.module.css";

export default function DeleteProduct() {
    const [productId, setProductId] = useState("");

    const deleteProduct = async () => {
        if (!productId) {
            alert("商品IDを入力してください。");
            return;
        }

        try {
            await axios.delete(`http://127.0.0.1:8000/products/${productId}`);
            alert("商品が削除されました！");
            setProductId("");
        } catch (error) {
            console.error(error);
            alert("商品の削除に失敗しました。");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>商品を削除する</h1>
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
            <button onClick={deleteProduct} className={styles.button}>商品を削除</button>
        </div>
    );
}
