// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import UserInfo from './components/UserInfo';

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/items">Items</Link> | <Link to="/users">Users</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={
          <div>
            <ItemForm onSuccess={() => window.location.reload()} />
            <ItemList />
          </div>
        } />
        <Route path="/users" element={<UserInfo />} />
      </Routes>
    </Router>
  );
}
