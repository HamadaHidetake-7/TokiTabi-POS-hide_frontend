import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/AdminDashboard.module.css";
import { useRouter } from 'next/router';

export default function AdminDashboard() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch all products
        axios.get("http://127.0.0.1:8000/products/")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });

        // Fetch all orders
        axios.get("http://127.0.0.1:8000/orders/")
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            });
    }, []);

    // 商品編集ボタンのハンドラー
    const handleEditProduct = (productId) => {
        router.push(`/editProduct/${productId}`);
    };

    // 商品削除ボタンのハンドラー
    const handleDeleteProduct = (productId) => {
        axios.delete(`http://127.0.0.1:8000/products/${productId}`)
            .then(() => {
                alert("商品が削除されました");
                setProducts(products.filter(product => product.id !== productId));
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
                alert("商品の削除に失敗しました");
            });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>管理者ダッシュボード</h1>

            <section className={styles.section}>
                <h2>在庫情報</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>商品ID</th>
                            <th>商品名</th>
                            <th>価格</th>
                            <th>在庫数</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <button onClick={() => handleEditProduct(product.id)} className={styles.editButton}>
                                        編集
                                    </button>
                                    <button onClick={() => handleDeleteProduct(product.id)} className={styles.deleteButton}>
                                        削除
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section className={styles.section}>
                <h2>注文履歴</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>注文ID</th>
                            <th>商品ID</th>
                            <th>注文数</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{order.product_id}</td>
                                <td>{order.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
