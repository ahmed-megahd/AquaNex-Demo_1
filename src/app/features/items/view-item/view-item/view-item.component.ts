import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Button } from 'primeng/button';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table/data-table.component';

@Component({
  selector: 'app-view-item',
  imports: [Breadcrumb, Button, DataTableComponent],
  standalone: true,
  templateUrl: './view-item.component.html',
  styleUrl: './view-item.component.css',
})
export class ViewItemComponent {
  items: MenuItem[] = [
    { label: 'Items', routerLink: '/items' },
    { label: 'View Item Detail' },
  ];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  purchaseHistoryColumns = [
    { field: 'PONumber', header: 'PO Number' },
    { field: 'supplier', header: 'Supplier Name' },
    { field: 'date', header: 'Date' },
    { field: 'unitPrice', header: 'Unit Price' },
    { field: 'quantity', header: 'Quantity' },
    { field: 'total', header: 'Total' },
  ];

  purchaseHistoryOrders: any[] = [
    {
      PONumber: 'PO-009-112',
      supplier: 'Boch',
      date: '27/10/2024',
      unitPrice: '1000',
      quantity: '4',
      total: '4000',
    },

    {
      PONumber: 'PO-009-113',
      supplier: 'Boch',
      date: '12/9/2025',
      unitPrice: '2000',
      quantity: '3',
      total: '6000',
    },

    {
      PONumber: 'PO-009-114',
      supplier: 'Amazon',
      date: '9/20/2025',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },
  ];

  supplierColumns = [
    { field: 'supplier', header: 'Supplier Name' },
    { field: 'phone', header: 'Phone' },
    { field: 'unitPrice', header: 'Price / Unit' },
  ];

  supplierOrders: any[] = [
    {
      supplier: 'Boch',
      phone: '009-112',
      unitPrice: '2024',
    },

    {
      supplier: 'Boch',
      phone: '009-113',
      unitPrice: '2025',
    },

    {
      supplier: 'Amazon',
      phone: '009-114',
      unitPrice: '2025',
    },
  ];

  salesOrdersColumns = [
    { field: 'SONumber', header: 'SO Number' },
    { field: 'customer', header: 'Customer' },
    { field: 'date', header: 'Date' },
    { field: 'unitPrice', header: 'Unit Price' },
    { field: 'quantity', header: 'Quantity' },
    { field: 'total', header: 'Total' },
  ];

  salesOrders: any[] = [
    {
      SONumber: 'PO-009-112',
      customer: 'Maersc LTD.',
      date: '27/10/2024',
      unitPrice: '1000',
      quantity: '4',
      total: '4000',
    },

    {
      SONumber: 'PO-009-113',
      customer: 'Hapag Loyd',
      date: '12/9/2025',
      unitPrice: '2000',
      quantity: '3',
      total: '6000',
    },

    {
      SONumber: 'PO-009-114',
      customer: 'Bahari Int.',
      date: '9/20/2025',
      unitPrice: '100',
      quantity: '50',
      total: '5000',
    },
  ];
}
