import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DataTableComponent } from '../../../shared/components/data-table/data-table/data-table.component';
import { Router } from '@angular/router';
import { CustomersService } from '../customers.service';
import { MenuItem } from 'primeng/api';
import { Status } from '../../../shared/models/menuItem.model';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    Breadcrumb,
    MultiSelectModule,
    ButtonModule,
    FormsModule,
    TabsModule,
    DataTableComponent,
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent implements OnInit {
  private router = inject(Router);
  private customersService = inject(CustomersService);

  items: MenuItem[] = [{ label: 'Customers', routerLink: '/customers' }];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  //Filtering properties
  customerType!: Status[];
  selectedCustomerType!: Status;

  customerStatus!: Status[];
  selectedCustomerStatus!: Status;

  customerCountry!: Status[];
  selectedCustomerCountry!: Status;

  accountManager!: Status[];
  selectedAccountManager!: Status;

  customers: any[] = [];
  filteredCustomers: any[] = [];

  tabs: { title: string; value: string }[] = [];

  columns = [
    { field: 'ID', header: 'ID' },
    { field: 'name', header: 'Customer' },
    { field: 'type', header: 'Type' },
    { field: 'ships', header: 'Total Ships' },
    { field: 'totalSOs', header: 'Total SOs' },
    { field: 'totalInvoices', header: 'Total Invoices' },
    { field: 'outstandingBalance', header: 'Outstanding Balance' },
    { field: 'contact', header: 'Contact ' },
    // { field: 'email', header: 'Email' },
  ];

  ngOnInit(): void {
    this.customersService.getProducts().subscribe((data) => {
      this.customers = data;
      this.filteredCustomers = [...this.customers];
    });
    this.customerType = [
      { name: 'All', value: 'All' },
      { name: 'Ship Owner', value: 'Owner' },
      { name: 'Ship Manager', value: 'Manager' },
    ];

    this.customerStatus = [
      { name: 'Active', value: 'Active' },
      { name: 'In-Active', value: 'Inactive' },
    ];

    this.customerCountry = [
      { name: 'China', value: 'China' },
      { name: 'Panama', value: 'Panama' },
      { name: 'Germany', value: 'Germany' },
    ];

    this.accountManager = [
      { name: 'Bedo Rashad', value: 'Bedo-Rashad' },
      { name: 'Ahmed Hesham', value: 'Ahmed-Hesham' },
    ];

    this.tabs = [
      { title: 'All', value: 'All' },
      { title: 'Ship Owner', value: 'Owner' },
      { title: 'Ship Manager', value: 'Manager' },
    ];
  }

  openNew() {
    this.router.navigate(['customers/create']);
  }

  onSearch() {
    console.log(this.selectedCustomerType);
    console.log(this.selectedCustomerStatus);
    console.log(this.selectedCustomerCountry);
    console.log(this.selectedAccountManager);
  }

  onTabChange(type: string) {
    if (type === 'All') {
      this.filteredCustomers = [...this.customers];
    } else {
      this.filteredCustomers = this.customers.filter(
        (cst) => cst.type === type
      );
    }
  }

  handleEdit(customer: any) {
    console.log('Edit customer', customer);
    // Open modal or navigate to edit screen
  }

  handleDelete(customer: any) {
    console.log('Delete customer', customer);
    // Show confirmation dialog, then delete
  }

  handleBulkDelete(customers: any[]) {
    console.log('Delete selected customers', customers);
  }

  onViewCustomer(customer: any) {
    console.log(customer);
    this.router.navigate(['customers/view', customer.ID]);
  }
}
