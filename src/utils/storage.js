const ITEMS_KEY = 'foodle_items';
const HISTORY_KEY = 'foodle_history';

function loadJSON(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getItems() {
  return loadJSON(ITEMS_KEY, []);
}

export function saveItems(items) {
  saveJSON(ITEMS_KEY, items);
}

export function addItem(item) {
  const items = getItems();
  items.push({ ...item, id: crypto.randomUUID(), addedDate: new Date().toISOString().split('T')[0] });
  saveItems(items);
  return items;
}

export function updateItem(id, updates) {
  const items = getItems().map((item) =>
    item.id === id ? { ...item, ...updates } : item
  );
  saveItems(items);
  return items;
}

export function removeItem(id, outcome) {
  const items = getItems();
  const item = items.find((i) => i.id === id);
  if (item) {
    const history = getHistory();
    history.push({
      ...item,
      removedDate: new Date().toISOString().split('T')[0],
      outcome,
    });
    saveJSON(HISTORY_KEY, history);
  }
  const remaining = items.filter((i) => i.id !== id);
  saveItems(remaining);
  return remaining;
}

export function getHistory() {
  return loadJSON(HISTORY_KEY, []);
}

export function getItemsByStorage(storageName) {
  return getItems().filter((item) => item.storage === storageName);
}
