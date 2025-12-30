import { Component } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Button } from 'primeng/button';
import { DataTableComponent } from '../../../shared/components/data-table/data-table/data-table.component';
import { TabsModule } from 'primeng/tabs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-view-customer',
  imports: [Breadcrumb, Button, DataTableComponent, TabsModule],
  standalone: true,
  templateUrl: './view-customer.component.html',
})
export class ViewCustomerComponent {
  items: MenuItem[] = [
    { label: 'Customers', routerLink: '/customers' },
    { label: 'Customer Profile' },
  ];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  vesselssColumns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'imo', header: 'IMO Number' },
    { field: 'status', header: 'Status' },
    { field: 'type', header: 'Type' },
    { field: 'lastOrder', header: 'Last Order' },
    { field: 'orders', header: 'Orders' },
    // { field: 'income', header: 'incomes' },
  ];

  vessels: any[] = [
    {
      id: 'SH-11928-110',
      name: 'Sea Wheel ',
      imo: '2503020',
      status: 'Active',
      type: 'Cargo',
      lastOrder: '25/03/2022',
      orders: 12,
    },
  ];

  salesOrdersColumns = [
    { field: 'id', header: ' ID' },
    { field: 'vessel', header: 'Vessel' },
    { field: 'deliveryDate', header: 'Delivery Date' },
    { field: 'status', header: 'Status' },
    { field: 'amount', header: 'Amount' },
  ];

  salesOrders: any[] = [
    {
      id: 'SO-11928-110',
      vessel: 'Sea Wheel',
      deliveryDate: '25/03/2020',
      status: 'Closed',
      amount: '1900 USD',
    },
  ];

  invoiceColumn = [
    { field: 'invoiceID', header: ' ID' },
    { field: 'date', header: 'Creation Date' },
    { field: 'vessel', header: 'Vessel' },
    { field: 'salesOrder', header: 'Order' },
    { field: 'issueDate', header: ' Due Date' },
    { field: 'invoiceTotal', header: ' Total' },
    { field: 'status', header: 'Status' },
  ];

  invoices: any[] = [
    {
      invoiceID: 'INV-11928-110',
      date: '25/03/2020',
      vessel: 'Sea Wheel',
      salesOrder: 'SO-1190-199',
      issueDate: '25/04/2020',
      invoiceTotal: '1000USD',
      status: 'Un-paid',
    },
  ];

  paymentsColumn = [
    { field: 'ID', header: 'ID' },
    { field: 'vessel', header: 'Vessel' },
    { field: 'salesOrder', header: 'Order' },
    { field: 'amount', header: 'Amount' },
    { field: 'date', header: 'Payment Date' },
  ];

  payments: any[] = [
    {
      ID: 'DN-11928-110',
      vessel: 'Sea Wheel',
      salesOrder: 'SO-1109-998',
      amount: 110,
      date: '25/03/2020',
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
}
