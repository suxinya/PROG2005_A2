import { Injectable } from '@angular/core';

export interface InventoryItem {
  itemId: string;
  itemName: string;
  category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
  quantity: number;
  price: number;
  supplierName: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  isPopular: 'Yes' | 'No';
  comment?: string;
}

@Injectable({ providedIn: 'root' })
export class InventoryService {
  inventory: InventoryItem[] = [
    {
      itemId: 'E001',
      itemName: 'Laptop',
      category: 'Electronics',
      quantity: 10,
      price: 999.99,
      supplierName: 'Tech Corp',
      stockStatus: 'In Stock',
      isPopular: 'Yes',
      comment: 'Latest model'
    }
  ];

  isIdUnique(id: string): boolean {
    return !this.inventory.some(i => i.itemId === id);
  }

  addItem(item: InventoryItem): boolean {
    if (!this.isIdUnique(item.itemId)) return false;
    this.inventory.push(item);
    return true;
  }

  findItemByName(name: string): InventoryItem | undefined {
    return this.inventory.find(i =>
      i.itemName.toLowerCase() === name.trim().toLowerCase()
    );
  }

  updateItem(updated: InventoryItem): boolean {
    const idx = this.inventory.findIndex(i => i.itemId === updated.itemId);
    if (idx === -1) return false;
    this.inventory[idx] = updated;
    return true;
  }

  deleteItem(name: string): boolean {
    const idx = this.inventory.findIndex(i =>
      i.itemName.toLowerCase() === name.trim().toLowerCase()
    );
    if (idx === -1) return false;
    this.inventory.splice(idx, 1);
    return true;
  }
}
