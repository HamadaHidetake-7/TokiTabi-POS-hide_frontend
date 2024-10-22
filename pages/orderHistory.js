import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/orders/");
                setOrders(response.data);
            } catch (error) {
                console.error("注文履歴の取得に失敗しました:", error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <h1>注文履歴</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>商品ID</th>
                        <th>商品名</th>
                        <th>数量</th>
                        <th>合計金額</th>
                        <th>注文日時</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.product_id}</td>
                            <td>{order.product_name}</td>
                            <td>{order.quantity}</td>
                            <td>{order.total_price}</td>
                            <td>{new Date(order.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
