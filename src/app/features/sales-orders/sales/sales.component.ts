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
    { field: 'customer', header: 'CST/IMO' },
    { field: 'deliveryDate', header: 'Delivery Date' },
    { field: 'items', header: 'Items' },
    { field: 'total', header: 'Total Amount' },
    { field: 'status', header: 'Status' },
    { field: 'paymentStatus', header: 'Payment Status' },
  ];

  tabs: { title: string; value: string }[] = [];
  orders: SalesOrder[] = [];
  filteredOrders: SalesOrder[] = [];

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    // this.subscription = this.salesService.getAllSalesOrders().subscribe({
    //   next: (data) => {
    //     console.log('Fetched sales orders:', data);
    //     this.salesOrders = data;
    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     console.error('Error fetching sales orders:', err);
    //     this.error = 'Failed to load sales orders';
    //     this.loading = false;
    //   },
    // });

    // this.salesService.addSaleOrder({ assignedEmployee: 'Mohamed' });

    // console.log(this.orders$);
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
    console.log(this.selectedSalesStatus.map((s) => s.value));
    console.log(this.selectedPaymentStatus.map((p) => p.value));
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

  onViewOrder(order: SalesOrder) {
    console.log(order.id);
    this.router.navigate(['sales-order/view', order.id]);
  }

  // //table
  // productDialog: boolean = false;

  // products!: Product[];

  // product!: Product;

  // selectedProducts!: Product[] | null;

  // submitted: boolean = false;

  // statuses!: any[];

  // @ViewChild('dt') dt!: Table;

  // cols!: Column[];

  // exportColumns!: ExportColumn[];

  // constructor(
  //   private productService: ProductService,
  //   private messageService: MessageService,
  //   private confirmationService: ConfirmationService,
  //   private cd: ChangeDetectorRef
  // ) {
  //   this.cities = [
  //     { name: 'New York', code: 'NY' },
  //     { name: 'Rome', code: 'RM' },
  //     { name: 'London', code: 'LDN' },
  //     { name: 'Istanbul', code: 'IST' },
  //     { name: 'Paris', code: 'PRS' },
  //   ];

  //   this.paymentStatus = [
  //     { name: 'Unpaid' },
  //     { name: 'Partially Paid' },
  //     { name: 'Paid' },
  //   ];
  // }

  // onGlobalFilter(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   const value = input.value || '';
  //   this.dt.filterGlobal(value, 'contains');
  // }

  // exportCSV() {
  //   this.dt.exportCSV();
  // }

  // ngOnInit() {
  //   this.loadDemoData();
  // }

  // loadDemoData() {
  //   this.productService.getProducts().subscribe((data) => {
  //     this.products = data;
  //     this.cd.markForCheck();
  //   });

  //   this.statuses = [
  //     { label: 'INSTOCK', value: 'instock' },
  //     { label: 'LOWSTOCK', value: 'lowstock' },
  //     { label: 'OUTOFSTOCK', value: 'outofstock' },
  //   ];

  //   this.cols = [
  //     { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
  //     { field: 'name', header: 'Name' },
  //     { field: 'image', header: 'Image' },
  //     { field: 'price', header: 'Price' },
  //     { field: 'category', header: 'Category' },
  //   ];

  //   this.exportColumns = this.cols.map((col) => ({
  //     title: col.header,
  //     dataKey: col.field,
  //   }));
  // }

  // openNew() {
  //   this.product = {};
  //   this.submitted = false;
  //   this.productDialog = true;
  // }

  // editProduct(product: Product) {
  //   this.product = { ...product };
  //   this.productDialog = true;
  // }

  // deleteSelectedProducts() {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete the selected products?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     rejectButtonProps: {
  //       label: 'No',
  //       severity: 'secondary',
  //       variant: 'text',
  //     },
  //     acceptButtonProps: {
  //       severity: 'danger',
  //       label: 'Yes',
  //     },
  //     accept: () => {
  //       this.products = this.products.filter(
  //         (val) => !this.selectedProducts?.includes(val)
  //       );
  //       this.selectedProducts = null;
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Successful',
  //         detail: 'Products Deleted',
  //         life: 3000,
  //       });
  //     },
  //   });
  // }

  // hideDialog() {
  //   this.productDialog = false;
  //   this.submitted = false;
  // }

  // deleteProduct(product: Product) {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete ' + product.name + '?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     rejectButtonProps: {
  //       label: 'No',
  //       severity: 'secondary',
  //       variant: 'text',
  //     },
  //     acceptButtonProps: {
  //       severity: 'danger',
  //       label: 'Yes',
  //     },
  //     accept: () => {
  //       this.products = this.products.filter((val) => val.id !== product.id);
  //       this.product = {};
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Successful',
  //         detail: 'Product Deleted',
  //         life: 3000,
  //       });
  //     },
  //   });
  // }

  // findIndexById(id: string): number {
  //   let index = -1;
  //   for (let i = 0; i < this.products.length; i++) {
  //     if (this.products[i].id === id) {
  //       index = i;
  //       break;
  //     }
  //   }

  //   return index;
  // }

  // createId(): string {
  //   let id = '';
  //   var chars =
  //     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   for (var i = 0; i < 5; i++) {
  //     id += chars.charAt(Math.floor(Math.random() * chars.length));
  //   }
  //   return id;
  // }

  // getSeverity(status: string) {
  //   switch (status) {
  //     case 'INSTOCK':
  //       return 'success';
  //     case 'LOWSTOCK':
  //       return 'warn';
  //     case 'OUTOFSTOCK':
  //       return 'danger';
  //     default:
  //       return 'unknown';
  //   }
  // }

  // saveProduct() {
  //   this.submitted = true;

  //   if (this.product.name?.trim()) {
  //     if (this.product.id) {
  //       this.products[this.findIndexById(this.product.id)] = this.product;
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Successful',
  //         detail: 'Product Updated',
  //         life: 3000,
  //       });
  //     } else {
  //       this.product.id = this.createId();
  //       // this.product.image = 'product-placeholder.svg';
  //       this.products.push(this.product);
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Successful',
  //         detail: 'Product Created',
  //         life: 3000,
  //       });
  //     }

  //     this.products = [...this.products];
  //     this.productDialog = false;
  //     this.product = {};
  //   }
  // }
}
