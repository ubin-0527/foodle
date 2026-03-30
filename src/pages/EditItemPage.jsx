import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItems, updateItem } from '../utils/storage';
import { categories } from '../data/shelfLife';
import './FormPage.css';

export default function EditItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [storage, setStorage] = useState('fridge');
  const [expirationDate, setExpirationDate] = useState('');

  useEffect(() => {
    const item = getItems().find((i) => i.id === id);
    if (!item) { navigate('/'); return; }
    setName(item.name);
    setCategory(item.category);
    setStorage(item.storage);
    setExpirationDate(item.expirationDate);
  }, [id, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !category || !expirationDate) return;
    updateItem(id, { name: name.trim(), category, storage, expirationDate });
    navigate(`/item/${id}`);
  }

  return (
    <div className="form-page">
      <header className="form-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <h1>Edit Item</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <label className="field-label">Name</label>
        <input
          type="text"
          className="field-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="field-label">Category</label>
        <div className="category-grid">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`category-chip ${category === cat.id ? 'selected' : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              <span className="chip-emoji">{cat.emoji}</span>
              <span className="chip-label">{cat.label}</span>
            </button>
          ))}
        </div>

        <label className="field-label">Store In</label>
        <div className="storage-toggle">
          {['fridge', 'freezer', 'pantry'].map((s) => (
            <button
              key={s}
              type="button"
              className={`storage-opt ${storage === s ? 'active' : ''}`}
              onClick={() => setStorage(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        <label className="field-label">Expiration Date</label>
        <input
          type="date"
          className="field-input"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />

        <button type="submit" className="submit-btn">Save Changes</button>
      </form>
    </div>
  );
}
