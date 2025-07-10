import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE = "http://localhost:8000";

export default function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/users/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error("사용자 조회 실패");
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>로딩 중...</div>;

  if (!user) return <div>사용자를 찾을 수 없습니다.</div>;

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>사용자 상세 정보</h1>
      <p>사용자 ID: {user.user_id}</p>
      <p>사용자명: {user.username}</p>
    </div>
  );
}
