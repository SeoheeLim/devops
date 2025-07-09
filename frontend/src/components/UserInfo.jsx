// src/components/UserInfo.jsx
import { useEffect, useState } from 'react';
import api from '../api';

export default function UserInfo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/users/me').then(res => setUser(res.data));
  }, []);

  return (
    <div>
      <h2>현재 사용자</h2>
      {user && (
        <p>{user.username} - {user.email}</p>
      )}
    </div>
  );
}
