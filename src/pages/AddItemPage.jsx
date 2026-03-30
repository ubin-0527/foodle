import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { categories, getEstimatedExpiry } from '../data/shelfLife';
import { addItem } from '../utils/storage';
import './FormPage.css';

export default function AddItemPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultStorage = searchParams.get('storage') || 'fridge';

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [storage, setStorage] = useState(defaultStorage);
  const [expiryMode, setExpiryMode] = useState('auto');
  const [manualDate, setManualDate] = useState('');

  const autoDate = category ? getEstimatedExpiry(category, storage) : '';

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !category) return;

    const expirationDate = expiryMode === 'auto' ? autoDate : manualDate;
    if (!expirationDate) return;

    addItem({ name: name.trim(), category, storage, expirationDate });
    navigate('/');
  }

  return (
    <div className="form-page">
      <header className="form-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <h1>Add Item</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <label className="field-label">Name</label>
        <input
          type="text"
          className="field-input"
          placeholder="e.g. Chicken breast"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
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
        <div className="expiry-toggle">
          <button
            type="button"
            className={`expiry-opt ${expiryMode === 'auto' ? 'active' : ''}`}
            onClick={() => setExpiryMode('auto')}
          >
            Auto-estimate
          </button>
          <button
            type="button"
            className={`expiry-opt ${expiryMode === 'manual' ? 'active' : ''}`}
            onClick={() => setExpiryMode('manual')}
          >
            Manual
          </button>
        </div>

        {expiryMode === 'auto' ? (
          <div className="auto-date-display">
            {autoDate ? (
              <p>Estimated: <strong>{autoDate}</strong></p>
            ) : (
              <p className="hint">Select a category to see the estimate</p>
            )}
          </div>
        ) : (
          <input
            type="date"
            className="field-input"
            value={manualDate}
            onChange={(e) => setManualDate(e.target.value)}
          />
        )}

        <button type="submit" className="submit-btn">Add to {storage}</button>
      </form>
    </div>
  );
}
