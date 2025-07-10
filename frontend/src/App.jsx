import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Items from "./pages/Items";
import UserDetail from "./pages/UserDetail";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ marginRight: 10 }}>홈</Link>
        <Link to="/items" style={{ marginRight: 10 }}>아이템</Link>
        <Link to="/users/1">사용자1</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/users/:userId" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
