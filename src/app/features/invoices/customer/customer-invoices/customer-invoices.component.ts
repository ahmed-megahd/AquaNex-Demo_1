import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table/data-table.component';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Status } from '../../../../shared/models/menuItem.model';
import { DatePipe } from '@angular/common';
import { DatePicker } from 'primeng/datepicker';
import { TabsModule } from 'primeng/tabs';

import { CustomerInvoicesService, Invoice } from '../customer-invoices.service';

@Component({
  selector: 'app-customer-invoices',
  imports: [
    Breadcrumb,
    MultiSelectModule,
    ButtonModule,
    FormsModule,
    DataTableComponent,
    DatePicker,
    TabsModule,
  ],
  standalone: true,
  providers: [DatePipe],
  templateUrl: './customer-invoices.component.html',
})
export class CustomerInvoices implements OnInit {
  private router = inject(Router);
  private customerInvoiceService = inject(CustomerInvoicesService);

  items: MenuItem[] = [
    { label: 'Customer Invocies', routerLink: '/customers' },
  ];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  //Filtering properties
  creationDate: Date[] | undefined;

  purchaseOrder!: Status[];
  selectedPurchaseOrder!: Status;

  status!: Status[];
  selectedStatus!: Status;

  //Table columns
  columns = [
    { field: 'id', header: 'Invoice #' },
    { field: 'date', header: 'Date' },
    { field: 'customer', header: 'Customer' },
    // { field: 'vessel', header: 'Vessel' },
    // { field: 'quotationNo', header: 'Quotation #' },
    { field: 'linkedSO', header: 'Order Ref' },
    { field: 'dueDate', header: 'Due Date' },
    { field: 'amount', header: 'Amount' },
    { field: 'status', header: 'Status' },
    { field: 'remaining', header: 'Remaining' },
  ];

  invoices: Invoice[] = [];
  filteredInvoices: Invoice[] = [];

  tabs: { title: string; value: string }[] = [];

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.customerInvoiceService.getProducts().subscribe((data) => {
      this.invoices = data;
      this.filteredInvoices = [...this.invoices];
    });

    this.purchaseOrder = [
      { name: 'PO-009-998', value: 'PO-009-998' },
      { name: 'PO-1198-0092', value: 'PO-1198-0092' },
      { name: 'PO-009-0098', value: 'PO-009-0098' },
    ];

    this.status = [
      { name: 'Paid', value: 'Paid' },
      { name: 'Partial', value: 'Partial' },
      { name: 'Un-paid', value: 'Unpaid' },
    ];

    this.tabs = [
      { title: 'All', value: 'All' },
      { title: 'Paid', value: 'Paid' },
      { title: 'Partial', value: 'Partial' },
      { title: 'Un-paid', value: 'Un-paid' },
    ];
  }

  handleEdit(invoice: any) {
    console.log('Edit invoice', invoice);
    // Open modal or navigate to edit screen
  }

  handleDelete(invoice: any) {
    console.log('Delete invoice', invoice);
    // Show confirmation dialog, then delete
  }

  handleBulkDelete(invoices: any[]) {
    console.log('Delete selected invoices', invoices);
  }

  openNew() {
    this.router.navigate(['customer-invoices/create']);
  }

  onSearch() {
    console.log(this.creationDate);

    const creationFrom = this.datePipe.transform(
      this.creationDate?.[0],
      'MM/dd/yyyy',
    );
    const creationTo = this.datePipe.transform(
      this.creationDate?.[1],
      'MM/dd/yyyy',
    );

    console.log('Creation:', creationFrom, creationTo);
    // console.log(this.selectedPurchaseOrder.map((s) => s.value));
    // console.log(this.selectedStatus.map((p) => p.value));
    console.log(this.selectedPurchaseOrder.value);
    console.log(this.selectedStatus.value);
  }

  onTabChange(status: string) {
    if (status === 'All') {
      this.filteredInvoices = [...this.invoices];
    } else {
      this.filteredInvoices = this.invoices.filter(
        (order) => order.status === status,
      );
    }
  }

  onViewOrder(invoice: Invoice) {
    console.log(invoice.id);
    this.router.navigate(['customer-invoices/view', invoice.id]);
  }
}
