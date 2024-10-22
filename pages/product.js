import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // バックエンドAPIから商品データを取得
    axios.get('http://127.0.0.1:8000/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  return (
    <div>
      <h1>商品一覧</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ¥{product.price} - 在庫: {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
