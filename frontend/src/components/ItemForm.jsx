import { useState } from 'react';
import api from '../api';

export default function ItemForm({ onSuccess }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/items', { name, price: parseFloat(price) })
      .then(() => {
        onSuccess();
        setName('');
        setPrice('');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="이름" />
      <input value={price} onChange={e => setPrice(e.target.value)} placeholder="가격" />
      <button type="submit">등록</button>
    </form>
  );
}
