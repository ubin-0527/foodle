import './RemoveModal.css';

export default function RemoveModal({ item, onConfirm, onCancel }) {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Remove "{item.name}"?</h3>
        <p>Did you use this item, or did it go to waste?</p>
        <div className="modal-actions">
          <button className="btn-consumed" onClick={() => onConfirm('consumed')}>
            Used It
          </button>
          <button className="btn-wasted" onClick={() => onConfirm('wasted')}>
            Wasted
          </button>
        </div>
        <button className="btn-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
