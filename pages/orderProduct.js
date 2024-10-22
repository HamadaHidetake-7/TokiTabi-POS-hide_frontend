import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderProduct() {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState("");
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/products/");
                setProducts(response.data);
            } catch (error) {
                console.error("商品の取得に失敗しました:", error);
            }
        };

        fetchProducts();
    }, []);

    const placeOrder = async () => {
        if (!selectedProductId || quantity <= 0) {
            alert("有効な商品と数量を選択してください。");
            return;
        }

        try {
            const product = products.find((p) => p.id === parseInt(selectedProductId));
            if (product && product.quantity >= quantity) {
                await axios.put(`http://127.0.0.1:8000/products/${selectedProductId}`, {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity - quantity,
                });
                alert("注文が完了しました！");
            } else {
                alert("在庫が不足しています。");
            }
        } catch (error) {
            console.error("注文に失敗しました:", error);
            alert("注文に失敗しました。");
        }
    };

    return (
        <div>
            <h1>商品を注文する</h1>
            <div>
                <label>商品を選択:</label>
                <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                >
                    <option value="">-- 商品を選択 --</option>
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.name} (在庫: {product.quantity})
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>数量:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
            </div>
            <button onClick={placeOrder}>注文する</button>
        </div>
    );
}
