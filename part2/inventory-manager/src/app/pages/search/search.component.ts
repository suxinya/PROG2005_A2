import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  keyword = '';
  category = '';

  constructor(public inventoryService: InventoryService) {}

  get filtered() {
    return this.inventoryService.inventory.filter(item => {
      const matchName = item.itemName.toLowerCase().includes(this.keyword.toLowerCase());
      const matchCate = !this.category || item.category === this.category;
      return matchName && matchCate;
    });
  }
}
