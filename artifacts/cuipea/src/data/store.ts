export function saveData(key: string, value: any) {
  localStorage.setItem('cuipea_' + key, JSON.stringify(value));
}

export function loadData(key: string, defaultValue: any) {
  try {
    const stored = localStorage.getItem('cuipea_' + key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}
