import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/OrderForm.module.css";

export default function OrderList() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/orders/");
            setOrders(response.data);
        } catch (error) {
            console.error("注文情報の取得に失敗しました。", error);
        }
    };

    const deleteOrder = async (orderId) => {
        if (window.confirm("本当にこの注文を削除しますか？")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/orders/${orderId}`);
                alert("注文が削除されました！");
                fetchOrders(); // 更新後の注文リストを再取得
            } catch (error) {
                console.error("注文の削除に失敗しました。", error);
                alert("注文の削除に失敗しました。");
            }
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>注文一覧</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>注文ID</th>
                        <th>商品名</th>
                        <th>数量</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.product_name}</td>
                            <td>{order.quantity}</td>
                            <td>
                                <button
                                    onClick={() => deleteOrder(order.id)}
                                    className={styles.button}
                                >
                                    削除
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
