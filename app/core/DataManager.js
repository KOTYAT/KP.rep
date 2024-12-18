export default class DataManager {
  constructor(storageKey) {
    this.storageKey = storageKey;
  }

  getItems() {
    return JSON.parse(localStorage.getItem(this.storageKey) || "[]");
  }

  saveItems(items) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  addItem(item) {
    const items = this.getItems();
    const newItem = {
      ...item,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    items.push(newItem);
    this.saveItems(items);
    return newItem;
  }

  removeItem(id) {
    const items = this.getItems().filter((item) => item.id !== id);
    this.saveItems(items);
  }

  filterItems(searchTerm, filterField) {
    const items = this.getItems();
    return items.filter((item) => {
      const matchesSearch =
        !searchTerm ||
        item.fullName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = !filterField || item.faculty === filterField;
      return matchesSearch && matchesFilter;
    });
  }
}
