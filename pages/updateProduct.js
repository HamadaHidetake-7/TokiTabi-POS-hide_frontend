import { useState } from "react";
import axios from "axios";
import styles from "../styles/ProductForm.module.css";

export default function UpdateProduct() {
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    const updateProduct = async () => {
        if (!productId || !name || !price || !quantity) {
            alert("すべての項目を入力してください。");
            return;
        }

        try {
            await axios.put(`http://127.0.0.1:8000/products/${productId}`, {
                name: name,
                price: parseFloat(price),
                quantity: parseInt(quantity),
            });
            alert("商品が更新されました！");
            setProductId("");
            setName("");
            setPrice("");
            setQuantity("");
        } catch (error) {
            console.error(error);
            alert("商品の更新に失敗しました。");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>商品を更新する</h1>
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
                <label className={styles.label}>商品名:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>価格:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={styles.input}
                    min="0"
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>在庫数:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className={styles.input}
                    min="0"
                />
            </div>
            <button onClick={updateProduct} className={styles.button}>商品を更新</button>
        </div>
    );
}
