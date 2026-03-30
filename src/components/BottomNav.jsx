import { NavLink } from 'react-router-dom';
import './BottomNav.css';

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
        <span className="nav-icon">🏠</span>
        <span className="nav-label">Storage</span>
      </NavLink>
      <NavLink to="/report" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
        <span className="nav-icon">📊</span>
        <span className="nav-label">Report</span>
      </NavLink>
    </nav>
  );
}
