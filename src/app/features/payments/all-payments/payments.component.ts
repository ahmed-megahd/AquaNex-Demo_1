import { Component, inject } from '@angular/core';
import { DataTableComponent } from '../../../shared/components/data-table/data-table/data-table.component';
import { FormsModule } from '@angular/forms';
import { Breadcrumb } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Payment, PaymentsService } from '../payments.service';
import { Status } from '../../../shared/models/menuItem.model';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    DataTableComponent,
    FormsModule,
    Breadcrumb,
    RouterModule,
    ButtonModule,
    DatePicker,
    MultiSelectModule,
    TableModule,

    SelectModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    TextareaModule,
    CommonModule,

    RatingModule,
    InputTextModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css',
})
export class PaymentsComponent {
  private paymentService = inject(PaymentsService);
  items: MenuItem[] = [
    { label: 'Sales' },
    { label: ' Sales Orders', routerLink: '/inputtext' },
  ];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  creationDate: Date[] | undefined;
  rangeDates: Date[] | undefined;

  paymentType!: Status[];
  paymentStatus!: Status[];
  // selectedCities!: City[];

  selectedPaymentType!: Status[];
  selectedPaymentStatus!: Status[];

  columns = [
    { field: 'id', header: 'ID' },
    { field: 'type', header: 'Payment Type' },
    { field: 'customer', header: 'Customer' },
    { field: 'date', header: 'Due Date' },
    { field: 'invoiceNumber', header: 'Invoice Number' },
    { field: 'customerInvoice', header: 'Customer Invoice' },
    { field: 'method', header: 'Payment Method' },
    { field: 'amountPaid', header: 'Total Paid' },
  ];

  payments: Payment[] = [];

  ngOnInit() {
    this.paymentService.getProducts().subscribe((data: Payment[]) => {
      this.payments = data;
    });
    this.paymentType = [
      { name: 'Customer', value: 'customer' },
      { name: 'Supplier', value: 'supplier' },
    ];
    this.paymentStatus = [
      { name: 'PAID', value: 'paid' },
      { name: 'PARTIAL', value: 'partial' },
      { name: 'UN-PAID', value: 'unpaid' },
    ];
  }

  onSearch() {
    console.log(this.creationDate);
    console.log(this.rangeDates);
    console.log(this.selectedPaymentType.map((s) => s.value));
    console.log(this.selectedPaymentStatus.map((p) => p.value));
  }

  openNew() {}

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
}
