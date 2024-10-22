import { useState } from "react";
import axios from "axios";
import styles from "../styles/ProductForm.module.css";

export default function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    const addProduct = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/products/", {
                name: name,
                price: Number(price),
                quantity: Number(quantity),
            });
            alert("商品が追加されました！");
            setName("");
            setPrice("");
            setQuantity("");
        } catch (error) {
            console.error(error);
            alert("商品の追加に失敗しました。");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>商品を追加する</h1>
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
            <button onClick={addProduct} className={styles.button}>商品を追加</button>
        </div>
    );
}
