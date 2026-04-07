import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import SplashScreen from './components/SplashScreen';
import StoragePage from './pages/StoragePage';
import AddItemPage from './pages/AddItemPage';
import EditItemPage from './pages/EditItemPage';
import ItemDetailPage from './pages/ItemDetailPage';
import ReportPage from './pages/ReportPage';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) return <SplashScreen onStart={() => setShowSplash(false)} />;

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
