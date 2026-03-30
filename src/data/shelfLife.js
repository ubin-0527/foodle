export const categories = [
  { id: 'vegetable', label: 'Vegetable', emoji: '🥬' },
  { id: 'fruit', label: 'Fruit', emoji: '🍎' },
  { id: 'dairy', label: 'Dairy', emoji: '🧀' },
  { id: 'poultry', label: 'Poultry', emoji: '🍗' },
  { id: 'meat', label: 'Meat', emoji: '🥩' },
  { id: 'seafood', label: 'Seafood', emoji: '🐟' },
  { id: 'grain', label: 'Grain', emoji: '🌾' },
  { id: 'egg', label: 'Egg', emoji: '🥚' },
  { id: 'spice', label: 'Spice', emoji: '🧂' },
  { id: 'condiment', label: 'Condiment', emoji: '🫙' },
  { id: 'beverage', label: 'Beverage', emoji: '🧃' },
  { id: 'snack', label: 'Snack', emoji: '🍪' },
  { id: 'leftover', label: 'Leftover', emoji: '🍱' },
  { id: 'frozen', label: 'Frozen', emoji: '🧊' },
];

export const defaultShelfLife = {
  fridge: {
    vegetable: 7,
    fruit: 7,
    dairy: 14,
    poultry: 3,
    meat: 5,
    seafood: 2,
    grain: 90,
    egg: 21,
    spice: 365,
    condiment: 90,
    beverage: 30,
    snack: 30,
    leftover: 4,
    frozen: 3,
  },
  freezer: {
    vegetable: 240,
    fruit: 240,
    dairy: 90,
    poultry: 270,
    meat: 180,
    seafood: 180,
    grain: 240,
    egg: 120,
    spice: 365,
    condiment: 180,
    beverage: 180,
    snack: 120,
    leftover: 90,
    frozen: 180,
  },
  pantry: {
    vegetable: 14,
    fruit: 7,
    dairy: 7,
    poultry: 1,
    meat: 1,
    seafood: 1,
    grain: 180,
    egg: 1,
    spice: 365,
    condiment: 365,
    beverage: 180,
    snack: 60,
    leftover: 1,
    frozen: 1,
  },
};

export function getEstimatedExpiry(category, storage) {
  const days = defaultShelfLife[storage]?.[category] ?? 7;
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

export function getCategoryEmoji(categoryId) {
  return categories.find((c) => c.id === categoryId)?.emoji ?? '🍽️';
}

export function getExpiryStatus(expirationDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expirationDate + 'T00:00:00');
  const diffMs = expiry - today;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'expired';
  if (diffDays <= 3) return 'warning';
  return 'fresh';
}

export function getDaysUntilExpiry(expirationDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expirationDate + 'T00:00:00');
  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
}
