export class Item {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

export class ComboItem {
  qty: number;
  item: Item;

  constructor(item: Item, qty: number) {
    this.item = item;
    this.qty = qty;
  }
    getTotal(): number {
    return this.qty * this.item.value;
  }
}

export class Combo {
  name: string;
  brand: string;
  price: number;
  score: number;
  items: ComboItem[];

  constructor(name: string, brand = "", price = 0, items: ComboItem[] = []) {
    this.name = name;
    this.brand = brand;
    this.price = price;
    this.items = items;
    this.score = this.getRating();
  }
  calculateTotal(): number {
    return this.items.reduce((sum, ci) => sum + ci.getTotal(), 0);
  }

  getRating(): number {
    return (this.calculateTotal() - this.price) / this.price * 100;
  }
}