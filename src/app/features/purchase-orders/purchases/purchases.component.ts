import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { Status } from '../../../shared/models/menuItem.model';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePipe } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { DataTableComponent } from '../../../shared/components/data-table/data-table/data-table.component';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-purchases',
  imports: [
    DataTableComponent,
    Breadcrumb,
    ButtonModule,
    DatePicker,
    FormsModule,
    MultiSelectModule,
    TabsModule,
  ],
  providers: [DatePipe],
  standalone: true,
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.css',
})
export class PurchasesComponent implements OnInit {
  private router = inject(Router);
  private datePipe = inject(DatePipe);
  private purchaseService = inject(PurchaseService);
  items: MenuItem[] = [{ label: 'Purchasing', routerLink: '/purchase-orders' }];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  tabs: { title: string; value: string }[] = [];

  creationDate: Date[] | undefined;
  rangeDates: Date[] | undefined;

  orderCategory!: Status[];

  orderStatus!: Status[];
  paymentStatus!: Status[];

  selectedCategory!: Status[];
  selectedStatus!: Status[];
  selectedPaymentStatus!: Status[];

  orders: any[] = [];
  filteredOrders: any[] = [];

  columns = [
    { field: 'orderNumber', header: 'ID' },
    { field: 'employee', header: 'Employee' },
    { field: 'date', header: ' Date' },
    { field: 'supplier', header: 'Supplier' },
    { field: 'deliveryDate', header: 'Delivery Date' },
    { field: 'items', header: 'Items' },
    { field: 'total', header: 'Total Amount' },
    { field: 'status', header: 'Status' },
    { field: 'paymentStatus', header: 'Payment Status' },
  ];

  ngOnInit(): void {
    this.purchaseService.getProducts().subscribe((data) => {
      this.orders = data;
      this.filteredOrders = [...this.orders];
    });
    this.orderCategory = [
      { name: 'All', value: 'All' },
      { name: 'Provision', value: 'Provision' },
      { name: 'Bonded', value: 'Bonded' },
      { name: 'Cabin', value: 'Cabin' },
      { name: 'Gas & Chemicals', value: 'Gas & Chemicals' },
      { name: 'Deck & Engine', value: 'Deck & Engine' },
      { name: 'Catering Services', value: 'Catering Services' },
      { name: 'Other', value: 'Other' },
    ];
    this.orderStatus = [
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

  openNew() {
    this.router.navigate(['purchase-orders/create']);
  }

  onSearch() {
    console.log(this.creationDate);
    console.log(this.rangeDates);

    const creationFrom = this.datePipe.transform(
      this.creationDate?.[0],
      'MM/dd/yyyy'
    );
    const creationTo = this.datePipe.transform(
      this.creationDate?.[1],
      'MM/dd/yyyy'
    );

    const deliveryFrom = this.datePipe.transform(
      this.rangeDates?.[0],
      'MM/dd/yyyy'
    );
    const deliveryTo = this.datePipe.transform(
      this.rangeDates?.[1],
      'MM/dd/yyyy'
    );

    console.log('Creation:', creationFrom, creationTo);
    console.log('Delivery:', deliveryFrom, deliveryTo);
    console.log(this.selectedStatus.map((s) => s.value));
    console.log(this.selectedPaymentStatus.map((p) => p.value));
    console.log(this.selectedCategory.map((s) => s.value));
  }

  onTabChange(status: string) {
    if (status === 'All') {
      this.filteredOrders = [...this.orders];
    } else {
      this.filteredOrders = this.orders.filter(
        (order) => order.status === status
      );
    }
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

  onViewOrder(order: any) {
    console.log(order.id);
    this.router.navigate(['purchase-orders/view', order.id]);
  }
}
