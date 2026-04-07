import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, InventoryItem } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  newItem: InventoryItem = {
    itemId: '', itemName: '', category: 'Electronics',
    quantity: 0, price: 0, supplierName: '',
    stockStatus: 'In Stock', isPopular: 'Yes', comment: ''
  };

  feedback = { message: '', type: '' };

  constructor(public inventoryService: InventoryService) {}

  showMsg(msg: string, success: boolean) {
    this.feedback = { message: msg, type: success ? 'success' : 'error' };
    setTimeout(() => this.feedback = { message: '', type: '' }, 3000);
  }

  addItem() {
    if (!this.newItem.itemId || !this.newItem.itemName || !this.newItem.supplierName) {
      this.showMsg('All required fields must be filled!', false);
      return;
    }
    const ok = this.inventoryService.addItem({ ...this.newItem });
    ok ? this.showMsg('Item added successfully!', true) : this.showMsg('ID already exists!', false);
    if (ok) this.reset();
  }

  loadItem() {
    const item = this.inventoryService.findItemByName(this.newItem.itemName);
    item ? (this.newItem = { ...item }, this.showMsg('Item loaded!', true)) : this.showMsg('Item not found!', false);
  }

  saveEdit() {
    const ok = this.inventoryService.updateItem(this.newItem);
    ok ? this.showMsg('Item updated!', true) : this.showMsg('Update failed!', false);
  }

  deleteItem() {
    const ok = this.inventoryService.deleteItem(this.newItem.itemName);
    ok ? (this.showMsg('Item deleted!', true), this.reset()) : this.showMsg('Delete failed!', false);
  }

  reset() {
    this.newItem = {
      itemId: '', itemName: '', category: 'Electronics',
      quantity: 0, price: 0, supplierName: '',
      stockStatus: 'In Stock', isPopular: 'Yes', comment: ''
    };
  }
}
