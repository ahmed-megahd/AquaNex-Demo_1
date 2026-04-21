import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Button } from 'primeng/button';
import { DataTableComponent } from '../../../shared/components/data-table/data-table/data-table.component';
import { TabsModule } from 'primeng/tabs';
import { ChartModule } from 'primeng/chart';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-view-vessel',
  imports: [Breadcrumb, Button, DataTableComponent, TabsModule, ChartModule],
  standalone: true,
  templateUrl: './view-vessel.component.html',
})
export class ViewVesselComponent implements OnInit {
  items: MenuItem[] = [
    { label: 'Vessel', routerLink: '/vessels' },
    { label: 'Vessel Profile' },
  ];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  salesOrdersColumns = [
    { field: 'id', header: ' SO Number' },
    { field: 'orderDate', header: 'Date' },
    { field: 'deliveryDate', header: 'Delivery Date' },
    { field: 'deliveryAddress', header: 'Delivery Address' },
    { field: 'quotation', header: 'Quotaion #' },
    { field: 'status', header: 'Status' },
    { field: 'amount', header: 'Amount' },
  ];

  salesOrders: any[] = [
    {
      id: 'SO-11928-110',
      orderDate: '25/03/2020',
      deliveryDate: '25/04/2020',
      deliveryAddress: 'Suez Port',
      quotation: 'Q1KL-2503-2020',
      status: 'Closed',
      amount: '$1900',
    },
  ];

  invoiceColumn = [
    { field: 'invoiceID', header: 'Invoice No' },
    { field: 'salesOrder', header: 'Order' },
    { field: 'date', header: 'Date' },
    { field: 'issueDate', header: ' Due Date' },
    { field: 'invoiceTotal', header: ' Total' },
    { field: 'invoiceBalance', header: 'Balance' },
    { field: 'status', header: 'Status' },
  ];

