import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "../../styles/ProductForm.module.css";

export default function EditProduct() {
    const router = useRouter();
    const { productId } = router.query;

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        if (productId) {
            axios.get(`http://127.0.0.1:8000/products/${productId}`)
                .then((response) => {
                    const product = response.data;
                    setName(product.name);
                    setPrice(product.price);
                    setQuantity(product.quantity);
                })
                .catch((error) => {
                    console.error("Error fetching product:", error);
                });
        }
    }, [productId]);

    const handleUpdateProduct = () => {
        axios.put(`http://127.0.0.1:8000/products/${productId}`, {
            name,
            price,
            quantity,
        })
            .then(() => {
                alert("商品が更新されました");
                router.push("/adminDashboard");
            })
            .catch((error) => {
                console.error("Error updating product:", error);
                alert("商品の更新に失敗しました");
            });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>商品を編集する</h1>
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
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className={styles.input}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>在庫数:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className={styles.input}
                />
            </div>
            <button onClick={handleUpdateProduct} className={styles.button}>
                更新
            </button>
        </div>
    );
}
