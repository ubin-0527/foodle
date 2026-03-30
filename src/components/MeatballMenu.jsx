import './MeatballMenu.css';

export default function MeatballMenu({ open, onToggle, onEdit, onDelete }) {
  function handleClick(e) {
    e.stopPropagation();
    onToggle();
  }

  return (
    <div className="meatball-wrapper">
      <button className="meatball-btn" onClick={handleClick} aria-label="Options">
        ⋮
      </button>
      {open && (
        <div className="meatball-dropdown">
          <button onClick={(e) => { e.stopPropagation(); onEdit(); }}>Edit</button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="delete-option">Delete</button>
        </div>
      )}
    </div>
  );
}
