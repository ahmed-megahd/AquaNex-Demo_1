import { Component, inject, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table/data-table.component';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Payment, PaymentsService } from '../../payments.service';
import { DatePicker } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inflow-payments',
  imports: [
    DataTableComponent,
    Breadcrumb,
    ButtonModule,
    DatePicker,
    MultiSelectModule,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './inflow-payments.component.html',
})
export class InflowPaymentsComponent implements OnInit {
  private router = inject(Router);
  private paymentsService = inject(PaymentsService);

  ngOnInit(): void {
    this.paymentsService.getProducts().subscribe((data) => {
      this.payments = data;
    });
  }

  items: MenuItem[] = [{ label: 'Inflow Payments' }];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  columns = [
    { field: 'id', header: 'ID' },
    { field: 'date', header: 'Date' },
    { field: 'vendor', header: 'Customer' },
    { field: 'invoiceNumber', header: 'Invoice Number' },
    { field: 'externalInvoice', header: 'Customer Invoice' },
    { field: 'amountPaid', header: 'Amount Paid' },
    { field: 'method', header: 'Payment Method' },
  ];

  payments: Payment[] = [];

  //FILTERS
  creationDate: Date[] | undefined;
  paymentMethod: string = '';

  paymentMethodOptions = [
    { name: 'Bank Transfer', value: 'Bank-Transfer' },
    { name: 'Wire Transfer', value: 'Wire-Transfer' },
    { name: 'Cash', value: 'Cash' },
    { name: 'Check', value: 'Check' },
    { name: 'Credit Card', value: 'Credit-Card' },
    { name: 'Online Payment', value: 'Online-Payment' },
  ];

  onSearch() {}

  openNew() {
    this.router.navigate(['inflow-payments/create']);
  }

  //ACTION METHODS

  onViewExpense(payment: Payment) {
    console.log(payment);
    // this.router.navigate(['payments/view', payment.ID]);
  }

  handleEdit(payment: Payment) {
    console.log(payment);
  }

  handleDelete(payment: Payment) {
    console.log('Deleted ', payment);
  }

  handleBulkDelete(payments: Payment[]) {
    console.log('Deleted a bulk of payments', payments);
  }
}
