import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItems, removeItem } from '../utils/storage';
import ItemCard from '../components/ItemCard';
import RemoveModal from '../components/RemoveModal';
import './StoragePage.css';

const tabs = [
  { id: 'fridge', label: 'Fridge', icon: '🧊' },
  { id: 'freezer', label: 'Freezer', icon: '❄️' },
  { id: 'pantry', label: 'Pantry', icon: '🏪' },
];

export default function StoragePage() {
  const [activeTab, setActiveTab] = useState('fridge');
  const [items, setItems] = useState([]);
  const [removing, setRemoving] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(getItems());
  }, []);

  const filtered = items.filter((item) => item.storage === activeTab);

  function handleDelete(item) {
    setRemoving(item);
  }

  function confirmRemove(outcome) {
    const updated = removeItem(removing.id, outcome);
    setItems(updated);
    setRemoving(null);
  }

  return (
    <div className={`storage-page bg-${activeTab}`}>
      <header className="storage-header">
        <h1 className="app-title">Foodle</h1>
        <div className="tab-bar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <button className="add-btn" onClick={() => navigate(`/add?storage=${activeTab}`)}>
        +
      </button>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📦</span>
          <p>No items in your {activeTab} yet.</p>
          <p className="empty-hint">Tap + to add your first item!</p>
        </div>
      ) : (
        <div className="items-grid">
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <RemoveModal
        item={removing}
        onConfirm={confirmRemove}
        onCancel={() => setRemoving(null)}
      />
    </div>
  );
}
