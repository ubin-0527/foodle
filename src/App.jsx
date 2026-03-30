import { Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import StoragePage from './pages/StoragePage';
import AddItemPage from './pages/AddItemPage';
import EditItemPage from './pages/EditItemPage';
import ItemDetailPage from './pages/ItemDetailPage';
import ReportPage from './pages/ReportPage';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<StoragePage />} />
        <Route path="/add" element={<AddItemPage />} />
        <Route path="/item/:id" element={<ItemDetailPage />} />
        <Route path="/item/:id/edit" element={<EditItemPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;