  invoices: any[] = [
    {
      invoiceID: 'INV-11928-110',
      date: '25/03/2020',
      salesOrder: 'SO-1190-199',
      issueDate: '25/04/2020',
      invoiceTotal: '$1000',
      invoiceBalance: '$200',
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
    { field: 'items', header: 'Items No' },
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

  ngOnInit(): void {
    this.initChartRevenueTime();
    this.initChartOrdersTime();
    this.initChartPortActivity();
    this.initChartInvoicesStatus();
    this.initChartOrdersCategory();
  }

  //Charts Properties
  platformId = inject(PLATFORM_ID);
  cd = inject(ChangeDetectorRef);

  //REVENUE TREND
  dataRevenueTrend: any;
  optionsRevenueTrend: any;

  initChartRevenueTime() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--dark-color-2');
      const textColorSecondary = documentStyle.getPropertyValue('--grey-color');

      this.dataRevenueTrend = {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            type: 'bar',
            label: 'Revenue',
            backgroundColor: 'rgba(83, 113, 255, 0.75)',
            borderWidth: 0,
            barThickness: 28,
            borderRadius: 6,
            data: [
              50222, 21115, 12212, 4338, 53336, 71116, 42222, 1119, 22322,
              11223, 12130, 113210,
            ],
            yAxisID: 'y1',
            order: 2,
          },
          {
            type: 'line',
            label: 'Gross Profit',
            borderColor: 'rgba(26, 158, 110, 1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            data: [
              12500, 5200, 3100, 1100, 13500, 18000, 10500, 280, 5600, 2800,
              3000, 28500,
            ],
            yAxisID: 'y',
            order: 1,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: 'rgba(26, 158, 110, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(26, 158, 110, 1)',
            pointStyle: 'circle',
          },
        ],
      };

      this.optionsRevenueTrend = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,

        plugins: {
          legend: {
            labels: {
              color: textColor,
              font: { size: 12, weight: 'normal', family: 'Urbanist' },
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 20,
            },
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const value = context.parsed.y;
                return ` ${context.dataset.label}: ${value.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`;
              },
            },
          },
        },

        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: { size: 12, weight: '500', family: 'Urbanist' },
            },
            grid: { display: false },
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Gross Profit (USD)',
              color: textColorSecondary,
              font: { size: 11, weight: '500', family: 'Urbanist' },
            },
            ticks: {
              color: textColorSecondary,
              font: { size: 11, weight: '500', family: 'Urbanist' },
              callback: (value: number) => `${(value / 1000).toFixed(0)}k`,
            },
            grid: { color: '#f8f8f8' },
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Revenue (USD)',
              color: textColorSecondary,
              font: { size: 11, weight: '500', family: 'Urbanist' },
            },
            ticks: {
              color: textColorSecondary,
              font: { size: 11, weight: '500', family: 'Urbanist' },
              callback: (value: number) => `${(value / 1000).toFixed(0)}k`,
            },
            grid: { display: false },
          },
        },

        interaction: {
          mode: 'index',
          intersect: false,
        },

        animation: {
          duration: 800,
          easing: 'easeInOutQuart',
        },
      };

      this.cd.markForCheck();
    }
  }

  //ORDERS TREND
  dataOrdersTrend: any;
  optionsOrdersTrend: any;
  ordersFilter: 'year' | '6M' | '3M' | 'all' = 'year';

  initChartOrdersTime() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--grey-color');
      const textColorSecondary = documentStyle.getPropertyValue('--grey-color');

      this.dataOrdersTrend = {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            type: 'line',
            label: 'Orders',
            borderColor: documentStyle.getPropertyValue('--grey-color'),
            borderWidth: 1.5,
            fill: false,
            borderDash: [5, 5],
            tension: 0.4,
            data: [22, 15, 12, 8, 36, 16, 22, 19, 32, 13, 11, 11],
            yAxisID: 'y', // Assign to left Y-axis

            // Point styling
            pointRadius: 5, // Size of points
            pointHoverRadius: 7, // Size when hovering
            pointBackgroundColor:
              documentStyle.getPropertyValue('--grey-color'),
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor:
              documentStyle.getPropertyValue('--grey-color'),
            pointStyle: 'circle', // 'circle', 'rect', 'rectRounded', 'triangle', 'star'
          },
        ],
      };

      this.optionsOrdersTrend = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,

        plugins: {
          legend: {
            display: false,
          },
        },

        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                size: 12,
                weight: '500',
                family: 'Urbanist',
              },
            },
            grid: {
              display: false,
            },
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Orders',
              color: textColor,
              font: {
                size: 11,
                weight: '600',
                family: 'Urbanist',
              },
            },
            ticks: {
              color: textColorSecondary,
              font: {
                size: 11,
                weight: '500',
                family: 'Urbanist',
              },
            },

            grid: { color: '#f8f8f8' },
          },
        },
        // Interaction options
        interaction: {
          mode: 'index', // 'point', 'nearest', 'index', 'dataset', 'x', 'y'
          intersect: false, // Show tooltip even when not hovering directly on point
        },

        // Animation
        animation: {
          duration: 1000, // Animation duration in ms
          easing: 'easeInOutQuart', // Animation easing
        },
      };

      this.cd.markForCheck();
    }
  }

  setOrdersTrendFilter(filter: 'year' | '6M' | '3M' | 'all') {
    this.ordersFilter = filter;
  }

  // PORT ACTIVITY
  dataPortActivity: any;
  optionsPortActivity: any;

  initChartPortActivity() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColorSecondary = documentStyle.getPropertyValue('--grey-color');

      this.dataPortActivity = {
        labels: ['Port Said', 'Alexandria', 'Fujairah', 'Jebel Ali', 'Piraeus'],
        datasets: [
          {
            label: 'Orders',
            backgroundColor: 'rgba(83, 113, 255, 0.75)',
            borderWidth: 0,
            barThickness: 24,
            borderRadius: 6,
            data: [18, 12, 8, 5, 3],
          },
        ],
      };

      this.optionsPortActivity = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context: any) => ` ${context.parsed.x} orders`,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: { size: 12, family: 'Urbanist' },
              stepSize: 1,
            },
            grid: { display: false },
          },
          y: {
            ticks: {
              color: textColorSecondary,
              font: { size: 12, family: 'Urbanist' },
            },
            grid: { display: false },
          },
        },
        animation: {
          duration: 600,
          easing: 'easeInOutQuart',
        },
      };

      this.cd.markForCheck();
    }
  }

  //INVOICE STATUS
  dataInvoicesStatus: any;
  optionsInvoicesStatus: any;

  initChartInvoicesStatus() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.dataInvoicesStatus = {
        labels: ['Paid', 'Pending', 'Overdue'],
        datasets: [
          {
            data: [540, 325, 702],
            backgroundColor: [
              documentStyle.getPropertyValue('--success-color'),
              documentStyle.getPropertyValue('--pending-color'),
              documentStyle.getPropertyValue('--danger-color'),
            ],

            borderWidth: 0,
            hoverOffset: 4,
          },
        ],
      };

      this.optionsInvoicesStatus = {
        maintainAspectRatio: false, // Important for centering
        aspectRatio: 1,
        cutout: '78%',
        plugins: {
          legend: {
            display: false,
            labels: {
              usePointStyle: true,
              color: textColor,
              font: {
                family: 'Urbanist',
              },
            },
          },
        },
      };
      this.cd.markForCheck();
    }
  }

  //ORDER CATEGORY
  dataOrdersCategory: any;
  optionsOrdersCategory: any;

  initChartOrdersCategory() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color',
      );
      const surfaceBorder = documentStyle.getPropertyValue(
        '--p-content-border-color',
      );

      this.dataOrdersCategory = {
        labels: ['Bonded Store', 'Provision', 'Catering Services'],
        datasets: [
          {
            type: 'bar', // Add this - specify it's a bar chart
            label: 'Balance', // Changed from 'Vessels' to be more descriptive
            backgroundColor: 'rgba(83, 113, 255, 0.75)', // Add background color for bars
            borderWidth: 0,
            barThickness: 24,
            borderRadius: 6,
            data: [22, 20, 12],
          },
        ],
      };

      this.optionsOrdersCategory = {
        indexAxis: 'y', // Horizontal bars
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            display: false, // Usually hide legend for single dataset
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,

              font: {
                size: 12,
                family: 'Urbanist',
                color: '--grey-color',
              },
            },
            grid: {
              display: false, // Cleaner look for horizontal bars
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
              font: {
                size: 12,
                family: 'Urbanist',
                color: '--grey-color',
              },
            },
            grid: {
              display: false, // Remove horizontal grid lines
            },
          },
        },
      };
      this.cd.markForCheck();
    }
  }
}
