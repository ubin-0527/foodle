import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategoryEmoji, getExpiryStatus, getDaysUntilExpiry } from '../data/shelfLife';
import MeatballMenu from './MeatballMenu';
import './ItemCard.css';

export default function ItemCard({ item, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const emoji = getCategoryEmoji(item.category);
  const status = getExpiryStatus(item.expirationDate);
  const daysLeft = getDaysUntilExpiry(item.expirationDate);

  const dotClass = `expiry-dot ${status}`;

  let expiryLabel;
  if (daysLeft < 0) expiryLabel = `D+${Math.abs(daysLeft)}`;
  else if (daysLeft === 0) expiryLabel = 'Today';
  else expiryLabel = `D-${daysLeft}`;

  function handleCardClick(e) {
    if (menuOpen) return;
    navigate(`/item/${item.id}`);
  }

  return (
    <div className="item-card" onClick={handleCardClick}>
      <div className="card-top-row">
        <span className={dotClass} />
        <MeatballMenu
          open={menuOpen}
          onToggle={() => setMenuOpen(!menuOpen)}
          onEdit={() => { setMenuOpen(false); navigate(`/item/${item.id}/edit`); }}
          onDelete={() => { setMenuOpen(false); onDelete(item); }}
        />
      </div>
      <div className="card-emoji">{emoji}</div>
      <div className="card-name">{item.name}</div>
      <div className={`card-expiry ${status}`}>{expiryLabel}</div>
    </div>
  );
}
