import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { MultiSelect } from 'primeng/multiselect';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table/data-table.component';
import { Router } from '@angular/router';

export interface Item {
  ID: string;
  name: string;
  unit: string;
  quantity: number;
  description: string;
  IMBACode: number;
  category: string;
  defaultSupplier: string;
  lastPurchasePrice: number;
  purchaseHistory: any[];
}

@Component({
  selector: 'app-items',
  imports: [
    Breadcrumb,
    ButtonModule,
    FormsModule,
    MultiSelect,
    DatePicker,
    DataTableComponent,
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css',
})
export class ItemsComponent {
  private router = inject(Router);
  items: MenuItem[] = [{ label: 'Items', routerLink: '/items' }];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  categoryOptions = [
    { name: 'Provision', value: 'Provision' },
    { name: 'Bonded', value: 'Bonded' },
    { name: 'Cabin Store', value: 'Cabin Store' },
    { name: 'Deck & Engine', value: 'Deck & Engine' },
    { name: 'Gas & Chemicals', value: 'Gas & Chemicals' },
    { name: 'Catering Services', value: 'Catering Services' },
  ];
  selectedCategory: string[] = [];
  selectedPurchaseDate!: string;

  columns = [
    { field: 'ID', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'IMBACode', header: 'IMBA' },
    { field: 'description', header: 'Description' },
    { field: 'unit', header: 'Unit' },
    { field: 'category', header: 'Category' },
    { field: 'lastPurchasePrice', header: 'Price/Unit' },
  ];

  itemsValue: Item[] = [
    {
      ID: 'ITEM-11923',
      name: 'Iphone',
      unit: 'piece',
      quantity: 10,
      description: 'A new Iphone 17 pro max 256GB, orange color',
      IMBACode: 1189211,
      category: 'Suppliers',
      defaultSupplier: 'Trade Line',
      lastPurchasePrice: 89000,
      purchaseHistory: [],
    },
  ];

  openNew() {
    this.router.navigate(['items/add']);
  }

  onSearch() {}

  onViewItem(item: Item) {
    this.router.navigate(['items/view', item.ID]);
  }

  handleEdit(expense: Item) {
    console.log(expense);
  }

  handleDelete(expense: Item) {
    console.log('Deleted ', expense);
  }

  handleBulkDelete(expenses: Item[]) {
    console.log('Deleted a bulk of expenses', expenses);
  }
}
