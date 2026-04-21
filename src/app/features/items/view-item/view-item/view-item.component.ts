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
import { DataTableComponent } from '../../../../shared/components/data-table/data-table/data-table.component';
import { TabsModule } from 'primeng/tabs';
import { ChartModule } from 'primeng/chart';
import { isPlatformBrowser } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-view-item',
  imports: [
    Breadcrumb,
    Button,
    DataTableComponent,
    TabsModule,
    ChartModule,
    ProgressBarModule,
  ],
  standalone: true,
  templateUrl: './view-item.component.html',
  styleUrl: './view-item.component.css',
})
export class ViewItemComponent implements OnInit {
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

  ngOnInit(): void {
    this.initChartOrdersTime();
    this.initChartPriceHistory();
    this.initChartSuppliers();
  }

  platformId = inject(PLATFORM_ID);
  cd = inject(ChangeDetectorRef);

  ////Usage Over Time Chart
  dataUsage: any;
  optionsUsage: any;

  initChartOrdersTime() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color',
      );

      this.dataUsage = {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        datasets: [
          {
            type: 'line',
            label: 'Orders',
            borderColor: documentStyle.getPropertyValue('--primary-color'),
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            data: [50, 25, 12, 48, 56, 76, 42, 9, 22, 23, 0, 10],
            backgroundColor: 'rgba(83, 113, 255, 0.1)',
            yAxisID: 'y', // Assign to left Y-axis

            // Point styling
            pointRadius: 5, // Size of points
            pointHoverRadius: 7, // Size when hovering
            pointBackgroundColor:
              documentStyle.getPropertyValue('--primary-color'),
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor:
              documentStyle.getPropertyValue('--primary-color'),
            pointStyle: 'circle', // 'circle', 'rect', 'rectRounded', 'triangle', 'star'
          },
        ],
      };

      this.optionsUsage = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,

        plugins: {
          legend: {
            labels: {
              color: textColor,
              font: {
                size: 14,
                weight: 'normal',
                family: 'Urbanist',
              },
              usePointStyle: true, // Use circular points instead of rectangles
              pointStyle: 'circle',
            },
            padding: {
              bottom: 20,
            },
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
              display: false,
            },
            ticks: {
              color: textColorSecondary,
              font: {
                size: 12,
                weight: '500',
                family: 'Urbanist',
              },
            },
            grid: {
              color: '#f8f8f8',
            },
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

  ////Usage Over Time Chart
  dataPrice: any;
  optionsPrice: any;

  initChartPriceHistory() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color',
      );

      this.dataPrice = {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        datasets: [
          {
            type: 'line',
            label: 'Pirce (LE)',
            borderColor: documentStyle.getPropertyValue('--p-orange-500'),
            borderWidth: 2,
            fill: true,
            backgroundColor: 'rgba(249, 115, 22,0.1)',
            tension: 0.4,
            data: [20, 25, 19, 19, 19, 16, 20, 19, 22, 23, 0, 19],
            yAxisID: 'y', // Assign to left Y-axis

            // Point styling
            pointRadius: 5, // Size of points
            pointHoverRadius: 7, // Size when hovering
            pointBackgroundColor:
              documentStyle.getPropertyValue('--p-orange-500'),
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor:
              documentStyle.getPropertyValue('--p-orange-500'),
            pointStyle: 'circle', // 'circle', 'rect', 'rectRounded', 'triangle', 'star'
          },
        ],
      };

      this.optionsPrice = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,

        plugins: {
          legend: {
            labels: {
              color: textColor,
              font: {
                size: 14,
                weight: 'normal',
                family: 'Urbanist',
              },
              usePointStyle: true, // Use circular points instead of rectangles
              pointStyle: 'circle',
            },
            padding: {
              bottom: 20,
            },
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
              display: false,
            },
            ticks: {
              color: textColorSecondary,
              font: {
                size: 12,
                weight: '500',
                family: 'Urbanist',
              },
            },
            grid: {
              color: '#f8f8f8',
            },
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

  //Supplier Donught Chart
  dataSuppliers: any;
  optionsSuppliers: any;

  initChartSuppliers() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.dataSuppliers = {
        labels: ['Boch', 'Siemens', 'Black & Decker'],
        datasets: [
          {
            data: [22, 9, 12],
            backgroundColor: [
              documentStyle.getPropertyValue('--p-cyan-500'),
              documentStyle.getPropertyValue('--p-orange-500'),
              documentStyle.getPropertyValue('--p-gray-500'),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--p-cyan-400'),
              documentStyle.getPropertyValue('--p-orange-400'),
              documentStyle.getPropertyValue('--p-gray-400'),
            ],
          },
        ],
      };

      this.optionsSuppliers = {
        maintainAspectRatio: false, // Important for centering
        aspectRatio: 1,
        cutout: '78%',
        plugins: {
          legend: {
            display: false,
          },
        },
      };
      this.cd.markForCheck();
    }
  }
}
