import { Component } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Button } from 'primeng/button';
import { DataTableComponent } from '../../../shared/components/data-table/data-table/data-table.component';
import { MenuItem } from 'primeng/api';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-view-purchase',
  imports: [Breadcrumb, Button, DataTableComponent, TabsModule],
  standalone: true,
  templateUrl: './view-purchase.component.html',
  styleUrl: './view-purchase.component.css',
})
export class ViewPurchaseComponent {
  items: MenuItem[] = [
    { label: 'Purchasing', routerLink: '/purchase-orders' },
    { label: 'Purchase Order' },
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
}
