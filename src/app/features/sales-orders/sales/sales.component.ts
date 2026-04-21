import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';
import { TextareaModule } from 'primeng/textarea';
import { SalesOrder, SalesService } from '../sales.services';
import { DataTableComponent } from '../../../shared/components/data-table/data-table/data-table.component';
import { Status } from '../../../shared/models/menuItem.model';
import { TabsModule } from 'primeng/tabs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sales',
  imports: [
    CommonModule,
    DataTableComponent,
    TabsModule,
    FormsModule,
    Breadcrumb,
    RouterModule,
    ButtonModule,
    DatePicker,
    MultiSelectModule,
    InputTextModule,
    TextareaModule,
    RatingModule,
    IconFieldModule,
    InputIconModule,
  ],
  standalone: true,
  providers: [MessageService, ConfirmationService, DatePipe],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',
})
export class SalesComponent implements OnInit {
  private salesService = inject(SalesService);
  private router = inject(Router);
  salesOrders: any[] = [];
  loading = true;
  error = '';

  // orders$!: Observable<any[]>;
  items: MenuItem[] = [{ label: 'Sales', routerLink: '/sales' }];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  creationDate: Date[] | undefined;
  rangeDates: Date[] | undefined;

  salesOrderStatus!: Status[];
  paymentStatus!: Status[];

  selectedSalesStatus!: Status[];
  selectedPaymentStatus!: Status[];
  columns = [
    { field: 'orderNumber', header: 'ID' },
    { field: 'employee', header: 'Employee' },
    { field: 'customer', header: 'CST/VESSEL' },
    { field: 'deliveryDate', header: 'Delivery Date' },
    { field: 'items', header: 'Items' },
    { field: 'total', header: 'Total Amount' },
    { field: 'status', header: 'Order Status' },
    { field: 'paymentStatus', header: 'Payment Status' },
  ];

  tabs: { title: string; value: string }[] = [];
  orders: SalesOrder[] = [];
  filteredOrders: SalesOrder[] = [];

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    this.salesService.getProducts().subscribe((data) => {
      this.orders = data;
      this.filteredOrders = [...this.orders];
    });
    this.salesOrderStatus = [
      { name: 'Draft', value: 'Draft' },
      { name: 'In-progress', value: 'In-progress' },
      { name: 'Delivered', value: 'Delivered' },
      { name: 'Invoiced', value: 'Invoiced' },
      { name: 'Closed', value: 'Closed' },
    ];
    this.paymentStatus = [
      { name: 'Paid', value: 'Paid' },
      { name: 'Partial', value: 'Partial' },
      { name: 'Un-paid', value: 'Unpaid' },
    ];

    this.tabs = [
      { title: 'All', value: 'All' },
      { title: 'Draft', value: 'Draft' },
      { title: 'In Progress', value: 'In-progress' },
      { title: 'Delivered', value: 'Delivered' },
      { title: 'Invoiced', value: 'Invoiced' },
      { title: 'Closed', value: 'Closed' },
      { title: 'Cancelled', value: 'Cancelled' },
    ];
  }

  handleEdit(order: any) {
    console.log('Edit order', order);
    // Open modal or navigate to edit screen
  }

  handleDelete(order: any) {
    console.log('Delete order', order);
    // Show confirmation dialog, then delete
  }

  handleBulkDelete(orders: any[]) {
    console.log('Delete selected orders', orders);
  }

  openNew() {
    this.router.navigate(['sales-order/create']);
  }

  onSearch() {
    console.log(this.creationDate);
    console.log(this.rangeDates);

    const creationFrom = this.datePipe.transform(
      this.creationDate?.[0],
      'MM/dd/yyyy',
    );
    const creationTo = this.datePipe.transform(
      this.creationDate?.[1],
      'MM/dd/yyyy',
    );

    const deliveryFrom = this.datePipe.transform(
      this.rangeDates?.[0],
      'MM/dd/yyyy',
    );
    const deliveryTo = this.datePipe.transform(
      this.rangeDates?.[1],
      'MM/dd/yyyy',
    );

    console.log('Creation:', creationFrom, creationTo);
    console.log('Delivery:', deliveryFrom, deliveryTo);
    console.log(this.selectedSalesStatus.map((s) => s.value));
    console.log(this.selectedPaymentStatus.map((p) => p.value));
  }

  onTabChange(status: string) {
    if (status === 'All') {
      this.filteredOrders = [...this.orders];
    } else {
      this.filteredOrders = this.orders.filter(
        (order) => order.status === status,
      );
    }
  }

  onViewOrder(order: SalesOrder) {
    console.log(order.id);
    this.router.navigate(['sales-order/view', order.id]);
  }
}
