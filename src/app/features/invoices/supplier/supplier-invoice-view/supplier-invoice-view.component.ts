import { Component, inject, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table/data-table.component';
import { TabsModule } from 'primeng/tabs';
import { DialogModule } from 'primeng/dialog';
import {
  InvoiceDocumentComponent,
  InvoiceDocumentModel,
} from '../../invoice-document/invoice-document.component';
import { InvoicePrintStore } from '../../invoice-print-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-invoice-view',
  standalone: true,
  imports: [
    DialogModule,
    Breadcrumb,
    ButtonModule,
    DataTableComponent,
    TabsModule,
    InvoiceDocumentComponent,
  ],
  templateUrl: './supplier-invoice-view.component.html',
})
export class SupplierInvoiceViewComponent {
  // private invoicePrintService = inject(InvoicePrintStore);
  private router = inject(Router);
  items: MenuItem[] = [
    { label: 'Supplier Invoices', routerLink: '/supplier-invoices' },
    { label: 'View Invoice' },
  ];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  itemsColumns = [
    { field: 'itemName', header: 'Item Name' },
    { field: 'description', header: 'Description' },
    { field: 'unit', header: 'Unit' },
    { field: 'unitPrice', header: 'Unit Price' },
    { field: 'quantity', header: 'Quantity' },
    { field: 'total', header: 'Total' },
  ];

  itemsOrders: any[] = [
    {
      itemName: 'iphone 17',
      description: 'New iphone from Amazon',
      unit: 'piece',
      unitPrice: '1000',
      quantity: '4',
      total: '4000',
    },

    {
      itemName: 'HP pro book',
      description: 'A Windows 11 pro, 256SSD with 13.1inch laptop ',
      unit: 'piece',
      unitPrice: '2000',
      quantity: '3',
      total: '6000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },
  ];

  paymentsColumns = [
    { field: 'ID', header: 'ID' },
    { field: 'date', header: 'Date' },
    { field: 'amount', header: 'Amount' },
    { field: 'method', header: 'Method' },
    // { field: 'quantity', header: 'Quantity' },
    // { field: 'total', header: 'Total' },
  ];

  payments: any[] = [
    {
      ID: 'PY-099-100',
      date: '25/01/2019',
      amount: '2400 LE',
      method: 'Cheque',
    },

    {
      ID: 'PY-099-101',
      date: '25/02/2019 ',
      amount: '30000 LE',
      method: 'Cash',
    },
  ];

  //Preview invoice logic
  invoicePreviewVisible = false;
  @ViewChild(InvoiceDocumentComponent)
  invoiceDocumentComponent!: InvoiceDocumentComponent;

  openInvoicePreview() {
    this.invoicePreviewVisible = true;
  }

  invoice: InvoiceDocumentModel = {
    id: 'INV-119-221',
    invoiceNumber: 'INV-119-221',
    date: '2025-01-25',
    dueDate: '2025-02-25',
    currency: 'USD',
    status: 'Partially Paid',

    supplier: {
      id: 'SUP-009',
      name: 'Amazon',
      taxId: 'SKEL-992-LK0',
      address: 'Seattle, USA',
    },

    poReference: 'PO-009-110',

    items: [
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
      {
        id: 'IT-01',
        name: 'Fresh Water',
        quantity: 10,
        unit: 'Ton',
        unitPrice: 100,
        total: 1000,
      },
    ],

    subtotal: 1000,
    delivery: 99,
    tax: 0,
    total: 1099,
  };

  printInvoice() {
    localStorage.setItem('print_invoice', JSON.stringify(this.invoice));

    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/print/invoice'], {
        queryParams: { type: 'supplier' },
      })
    );

    window.open(url, '_blank');
  }
}
