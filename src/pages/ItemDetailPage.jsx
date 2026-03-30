import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItems, removeItem } from '../utils/storage';
import { getCategoryEmoji, getExpiryStatus, getDaysUntilExpiry, categories } from '../data/shelfLife';
import RemoveModal from '../components/RemoveModal';
import './ItemDetailPage.css';

export default function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    const found = getItems().find((i) => i.id === id);
    if (!found) { navigate('/'); return; }
    setItem(found);
  }, [id, navigate]);

  if (!item) return null;

  const emoji = getCategoryEmoji(item.category);
  const status = getExpiryStatus(item.expirationDate);
  const daysLeft = getDaysUntilExpiry(item.expirationDate);
  const catLabel = categories.find((c) => c.id === item.category)?.label ?? item.category;

  let expiryText;
  if (daysLeft < 0) expiryText = `Expired ${Math.abs(daysLeft)} day(s) ago`;
  else if (daysLeft === 0) expiryText = 'Expires today';
  else expiryText = `${daysLeft} day(s) left`;

  function handleRemove(outcome) {
    removeItem(item.id, outcome);
    navigate('/');
  }

  return (
    <div className="detail-page">
      <header className="detail-header">
        <button className="back-btn" onClick={() => navigate('/')}>←</button>
        <h1>Item Details</h1>
      </header>

      <div className="detail-card">
        <div className="detail-emoji">{emoji}</div>
        <h2 className="detail-name">{item.name}</h2>
        <span className={`detail-badge ${status}`}>
          {status === 'expired' ? 'Expired' : status === 'warning' ? 'Expiring Soon' : 'Fresh'}
        </span>

        <div className="detail-info">
          <div className="info-row">
            <span className="info-label">Category</span>
            <span className="info-value">{catLabel}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Stored In</span>
            <span className="info-value">{item.storage.charAt(0).toUpperCase() + item.storage.slice(1)}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Added</span>
            <span className="info-value">{item.addedDate}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Expires</span>
            <span className="info-value">{item.expirationDate}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Status</span>
            <span className={`info-value ${status}`}>{expiryText}</span>
          </div>
        </div>

        <div className="detail-actions">
          <button className="edit-btn" onClick={() => navigate(`/item/${item.id}/edit`)}>Edit</button>
          <button className="delete-btn" onClick={() => setRemoving(true)}>Delete</button>
        </div>
      </div>

      {removing && (
        <RemoveModal
          item={item}
          onConfirm={handleRemove}
          onCancel={() => setRemoving(false)}
        />
      )}
    </div>
  );
}
