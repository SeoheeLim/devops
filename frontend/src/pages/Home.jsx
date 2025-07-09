
// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import api from '../api';

export default function Home() {
  const [message, setMessage] = useState('');
  const [health, setHealth] = useState('');

  useEffect(() => {
    api.get('/').then(res => setMessage(res.data.message));
    api.get('/health').then(res => setHealth(res.data.message));
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>{message}</p>
      <p>서버 상태: {health}</p>
    </div>
  );
}
