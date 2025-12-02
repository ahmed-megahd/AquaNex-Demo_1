import { Component } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Button } from 'primeng/button';
import { DataTableComponent } from '../../../shared/components/data-table/data-table/data-table.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-view-supplier',
  imports: [Breadcrumb, Button, DataTableComponent],
  standalone: true,
  templateUrl: './view-supplier.component.html',
  styleUrl: './view-supplier.component.css',
})
export class ViewSupplierComponent {
  items: MenuItem[] = [
    { label: 'Suppliers', routerLink: '/suppliers' },
    { label: 'View Supplier Information' },
  ];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  purchaseHistoryColumns = [
    { field: 'imba', header: 'IMBA' },
    { field: 'name', header: 'Name' },
    { field: 'unitPrice', header: 'Unit Price' },
    { field: 'quantity', header: 'Quantity' },
    { field: 'total', header: 'Total' },
    { field: 'date', header: 'Date' },
  ];

  purchaseHistoryOrders: any[] = [
    {
      imba: '009-112',
      name: 'HP Ink Jet',
      unitPrice: '1000',
      quantity: '4',
      total: '4000',
      date: '27/10/2024',
    },

    {
      imba: '009-112',
      name: 'HP Ink Jet',
      unitPrice: '2100',
      quantity: '3',
      total: '3300',
      date: '12/9/2025',
    },

    {
      imba: '1092-14',
      name: 'HP Mouse',
      unitPrice: '100',
      quantity: '5',
      total: '500',
      date: '9/20/2025',
    },
  ];

  purchaseColumns = [
    { field: 'ID', header: 'PO Number' },
    { field: 'issuedDate', header: 'Issued Date' },
    { field: 'deliveryDate', header: 'Delivery Date' },
    { field: 'invoice', header: 'Referenced Invoice' },
    { field: 'amount', header: 'Amount' },
    { field: 'status', header: 'Status' },
  ];

  purchaseOrders: any[] = [
    {
      ID: 'PO-119-0092',
      issuedDate: '27/12/2025',
      deliveryDate: '27/01/2026',
      amount: '2700 LE',
      invoice: 'SO-009-1172',
      status: 'Partially Paid',
    },
  ];

  invoicesColumns = [
    { field: 'ID', header: 'Invoice Number' },
    { field: 'date', header: 'Date' },
    { field: 'total', header: 'Total Amount' },
    { field: 'status', header: 'Status' },
  ];

  supplierInvoices: any[] = [
    {
      ID: 'INV-009-112',
      date: '27/10/2024',
      total: '4000',
      status: 'Paid',
    },

    {
      ID: 'INV-009-113',
      date: '12/9/2025',
      total: '6000',
      status: 'Overdue',
    },

    {
      ID: 'INV-009-114',
      date: '9/20/2025',
      total: '5000',
      status: 'Paid',
    },
  ];

  paymentsColumn = [
    { field: 'ID', header: 'Payment ID' },
    { field: 'date', header: 'Payment Date' },
    { field: 'amountPaid', header: 'Amount Paid' },
    { field: 'linkedInvoice', header: 'Linked Invoice' },
  ];

  payments: any[] = [
    {
      ID: 'PY-009-112',
      date: '27/10/2024',
      amountPaid: '4000',
      linkedInvoice: 'INV-009-112',
    },

    {
      ID: 'PY-009-113',
      date: '12/9/2025',
      amountPaid: '6000',
      linkedInvoice: 'INV-009-112',
    },

    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
  ];
}
