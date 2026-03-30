import { useState, useEffect } from 'react';
import { getHistory } from '../utils/storage';
import './ReportPage.css';

export default function ReportPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const consumed = history.filter((h) => h.outcome === 'consumed');
  const wasted = history.filter((h) => h.outcome === 'wasted');
  const total = history.length;

  const consumedPct = total > 0 ? Math.round((consumed.length / total) * 100) : 0;
  const wastedPct = total > 0 ? Math.round((wasted.length / total) * 100) : 0;

  return (
    <div className="report-page">
      <header className="report-header">
        <h1>Report</h1>
      </header>

      {total === 0 ? (
        <div className="empty-report">
          <span className="empty-icon">📈</span>
          <p>No data yet.</p>
          <p className="empty-hint">Stats will appear once you start removing items.</p>
        </div>
      ) : (
        <>
          <div className="stat-cards">
            <div className="stat-card consumed-card">
              <span className="stat-number">{consumed.length}</span>
              <span className="stat-label">Used</span>
              <span className="stat-pct">{consumedPct}%</span>
            </div>
            <div className="stat-card wasted-card">
              <span className="stat-number">{wasted.length}</span>
              <span className="stat-label">Wasted</span>
              <span className="stat-pct">{wastedPct}%</span>
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar">
              <div className="bar-consumed" style={{ width: `${consumedPct}%` }} />
              <div className="bar-wasted" style={{ width: `${wastedPct}%` }} />
            </div>
            <div className="progress-legend">
              <span className="legend-item"><span className="dot green" /> Used</span>
              <span className="legend-item"><span className="dot red" /> Wasted</span>
            </div>
          </div>

          <div className="history-section">
            <h2>History</h2>
            <div className="history-list">
              {[...history].reverse().map((entry, i) => (
                <div key={i} className={`history-row ${entry.outcome}`}>
                  <span className="history-name">{entry.name}</span>
                  <span className="history-storage">{entry.storage}</span>
                  <span className={`history-outcome ${entry.outcome}`}>
                    {entry.outcome === 'consumed' ? 'Used' : 'Wasted'}
                  </span>
                  <span className="history-date">{entry.removedDate}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
