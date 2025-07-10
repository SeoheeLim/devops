import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:8000";

export default function Items() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    is_available: true,
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch(`${API_BASE}/items`);
    const data = await res.json();
    setItems(data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      is_available: form.is_available,
    };
    if (editId === null) {
      const res = await fetch(`${API_BASE}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        fetchItems();
        setForm({ name: "", description: "", price: "", is_available: true });
      }
    } else {
      const res = await fetch(`${API_BASE}/items/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        fetchItems();
        setEditId(null);
        setForm({ name: "", description: "", price: "", is_available: true });
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    const res = await fetch(`${API_BASE}/items/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchItems();
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      name: item.name,
      description: item.description || "",
      price: item.price.toString(),
      is_available: item.is_available,
    });
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ name: "", description: "", price: "", is_available: true });
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>아이템 관리</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            이름:
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            설명:
            <input name="description" value={form.description} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            가격:
            <input
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            판매 가능 여부:
            <input
              name="is_available"
              type="checkbox"
              checked={form.is_available}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">{editId === null ? "추가" : "수정"}</button>
        {editId !== null && <button onClick={handleCancel}>취소</button>}
      </form>

      <h2>아이템 목록</h2>
      {items.length === 0 ? (
        <p>아이템이 없습니다.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id} style={{ marginBottom: 10 }}>
              <b>{item.name}</b> (₩{item.price.toLocaleString()}) {item.is_available ? "✅" : "❌"}
              <br />
              {item.description}
              <br />
              <button onClick={() => handleEdit(item)}>수정</button>{" "}
              <button onClick={() => handleDelete(item.id)}>삭제</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
