import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Button } from 'primeng/button';
import { DataTableComponent } from '../../../shared/components/data-table/data-table/data-table.component';
import { MenuItem } from 'primeng/api';
import { TabsModule } from 'primeng/tabs';
import { ChartModule } from 'primeng/chart';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';

export interface AgingBucket {
  bucket: string;
  minDays: number;
  maxDays: number | null;
  amount: number;
  percentage: number;
  invoiceCount: number;
  severity: 'success' | 'warning' | 'danger' | 'critical';
}

@Component({
  selector: 'app-view-supplier',
  imports: [
    CommonModule,
    Breadcrumb,
    Button,
    DataTableComponent,
    TabsModule,
    ChartModule,
    ProgressBarModule,
    TableModule,
  ],
  standalone: true,
  templateUrl: './view-supplier.component.html',
  styleUrl: './view-supplier.component.css',
})
export class ViewSupplierComponent implements OnInit {
  items: MenuItem[] = [
    { label: 'Suppliers', routerLink: '/suppliers' },
    { label: 'View Supplier Information' },
  ];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  purchaseHistoryColumns = [
    { field: 'imba', header: 'IMBA' },
    { field: 'name', header: 'Name' },
    { field: 'unitPrice', header: 'Unit Price' },
    { field: 'quantity', header: 'Quantity' },
    { field: 'total', header: 'Total' },
    { field: 'date', header: 'Date' },
  ];

  purchaseHistoryOrders: any[] = [
    {
      imba: '009-112',
      name: 'HP Ink Jet',
      unitPrice: '1000',
      quantity: '4',
      total: '4000',
      date: '27/10/2024',
    },

    {
      imba: '009-112',
      name: 'HP Ink Jet',
      unitPrice: '2100',
      quantity: '3',
      total: '3300',
      date: '12/9/2025',
    },

    {
      imba: '1092-14',
      name: 'HP Mouse',
      unitPrice: '100',
      quantity: '5',
      total: '500',
      date: '9/20/2025',
    },
  ];

  purchaseColumns = [
    { field: 'ID', header: 'PO Number' },
    { field: 'issuedDate', header: 'Issued Date' },
    { field: 'deliveryDate', header: 'Delivery Date' },
    { field: 'invoice', header: 'Referenced Invoice' },
    { field: 'amount', header: 'Amount' },
    { field: 'status', header: 'Status' },
  ];

  purchaseOrders: any[] = [
    {
      ID: 'PO-119-0092',
      issuedDate: '27/12/2025',
      deliveryDate: '27/01/2026',
      amount: '2700 LE',
      invoice: 'SO-009-1172',
      status: 'Partially Paid',
    },
  ];

  invoicesColumns = [
    { field: 'ID', header: 'Invoice Number' },
    { field: 'date', header: 'Date' },
    { field: 'order', header: 'Order' },
    { field: 'total', header: 'Total Amount' },
    { field: 'status', header: 'Status' },
  ];

  supplierInvoices: any[] = [
    {
      ID: 'INV-009-112',
      date: '27/10/2024',
      order: 'PO-990-123',
      total: '4000',
      status: 'Paid',
    },

    {
      ID: 'INV-009-113',
      date: '12/9/2025',

      order: 'PO-190-223',
      total: '6000',
      status: 'Overdue',
    },

    {
      ID: 'INV-009-114',
      date: '9/20/2025',

      order: 'PO-220-123',
      total: '5000',
      status: 'Paid',
    },
  ];

  paymentsColumn = [
    { field: 'ID', header: 'Payment ID' },
    { field: 'date', header: 'Payment Date' },
    { field: 'amountPaid', header: 'Amount Paid' },
    { field: 'linkedInvoice', header: 'Linked Invoice' },
  ];

  payments: any[] = [
    {
      ID: 'PY-009-112',
      date: '27/10/2024',
      amountPaid: '4000',
      linkedInvoice: 'INV-009-112',
    },

    {
      ID: 'PY-009-113',
      date: '12/9/2025',
      amountPaid: '6000',
      linkedInvoice: 'INV-009-112',
    },

    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
    {
      ID: 'PY-009-114',
      date: '9/20/2025',
      amountPaid: '5000',
      linkedInvoice: 'INV-009-112',
    },
  ];

