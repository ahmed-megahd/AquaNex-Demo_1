import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { Status } from '../../../shared/models/menuItem.model';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';
import { DataTableComponent } from '../../../shared/components/data-table/data-table/data-table.component';
import { SuppliersService } from '../suppliers.service';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [
    Breadcrumb,
    ButtonModule,
    MultiSelectModule,
    FormsModule,
    TabsModule,
    DataTableComponent,
  ],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css',
})
export class SuppliersComponent implements OnInit {
  private router = inject(Router);
  private suppliersService = inject(SuppliersService);
  items: MenuItem[] = [{ label: 'Suppliers', routerLink: '/suppliers' }];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  paymentStatus!: Status[];
  selectedPaymentStatus!: Status[];

  categories!: Status[];
  selectedCategories!: Status[];

  tabs: { title: string; value: string }[] = [];

  suppliers: any[] = [];
  filteredSuppliers: any[] = [];

  columns = [
    { field: 'supplierID', header: 'ID' },
    { field: 'name', header: 'Supplier' },
    { field: 'category', header: 'Category' },
    { field: 'itemsNo', header: 'Total Items' },
    { field: 'LastPO', header: 'Last PO' },
    { field: 'totalPOValue', header: 'Total POs Amount' },
    { field: 'payments', header: 'Payments' },
  ];

  ngOnInit(): void {
    this.suppliersService.getProducts().subscribe((data) => {
      this.suppliers = data;
      this.filteredSuppliers = [...this.suppliers];
    });
    this.paymentStatus = [
      { name: 'Paid', value: 'Paid' },
      { name: 'Partial', value: 'Partial' },
      { name: 'Un-paid', value: 'Unpaid' },
    ];

    this.categories = [
      { name: 'Provision', value: 'Provision' },
      { name: 'Bonded', value: 'Bonded' },
      { name: 'Cabin Store', value: 'Cabin' },
      { name: 'Deck & Engine', value: 'deck-engine' },
      { name: 'Gas & Chemicals', value: 'gas-chemicals' },
      { name: 'Catering Services', value: 'Catering' },
      { name: 'Other', value: 'Others' },
    ];

    this.tabs = [
      { title: 'All', value: 'All' },
      { title: 'Provision', value: 'Provision' },
      { title: 'Bonded', value: 'Bonded' },
      { title: 'Cabin Store', value: 'Cabin' },
      { title: 'Deck & Engine', value: 'deck-engine' },
      { title: 'Gas & Chemicals', value: 'gas-chemicals' },
      { title: 'Catering Services', value: 'Catering' },
      { title: 'Other', value: 'Others' },
    ];
  }

  openNew() {
    this.router.navigate(['suppliers/create']);
  }

  onSearch() {
    console.log(this.selectedPaymentStatus);
    console.log(this.selectedCategories);
  }

  onTabChange(category: string) {
    if (category === 'All') {
      this.filteredSuppliers = [...this.suppliers];
    } else {
      this.filteredSuppliers = this.suppliers.filter(
        (order) => order.category === category
      );
    }
  }

  handleEdit(supplier: any) {
    console.log('Edit supplier', supplier);
    // Open modal or navigate to edit screen
  }

  handleDelete(supplier: any) {
    console.log('Delete supplier', supplier);
    // Show confirmation dialog, then delete
  }

  handleBulkDelete(suppliers: any[]) {
    console.log('Delete selected suppliers', suppliers);
  }

  onViewSupplier(supplier: any) {
    console.log(supplier);
    this.router.navigate(['suppliers/view', supplier.supplierID]);
  }
}
