import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:8000";

export default function Home() {
  const [health, setHealth] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/health`)
      .then(res => res.json())
      .then(data => setHealth(data.status))
      .catch(() => setHealth("오류"));

    fetch(`${API_BASE}/users/me`)
      .then(res => res.json())
      .then(data => setUserInfo(data))
      .catch(() => setUserInfo(null));
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>홈</h1>
      <p>서버 상태: {health || "로딩 중..."}</p>
      {userInfo ? (
        <>
          <p>사용자명: {userInfo.username}</p>
          <p>이메일: {userInfo.email}</p>
        </>
      ) : (
        <p>사용자 정보를 불러올 수 없습니다.</p>
      )}
    </div>
  );
}