  //Aging Summary
  agingBuckets: AgingBucket[] = [];
  totalAmount = 0;
  totalInvoices = 0;

  initAgingData() {
    const rawData = [
      {
        bucket: '0–30 Days',
        minDays: 0,
        maxDays: 30,
        amount: 50000,
        invoiceCount: 6,
      },
      {
        bucket: '31–60 Days',
        minDays: 31,
        maxDays: 60,
        amount: 35000,
        invoiceCount: 4,
      },
      {
        bucket: '61–90 Days',
        minDays: 61,
        maxDays: 90,
        amount: 40000,
        invoiceCount: 3,
      },
      {
        bucket: '90+ Days',
        minDays: 91,
        maxDays: null,
        amount: 75000,
        invoiceCount: 5,
      },
    ];

    this.totalAmount = rawData.reduce((sum, r) => sum + r.amount, 0);
    this.totalInvoices = rawData.reduce((sum, r) => sum + r.invoiceCount, 0);

    this.agingBuckets = rawData.map((r) => ({
      ...r,
      percentage: +((r.amount / this.totalAmount) * 100).toFixed(1),
      severity: this.getSeverity(r.bucket),
    }));
  }

  getSeverity(bucket: string): AgingBucket['severity'] {
    switch (bucket) {
      case '0–30 Days':
      case 'On-time':
        return 'success';
      case '31–60 Days':
        return 'warning';
      case '61–90 Days':
      case 'Late':
        return 'danger';
      case '90+ Days':
        return 'critical';
      default:
        return 'success';
    }
  }

  ngOnInit(): void {
    this.initChartInvoicesStatus();
    this.initAgingData();
    this.initChartPurchasePaymentsTrend();
    this.initChartOrdersTime();
  }

  //CHARTS PROPERTIES
  platformId = inject(PLATFORM_ID);
  cd = inject(ChangeDetectorRef);

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
          },
        ],
      };

      this.optionsInvoicesStatus = {
        maintainAspectRatio: false,
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

  //PURCHASES VS PAYMENTS TREND
  dataPurchasePaymentsTrend: any;
  optionsPurchasePaymentsTrend: any;

  initChartPurchasePaymentsTrend() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color',
      );

      this.dataPurchasePaymentsTrend = {
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
            label: 'Purchases',
            borderColor: documentStyle.getPropertyValue('--primary-color'),
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            data: [
              2222, 2115, 2212, 4338, 5333, 7116, 4222, 1119, 2322, 1223, 2130,
              3210,
            ],

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

          {
            type: 'line',
            label: 'Payments',
            borderColor: documentStyle.getPropertyValue('--success-color'),
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            data: [
              1222, 1115, 2212, 5338, 3336, 7116, 4522, 111, 2222, 1122, 2130,
              1210,
            ],

            // Point styling
            pointRadius: 5, // Size of points
            pointHoverRadius: 7, // Size when hovering
            pointBackgroundColor:
              documentStyle.getPropertyValue('--success-color'),
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor:
              documentStyle.getPropertyValue('--success-color'),
            pointStyle: 'circle', // 'circle', 'rect', 'rectRounded', 'triangle', 'star'
          },
        ],
      };

      this.optionsPurchasePaymentsTrend = {
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

  recentDeliveries = [
    {
      PO: 'PO-009-123',
      deliveryDate: '18 FEB',
      actualDelivery: '18 FEB',
      status: 'On-time',
    },
    {
      PO: 'PO-009-023',
      deliveryDate: '28 FEB',
      actualDelivery: '30 FEB',
      status: 'Late',
    },
    {
      PO: 'PO-119-123',
      deliveryDate: '18 MAR',
      actualDelivery: '18 MAR',
      status: 'On-time',
    },
  ];

  //Orders Over Time
  dataOrdersTime: any;
  optionsOrdersTime: any;

  initChartOrdersTime() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color',
      );

      this.dataOrdersTime = {
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

            backgroundColor: 'rgba(83, 113, 255, 0.1)',
            tension: 0.4,
            data: [50, 25, 12, 48, 56, 76, 42, 9, 22, 23, 0, 10],
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

      this.optionsOrdersTime = {
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
                size: 14,
                weight: '600',
                family: 'Urbanist',
              },
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
}
