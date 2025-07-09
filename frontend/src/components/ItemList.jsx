// src/components/ItemList.jsx
import { useEffect, useState } from 'react';
import api from '../api';

export default function ItemList() {
  const [items, setItems] = useState([]);

  const fetchItems = () => {
    api.get('/items').then(res => setItems(res.data));
  };

  const deleteItem = (id) => {
    api.delete(`/items/${id}`).then(() => fetchItems());
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h2>아이템 목록</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.price}원
            <button onClick={() => deleteItem(item.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
