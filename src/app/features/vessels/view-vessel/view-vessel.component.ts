import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Button } from 'primeng/button';
import { DataTableComponent } from '../../../shared/components/data-table/data-table/data-table.component';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-view-vessel',
  imports: [Breadcrumb, Button, DataTableComponent, TabsModule],
  standalone: true,
  templateUrl: './view-vessel.component.html',
})
export class ViewVesselComponent {
  items: MenuItem[] = [
    { label: 'Vessel', routerLink: '/vessels' },
    { label: 'Vessel Profile' },
  ];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  salesOrdersColumns = [
    { field: 'id', header: ' ID' },
    { field: 'deliveryDate', header: 'Delivery Date' },
    { field: 'quotation', header: 'Quotaion #' },
    { field: 'status', header: 'Status' },
    { field: 'amount', header: 'Amount' },
  ];

  salesOrders: any[] = [
    {
      id: 'SO-11928-110',
      deliveryDate: '25/03/2020',
      quotation: 'Q-2503-2020',
      status: 'Closed',
      amount: '1900 USD',
    },
  ];

  invoiceColumn = [
    { field: 'invoiceID', header: ' ID' },
    { field: 'date', header: 'Creation Date' },
    { field: 'salesOrder', header: 'Order' },
    { field: 'issueDate', header: ' Due Date' },
    { field: 'invoiceTotal', header: ' Total' },
    { field: 'status', header: 'Status' },
  ];

  invoices: any[] = [
    {
      invoiceID: 'INV-11928-110',
      date: '25/03/2020',
      salesOrder: 'SO-1190-199',
      issueDate: '25/04/2020',
      invoiceTotal: '1000USD',
      status: 'Un-paid',
    },
  ];

  purchasesColumn = [
    { field: 'item', header: 'item' },
    { field: 'quantity', header: 'Qty' },
    { field: 'price', header: 'Price' },
    { field: 'date', header: 'Purchasing Date' },
  ];

  purchases: any[] = [
    {
      item: 'Low Fat Milk',
      quantity: '998',
      price: 110,
      date: '25/03/2020',
    },
  ];

  deliveryNoteColumn = [
    { field: 'ID', header: 'Note ID' },
    { field: 'items', header: 'Items' },
    { field: 'deliveryDate', header: 'Delivery Date' },
    { field: 'address', header: 'Shipping Address' },
    { field: 'status', header: 'Status' },
  ];

  deliveryNote: any[] = [
    {
      ID: 'DN-11928-110',
      items: '253',
      deliveryDate: '17/03/2020',
      address: 'Suez Port, Dock Yard',
      status: 'Delivered',
    },
  ];
}
