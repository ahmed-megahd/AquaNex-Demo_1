import {
  ChangeDetectorRef,
  Component,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Button } from 'primeng/button';
import { DataTableComponent } from '../../../shared/components/data-table/data-table/data-table.component';
import { TabsModule } from 'primeng/tabs';
import { MenuItem } from 'primeng/api';
import { ChartModule } from 'primeng/chart';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-view-customer',
  imports: [Breadcrumb, Button, DataTableComponent, TabsModule, ChartModule],
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

  //Revenue & Orders Trend Chart
  data: any;
  options: any;

  //Oustanding Balance Chart
  dataBalance: any;
  optionsBalance: any;

  //Orders Type
  dataType: any;
  optionsType: any;

  //Vessels Revenue
  dataVesselsRevenue: any;
  optionsVesselsRevenue: any;

  //Vessels Orders
  dataVesselsOrders: any;
  optionsVesselsOrders: any;

  //Vessels Activity Distribution
  dataVesselsActivity: any;
  optionsVesselsActivity: any;

  //Orders Over Time
  dataOrdersTime: any;
  optionsOrdersTime: any;

  platformId = inject(PLATFORM_ID);
  cd = inject(ChangeDetectorRef);

  ngOnInit() {
    this.initChart();
    this.initChartBalance();
    this.initChartType();
    this.initChartVesselsRevenue();
    this.initChartVesselsOrders();
    this.initChartVesselsActivity();
    this.initChartOrdersTime();
  }

  initChartBalance() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color',
      );
      const surfaceBorder = documentStyle.getPropertyValue(
        '--p-content-border-color',
      );

      this.dataBalance = {
        labels: [
          'Maersk-Landlord',
          'British Pride',
          'Monda Crystal',
          'April One',
          'Palace 4',
        ],
        datasets: [
          {
            type: 'bar', // Add this - specify it's a bar chart
            label: 'Balance', // Changed from 'Vessels' to be more descriptive
            backgroundColor: documentStyle.getPropertyValue('--danger-color'), // Add background color for bars
            // borderColor: documentStyle.getPropertyValue('--p-orange-600'), // Optional border
            borderWidth: 2,
            barThickness: 20,
            borderRadius: 8, // Rounded bars
            data: [5022, 225, 1112, 438, 526],
          },
        ],
      };

      this.optionsBalance = {
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
          tooltip: {
            // callbacks: {
            //   label: function(context) {
            //     return '$' + context.parsed.x.toLocaleString(); // Format as currency
            //   }
            // }
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
              // callback: function(value) {
              //   return '$' + value.toLocaleString(); // Format x-axis as currency
              // }
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

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color',
      );
      const surfaceBorder = documentStyle.getPropertyValue(
        '--p-content-border-color',
      );

      this.data = {
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
            borderColor: documentStyle.getPropertyValue('--p-orange-500'),
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            data: [50, 25, 12, 48, 56, 76, 42, 9, 22, 23, 0, 10],
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
          {
            type: 'bar',
            label: 'Revenue',
            backgroundColor: documentStyle.getPropertyValue('--primary-color'),
            data: [
              21000, 84000, 24000, 75000, 37000, 65000, 34000, 12000, 9000,
              22000, 0, 20000,
            ], // Use realistic revenue values
            borderColor: 'white',
            borderWidth: 2,
            barThickness: 20,
            borderRadius: 8, // Rounded top corners

            yAxisID: 'y1', // Assign to right Y-axis
          },
        ],
      };

      this.options = {
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
          // title: {
          //   display: true,
          //   text: 'Monthly Orders & Revenue',
          //   color: textColor,
          //   font: {
          //     size: 18,
          //     weight: '600',
          //     family: 'Urbanist',
          //   },
          //   padding: {
          //     top: 10,
          //     bottom: 20,
          //   },
          // },
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
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Revenue ($)',
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
              display: false,
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
            borderColor: documentStyle.getPropertyValue('--p-orange-500'),
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            data: [50, 25, 12, 48, 56, 76, 42, 9, 22, 23, 0, 10],
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

  initChartVesselsActivity() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color',
      );

      this.dataVesselsActivity = {
        labels: [
          'Maersk-Landlord',
          'Palace 4',
          'Mine Land',
          'King dune',
          'May Lord',
          'Atlantic 1',
          'Atlantic 2',
        ],
        datasets: [
          {
            type: 'bar',
            label: 'Orders',
            backgroundColor: documentStyle.getPropertyValue('--primary-color'),
            data: [21, 84, 24, 75, 37, 65, 34], // Use realistic revenue values
            borderColor: 'white',
            borderWidth: 2,
            barThickness: 20,
            borderRadius: 8, // Rounded top corners
          },
        ],
      };

      this.optionsVesselsActivity = {
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
            grid: {
              display: false,
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

  initChartType() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.dataType = {
        labels: ['Provision', 'Bonded', 'Cabin'],
        datasets: [
          {
            data: [540, 325, 702],
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

      this.optionsType = {
        maintainAspectRatio: false, // Important for centering
        aspectRatio: 1,
        cutout: '85%',
        plugins: {
          legend: {
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

  initChartVesselsRevenue() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color',
      );
      const surfaceBorder = documentStyle.getPropertyValue(
        '--p-content-border-color',
      );

      this.dataVesselsRevenue = {
        labels: [
          'Maersk-Landlord',
          'British Pride',
          'Monda Crystal',
          'April One',
          'Palace 4',
        ],
        datasets: [
          {
            type: 'bar', // Add this - specify it's a bar chart
            label: 'Revenue', // Changed from 'Vessels' to be more descriptive
            backgroundColor: documentStyle.getPropertyValue('--success-color'), // Add background color for bars
            // borderColor: documentStyle.getPropertyValue('--p-orange-600'), // Optional border
            borderWidth: 2,
            barThickness: 20,
            borderRadius: 8, // Rounded bars
            data: [5022, 4412, 3225, 2438, 1526],
          },
        ],
      };

      this.optionsVesselsRevenue = {
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
          tooltip: {},
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
              // callback: function(value) {
              //   return '$' + value.toLocaleString(); // Format x-axis as currency
              // }
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

  initChartVesselsOrders() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color',
      );
      const surfaceBorder = documentStyle.getPropertyValue(
        '--p-content-border-color',
      );

      this.dataVesselsOrders = {
        labels: [
          'Maersk-Landlord',
          'British Pride',
          'Monda Crystal',
          'April One',
          'Palace 4',
        ],
        datasets: [
          {
            type: 'bar', // Add this - specify it's a bar chart
            label: 'Balance', // Changed from 'Vessels' to be more descriptive
            backgroundColor: documentStyle.getPropertyValue('--primary-color'), // Add background color for bars
            // borderColor: documentStyle.getPropertyValue('--p-orange-600'), // Optional border
            borderWidth: 2,
            barThickness: 20,
            borderRadius: 8, // Rounded bars
            data: [22, 20, 12, 8, 6],
          },
        ],
      };

      this.optionsVesselsOrders = {
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
          tooltip: {
            // callbacks: {
            //   label: function(context) {
            //     return '$' + context.parsed.x.toLocaleString(); // Format as currency
            //   }
            // }
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
              // callback: function(value) {
              //   return '$' + value.toLocaleString(); // Format x-axis as currency
              // }
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
