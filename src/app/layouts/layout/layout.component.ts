import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { menuItem } from '../../shared/models/menuItem.model';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    InputTextModule,
    InputIcon,
    IconField,
    RouterOutlet,
  ],
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  hovered: any = null;
  searchTerm = '';
  items: menuItem[] = [
    {
      icon: 'pi pi-desktop',
      label: 'Dashboard',
      children: [
        { label: 'overview', icon: 'pi pi-home', route: '/home' },
        { label: 'Recent Activity', icon: 'pi pi-play', route: '/activity' },
        { label: 'KPIs / Charts', icon: 'pi pi-chart-bar', route: '/charts' },
      ],
    },

    {
      icon: 'pi pi-bolt',
      label: 'Sales',
      children: [
        {
          label: 'Sales orders',
          icon: 'pi pi-credit-card',
          route: '/sales-orders',
        },
        {
          label: 'Customer Invoices',
          icon: 'pi pi-receipt',
          route: '/invoice',
        },
        {
          label: 'Sales Reports',
          icon: 'pi pi-chart-bar',
          route: '/charts-sale',
        },
      ],
    },

    {
      icon: 'pi pi-shopping-cart',
      label: 'Purchasing',
      children: [
        {
          label: 'Purchasing orders',
          icon: 'pi pi-shopping-bag ',
          route: '/purchase-orders',
        },
        {
          label: 'Supplier Invoices',
          icon: 'pi pi-receipt',
          route: '/supplier-invocies',
        },
        {
          label: 'Purchasing Reports',
          icon: 'pi pi-chart-bar',
          route: '/charts-sale',
        },
      ],
    },
    {
      icon: 'pi pi-dollar',
      label: 'Finance',
      children: [
        {
          label: 'Payments Recieved',
          icon: 'pi pi-plus-circle',
          route: '/payments',
        },
        {
          label: 'Payments Made',
          icon: 'pi pi-minus-circle',
          route: '/invoice',
        },
        {
          label: 'Expenses',
          icon: 'pi pi-money-bill',
          route: '/expenses',
        },
        {
          label: 'Financial Summary',
          icon: 'pi pi-gauge',
          route: '/charts-sale',
        },
      ],
    },
    {
      icon: 'pi pi-warehouse',
      label: 'Inventory',
      children: [
        {
          label: 'Items Management',
          icon: 'pi pi-objects-column',
          route: '/items',
        },
        {
          label: 'Stock Levels',
          icon: 'pi pi-shop',
          route: '/invoice',
        },
        {
          label: 'Reorder Alerts',
          icon: 'pi pi-exclamation-circle',
          route: '/charts-sale',
        },
      ],
    },
    {
      icon: 'pi pi-users',
      label: 'Customers',
      children: [
        {
          label: 'Customers Profiles',
          icon: 'pi pi-briefcase',
          route: '/customers',
        },
        {
          label: 'Vessels Management',
          icon: 'pi pi-compass',
          route: '/vessels',
        },
        {
          label: 'Customers Analysis',
          icon: 'pi pi-chart-pie',
          route: '/invoice',
        },
      ],
    },
    {
      icon: 'pi pi-sitemap',
      label: 'Suppliers',
      children: [
        {
          label: 'Supplier Profiles',
          icon: 'pi pi-shop',
          route: '/suppliers',
        },
        {
          label: 'Purchase History',
          icon: 'pi pi-history',
          route: '/invoice',
        },
        {
          label: 'Pricing Logs',
          icon: 'pi pi-tags',
          route: '/invoice',
        },
      ],
    },
    {
      icon: 'pi  pi-clipboard',
      label: 'Reports',
      children: [
        {
          label: 'Sales & Purchase Summary',
          icon: 'pi pi-table',
          route: '/purchasing',
        },
        {
          label: 'Profit by Customer',
          icon: 'pi pi-chart-line',
          route: '/invoice',
        },
        {
          label: 'Expenses Breakdown',
          icon: 'pi pi-list',
          route: '/invoice',
        },
      ],
    },
    {
      icon: 'pi  pi-cog',
      label: 'Settings',
      children: [
        {
          label: 'Users & Roles',
          icon: 'pi pi-user',
          route: '/purchasing',
        },
        {
          label: 'System Configuration',
          icon: 'pi pi-microchip-ai',
          route: '/invoice',
        },
        {
          label: 'Audit Logs',
          icon: 'pi pi-lock',
          route: '/invoice',
        },
      ],
    },
  ];
}
