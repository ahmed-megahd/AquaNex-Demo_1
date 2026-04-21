import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Button } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table/data-table.component';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-view-sales',
  imports: [
    CardModule,
    Breadcrumb,
    Button,
    TabsModule,
    DataTableComponent,
    TimelineModule,
    DecimalPipe,
  ],
  standalone: true,
  templateUrl: './view-sales.component.html',
  styleUrl: './view-sales.component.css',
})
export class ViewSalesComponent {
  private router = inject(Router);
  events: any[] = [
    {
      status: 'Ordered',
      date: '15/10/2020 ',
      icon: 'pi pi-shopping-cart',
      // color: '#9C27B0',
    },
    {
      status: 'Processing',
      date: '15/10/2020 ',
      icon: 'pi pi-cog',
      // color: '#673AB7',
    },
    {
      status: 'Shipped',
      date: '15/10/2020 ',
      icon: 'pi pi-shopping-cart',
      // color: '#FF9800',
    },
    {
      status: 'Delivered',
      date: '16/10/2020 ',
      icon: 'pi pi-check',
      // color: '#607D8B',
    },
    {
      status: 'Paid',
      date: '26/10/2020 ',
      icon: 'pi pi-verified',
      // color: '#607D8B',
    },
  ];
  items: MenuItem[] = [
    { label: 'Sales', routerLink: '/sales-orders' },
    { label: 'Sales Order' },
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

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },

    {
      itemName: 'Tomato pack',
      description: 'A 10kg tomato pack, sealed',
      unit: 'pack',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
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

  linkedPOsColumns = [
    { field: 'id', header: 'Purchase Order ID' },
    { field: 'date', header: 'Date' },
    { field: 'status', header: 'Status' },
  ];

  purchaseOrders: any[] = [
    {
      id: 'PO-11928-110',
      date: '25/03/2020',
      status: 'Closed',
    },
  ];

  invoiceColumn = [
    { field: 'invoiceID', header: 'Invoice ID' },
    { field: 'date', header: 'Creation Date' },
    { field: 'issueDate', header: 'Invoice Due Date' },
    { field: 'invoiceTotal', header: 'Invoice Total' },
    { field: 'status', header: 'Status' },
  ];

  invoice: any[] = [
    {
      invoiceID: 'INV-11928-110',
      date: '25/03/2020',
      issueDate: '25/04/2020',
      invoiceTotal: '1000USD',
      status: 'Un-paid',
    },
  ];

  deliveryNoteColumn = [
    { field: 'ID', header: 'Note ID' },
    { field: 'date', header: 'Creation Date' },
    { field: 'deliveryDate', header: 'Delivery Date' },
    { field: 'address', header: 'Shipping Address' },
    { field: 'status', header: 'Status' },
  ];

  deliveryNote: any[] = [
    {
      ID: 'DN-11928-110',
      date: '25/03/2020',
      deliveryDate: '17/03/2020',
      address: 'Suez Port, Dock Yard',
      status: 'Delivered',
    },
  ];

  //   get statusNote(): string {
  //   switch (this.order.status) {
  //     case 'draft':     return 'This order has not been confirmed yet. Review and submit when ready.';
  //     case 'confirmed': return 'Order confirmed and awaiting supplier processing.';
  //     case 'shipped':   return 'Items are in transit. Expected delivery in 3–5 working days.';
  //     case 'invoiced':  return 'Invoice issued. Awaiting payment confirmation.';
  //     default:          return '';
  //   }
  // }

  onCreateInvoice() {
    this.router.navigate(['customer-invoices/create']);
  }
}
