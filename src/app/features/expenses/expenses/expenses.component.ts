import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { value } from '@primeuix/themes/aura/knob';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabsModule } from 'primeng/tabs';
import { DataTableComponent } from '../../../shared/components/data-table/data-table/data-table.component';
import { Router } from '@angular/router';
import { SelectModule } from 'primeng/select';

interface Expense {
  ID: string;
  date: string;
  description: string;
  category: string;
  subCategory: string;
  department: string;
  customer: string;
  paymentMethod: string;
  // vendorInvoice: string,
  // vendorAddress: string,
  // vendorEmail: string,
  // vendorPhone: string,
  relatedOrders: string[];
  total: number;
}

@Component({
  selector: 'app-expenses',
  imports: [
    DataTableComponent,
    Breadcrumb,
    ButtonModule,
    DatePicker,
    MultiSelectModule,
    FormsModule,
    TabsModule,
  ],
  standalone: true,
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
})
export class ExpensesComponent {
  private router = inject(Router);
  items: MenuItem[] = [{ label: 'Expenses' }];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  creationDate: Date[] | undefined;
  categorySelection: string = '';
  departmentSelection: string = '';
  categoryOptions = [
    { name: 'Utilities', value: 'Utilities' },
    {
      name: 'Rent & Property-Related Expenses',
      value: 'Rent & Property-Related Expenses',
    },
    { name: 'Salaries & Wages', value: 'Salaries & Wages' },
    { name: 'Logistics & Transportation', value: 'Logistics & Transportation' },
    {
      name: 'Office & Adminstrative Expenses',
      value: 'Office & Adminstrative Expenses',
    },
    { name: 'Insurance', value: 'Insurance' },
    { name: 'Taxes & Fees', value: 'Taxes & Fees' },
    { name: 'Repairs & Maintenance', value: 'Repairs & Maintenance' },
    { name: 'Professional Services', value: 'Professional Services' },
    { name: 'Marketing & Sales', value: 'Marketing & Sales' },
    { name: 'Training & Development', value: 'Training & Development' },
    { name: 'Travel Expenses', value: 'Travel Expenses' },
    {
      name: 'Compliance & Certifications',
      value: 'Compliance & Certifications',
    },
  ];
  departmentsOptions = [
    { name: 'Operations', value: 'Operations' },
    { name: 'Logistics & Transportation', value: 'Logistics & Transportation' },
    { name: 'Procurement', value: 'Procurement' },
    { name: 'Finance & Accounting', value: 'Finance & Accounting' },
    { name: 'HR', value: 'HR' },
    { name: 'Adminstration', value: 'Adminstration' },
    { name: 'Marketing & Sales', value: 'Marketing & Sales' },
    { name: 'IT', value: 'IT' },
  ];

  columns = [
    { field: 'ID', header: 'ID' },
    { field: 'description', header: 'Description' },
    { field: 'date', header: 'Expense Date' },
    { field: 'category', header: 'Category' },
    { field: 'subCategory', header: 'Sub Category' },
    { field: 'customer', header: 'Customer' },
    { field: 'relatedOrders', header: 'Linked PO / SO' },
    { field: 'total', header: 'Amount' },
  ];

  expenses: Expense[] = [
    {
      ID: 'EX-2025-103F',
      date: '25/10/2025',
      description: 'Paying electric bill by Mohamed Farouk',
      category: 'utilities',
      subCategory: 'Water',
      department: 'All',
      customer: 'Water Distripution Company',
      paymentMethod: 'Bank',
      relatedOrders: ['SO-2025-103F-90'],
      total: 12299,
    },

    {
      ID: 'EX-2024-313F',
      date: '25/10/2024',
      description: 'Purchasing a manager chair from IKEA',
      category: 'Office & Adminstrative Supplies',
      subCategory: 'Office Supplies',
      department: 'Purchasing',
      customer: 'IKEA',
      paymentMethod: 'Bank',
      relatedOrders: ['SO-2024-123F-90'],
      total: 1222,
    },
  ];
  openNew() {
    this.router.navigate(['expenses/create']);
  }

  onSearch() {}

  //ACTION METHODS

  onViewExpense(expense: Expense) {
    console.log(expense);
    this.router.navigate(['expenses/view', expense.ID]);
  }

  handleEdit(expense: Expense) {
    console.log(expense);
  }

  handleDelete(expense: Expense) {
    console.log('Deleted ', expense);
  }

  handleBulkDelete(expenses: Expense[]) {
    console.log('Deleted a bulk of expenses', expenses);
  }
}
