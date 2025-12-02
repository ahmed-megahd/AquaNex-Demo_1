import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-view-expenses',
  imports: [Breadcrumb, Button],
  templateUrl: './view-expenses.component.html',
  styleUrl: './view-expenses.component.css',
})
export class ViewExpensesComponent {
  items: MenuItem[] = [
    { label: 'Expenses', routerLink: '/expenses' },
    { label: 'View Expense Detail' },
  ];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
}
