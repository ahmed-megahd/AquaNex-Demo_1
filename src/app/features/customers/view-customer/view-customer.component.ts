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
import {
  DatePipe,
  DecimalPipe,
  isPlatformBrowser,
  LowerCasePipe,
  NgClass,
} from '@angular/common';
import { Customer } from '../customers.service';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-view-customer',
  imports: [
    NgClass,
    Breadcrumb,
    Button,
    DataTableComponent,
    TabsModule,
    ChartModule,
    TableModule,
    DatePipe,
    DecimalPipe,
    LowerCasePipe,
  ],
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
    { field: 'type', header: 'Type' },
    { field: 'lastOrder', header: 'Last Order' },
    { field: 'orders', header: 'Orders' },
    { field: 'status', header: 'Status' },
    // { field: 'income', header: 'incomes' },
  ];

  vessels: any[] = [
    {
      id: 'SH-11928-110',
      name: 'Sea Wheel ',
      imo: '250302',
      status: 'Active',
      type: 'Cargo',
      lastOrder: '25/03/2022',
      orders: 12,
    },
    {
      id: 'SH-22928-110',
      name: 'Nord Stream',
      imo: '990320',
      status: 'Active',
      type: 'Bulk Carier',
      lastOrder: '15/03/2022',
      orders: 1,
    },
    {
      id: 'SH-33928-110',
      name: 'Wheel 2',
      imo: '331392',
      status: 'Active',
      type: 'Cargo',
      lastOrder: '25/03/2022',
      orders: 22,
    },
    {
      id: 'SH-41428-410',
      name: 'Sea 12 ',
      imo: '990309',
      status: 'Active',
      type: 'Cargo',
      lastOrder: '25/03/2022',
      orders: 6,
    },
    {
      id: 'SH-11928-888',
      name: 'lord nile ',
      imo: '666020',
      status: 'Active',
      type: 'Tanker',
      lastOrder: '25/01/2026',
      orders: 12,
    },
  ];

  // ORDERS
  salesOrdersColumns = [
    { field: 'id', header: 'SO Number' },
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
      amount: '$1900 ',
    },

    {
      id: 'SO-11128-110',
      vessel: 'Lions Wheel',
      deliveryDate: '5/03/2020',
      status: 'Closed',
      amount: '$2100 ',
    },

    {
      id: 'SO-11118-110',
      vessel: '30 North',
      deliveryDate: '25/04/2020',
      status: 'In-progress',
      amount: '$11900 ',
    },
  ];

  // INVOICES
  invoiceColumn = [
    { field: 'invoiceID', header: ' ID' },
    { field: 'salesOrder', header: 'SO Ref' },
    { field: 'vessel', header: 'Vessel' },
    { field: 'date', header: 'Date' },
    { field: 'issueDate', header: ' Due Date' },
    { field: 'invoiceTotal', header: ' Total' },
    { field: 'paidAmount', header: ' Paid' },
    { field: 'status', header: 'Status' },
  ];

  invoices: any[] = [
    {
      invoiceID: 'INV-11928-110',
      date: '25/03/2020',
      vessel: 'Sea Wheel',
      salesOrder: 'SO-1190-199',
      issueDate: '25/04/2020',
      invoiceTotal: '$1000',
      paidAmount: '$800',
      status: 'Un-paid',
    },
  ];
  // PAYMENTS
  paymentsColumn = [
    { field: 'ID', header: 'Payment ID' },
    { field: 'date', header: 'Date' },
    { field: 'amount', header: 'Amount' },
    { field: 'method', header: 'Method' },
    { field: 'invoiceRef', header: 'Linked Invoice' },
  ];

  payments: any[] = [
    {
      ID: 'DN-11928-110',
      invoiceRef: 'INV-1109-998',
      amount: '$9000',
      method: 'Bank Transfer',
      date: '25/03/2020',
    },
  ];
  // DELIVERY NOTES
  deliveryNoteColumn = [
    { field: 'ID', header: 'Note ID' },
    { field: 'date', header: 'Date' },
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

  //Vessels Profit
  dataVesselProfit: any;
  optionsVesselProfit: any;

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
    this.initChartVesselProfit();
    this.initChartType();
    this.initChartVessels();
    this.initChartVesselsActivity();
    this.initChartOrdersTime();

    this.loadCustomerAlerts(this.mockCustomer);
  }

  // GROSS PROFIT & REVENUE
  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--dark-color-2');
      const textColorSecondary = documentStyle.getPropertyValue('--grey-color');

      this.data = {
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
            data: [
              21000, 84000, 20000, 75000, 37000, 65000, 34000, 12000, 9000,
              22000, 0, 20000,
            ],
            borderColor: 'transparent',
            borderWidth: 0,
            barThickness: 20,
            borderRadius: 6,
            yAxisID: 'y1',
            order: 2,
          },
          {
            type: 'line',
            label: 'Gross Profit',
            borderColor: 'rgba(26, 158, 110, 0.75)',
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            data: [
              5000, 22000, 6000, 19000, 9000, 17000, 8000, 3000, 2000, 5000, 0,
              5000,
            ],
            yAxisID: 'y',
            order: 1,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: 'rgba(26, 158, 110, 0.75)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(26, 158, 110, 0.75)',
            pointStyle: 'circle',
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
            grid: { color: '#f8f8f9' },
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

  // OUTSTANDING BALANCE
  initChartBalance() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColorSecondary = documentStyle.getPropertyValue('--grey-color');

      this.dataBalance = {
        labels: [
          'Maersk Landlord',
          'British Pride',
          'Monda Crystal',
          'April One',
          'Palace 4',
        ],
        datasets: [
          {
            label: 'Current',
            backgroundColor: 'rgba(37, 99, 235, 0.75)',
            borderWidth: 0,
            barThickness: 20,
            borderRadius: 6,
            data: [3022, 125, 712, 238, 326],
          },
          {
            label: 'Overdue',
            backgroundColor: 'rgba(224, 61, 61, 0.75)',
            borderWidth: 0,
            barThickness: 20,
            borderRadius: 6,
            data: [2000, 100, 400, 200, 200],
          },
        ],
      };

      this.optionsBalance = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: textColorSecondary,
              font: { size: 12, family: 'Urbanist' },
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const value = context.parsed.x;
                return ` ${context.dataset.label}: ${value.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`;
              },
            },
          },
        },
        scales: {
          x: {
            stacked: true,
            ticks: {
              color: textColorSecondary,
              font: { size: 12, family: 'Urbanist' },
              callback: (value: number) => `${(value / 1000).toFixed(0)}k`,
            },
            grid: { display: false },
          },
          y: {
            stacked: true,
            ticks: {
              color: textColorSecondary,
              font: { size: 12, family: 'Urbanist' },
            },
            grid: { color: '#f8f8f9' },
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

  // PROFIT & MARGIN BY VESSEL
  vesselProfitView: 'profit' | 'margin' = 'profit';

  private vesselProfitLabels = [
    'Maersk Landlord',
    'British Pride',
    'Monda Crystal',
    'April One',
    'Palace 4',
  ];
  private vesselProfitData = [18000, 12000, 8500, 5200, 3800];
  private vesselMarginData = [28.5, 22.1, 19.4, 15.8, 12.3];

  setVesselProfitView(view: 'profit' | 'margin') {
    this.vesselProfitView = view;
    this.initChartVesselProfit();
  }

  initChartVesselProfit() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColorSecondary = documentStyle.getPropertyValue('--grey-color');

      const isProfit = this.vesselProfitView === 'profit';

      this.dataVesselProfit = {
        labels: this.vesselProfitLabels,
        datasets: [
          {
            label: isProfit ? 'Gross Profit (USD)' : 'Profit Margin (%)',
            backgroundColor: 'rgba(26, 158, 110, 0.75)',
            borderWidth: 0,
            barThickness: 20,
            borderRadius: 6,
            data: isProfit ? this.vesselProfitData : this.vesselMarginData,
          },
        ],
      };

      this.optionsVesselProfit = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const value = context.parsed.x;
                return isProfit
                  ? ` ${value.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`
                  : ` ${value.toFixed(1)}%`;
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: { size: 12, family: 'Urbanist' },
              callback: (value: number) =>
                isProfit ? `${(value / 1000).toFixed(0)}k` : `${value}%`,
            },
            grid: { display: false },
          },
          y: {
            ticks: {
              color: textColorSecondary,
              font: { size: 12, family: 'Urbanist' },
            },
            grid: { color: '#f8f8f9' },
          },
        },
        animation: {
          duration: 400,
          easing: 'easeInOutQuart',
        },
      };

      this.cd.markForCheck();
    }
  }

  // SALES ORDERS OVER TIME
  initChartOrdersTime() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color',
      );

      this.dataOrdersTime = {
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
            borderColor: 'rgba(83, 113, 255, 0.75)',
            borderWidth: 2,
            fill: true,

            backgroundColor: 'rgba(83, 113, 255, 0.1)',
            tension: 0.4,
            data: [50, 25, 12, 48, 56, 76, 42, 9, 22, 23, 0, 10],
            yAxisID: 'y', // Assign to left Y-axis

            // Point styling
            pointRadius: 5, // Size of points
            pointHoverRadius: 6, // Size when hovering
            pointBackgroundColor: 'rgba(83, 113, 255, 0.75)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(83, 113, 255, 0.75)',
            pointStyle: 'circle', // 'circle', 'rect', 'rectRounded', 'triangle', 'star'
          },
        ],
      };

      this.optionsOrdersTime = {
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
              // lineWidth: 10,
              // offset: true,
              // drawTicks: true,
            },
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: false,
              // text: 'Orders',
              // color: textColor,
              // font: {
              //   size: 12,
              //   weight: '600',
              //   family: 'Urbanist',
              // },
            },
            ticks: {
              color: textColorSecondary,
              font: {
                size: 12,
                weight: '500',
                family: 'Urbanist',
              },
            },
            grid: { color: '#f8f8f9' },
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

  // VESSELS ORDERS ACTIVITY
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
            backgroundColor: 'rgba(83, 113, 255, 0.75)',
            data: [21, 84, 20, 75, 37, 65, 34], // Use realistic revenue values
            borderColor: 'white',
            borderWidth: 0,
            barThickness: 20,
            borderRadius: 4, // Rounded top corners
          },
        ],
      };

      this.optionsVesselsActivity = {
        indexAxis: 'y', // Horizontal bars
        maintainAspectRatio: false,
        aspectRatio: 0.6,

        plugins: {
          legend: {
            display: false,
            // labels: {
            //   color: textColor,
            //   font: {
            //     size: 14,
            //     weight: 'normal',
            //     family: 'Urbanist',
            //   },
            //   usePointStyle: true, // Use circular points instead of rectangles
            //   pointStyle: 'circle',
            // },
          },
        },

        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                size: 11,
                color: '--grey-color',
                family: 'Urbanist',
              },
            },
            grid: {
              display: false,
            },
          },

          y: {
            ticks: {
              color: textColorSecondary,
              font: {
                size: 11,
                family: 'Urbanist',
                color: '--grey-color',
              },
            },
            grid: {
              color: '#f8f8f9',
            },
          },
        },
        // Interaction options

        // Animation
        animation: {
          duration: 1000, // Animation duration in ms
          easing: 'easeInOutQuart', // Animation easing
        },
      };

      this.cd.markForCheck();
    }
  }

  // ORDERS CATEGORY
  initChartType() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);

      this.dataType = {
        labels: ['Provision', 'Bonded', 'Cabin'],
        datasets: [
          {
            data: [540, 325, 702],
            backgroundColor: [
              'rgba(83, 113, 255, 0.80)',
              'rgba(14, 158, 138, 0.80)',
              'rgba(124, 58, 237, 0.80)',
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--primary-color-main-btn'),
              '#0ea5c9',
              '#8b5cf6',
            ],
            borderWidth: 0,
            hoverOffset: 4,
          },
        ],
      };

      this.optionsType = {
        maintainAspectRatio: false,
        aspectRatio: 1,
        cutout: '78%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const total = context.dataset.data.reduce(
                  (a: number, b: number) => a + b,
                  0,
                );
                const value = context.parsed;
                const pct = ((value / total) * 100).toFixed(1);
                return ` ${context.label}: ${value} orders (${pct}%)`;
              },
            },
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

  getTotalOrders(): number {
    return (
      this.dataType?.datasets[0]?.data?.reduce(
        (a: number, b: number) => a + b,
        0,
      ) ?? 0
    );
  }

  getCategoryItems() {
    if (!this.dataType) return [];
    const data = this.dataType.datasets[0].data;
    const labels = this.dataType.labels;
    const colors = this.dataType.datasets[0].backgroundColor;
    const total = data.reduce((a: number, b: number) => a + b, 0);
    return labels.map((label: string, i: number) => ({
      label,
      value: data[i],
      color: colors[i],
      pct: ((data[i] / total) * 100).toFixed(1),
    }));
  }

  // Vessels Revenue & Orders
  vesselsView: 'revenue' | 'orders' = 'revenue';
  dataVessels: any;
  optionsVessels: any;

  private vesselsLabels = [
    'Maersk Landlord',
    'British Pride',
    'Monda Crystal',
    'April One',
    'Palace 4',
  ];

  private revenueData = [5022, 4412, 3225, 2038, 1526];
  private ordersData = [22, 20, 12, 8, 6];

  setVesselsView(view: 'revenue' | 'orders') {
    this.vesselsView = view;
    this.initChartVessels();
  }

  initChartVessels() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColorSecondary = documentStyle.getPropertyValue('--grey-color');

      const isRevenue = this.vesselsView === 'revenue';

      this.dataVessels = {
        labels: this.vesselsLabels,
        datasets: [
          {
            type: 'bar',
            label: isRevenue ? 'Revenue (USD)' : 'Orders',
            backgroundColor: isRevenue
              ? 'rgba(83, 113, 255, 0.75)'
              : 'rgba(83, 113, 255, 0.75)',
            borderWidth: 0,
            barThickness: 20,
            borderRadius: 6,
            data: isRevenue ? this.revenueData : this.ordersData,
          },
        ],
      };

      this.optionsVessels = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const value = context.parsed.x;
                return isRevenue
                  ? ` ${value.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`
                  : ` ${value} orders`;
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: { size: 12, family: 'Urbanist' },
              callback: (value: number) =>
                isRevenue ? `${(value / 1000).toFixed(0)}k` : value,
            },
            grid: { display: false },
          },
          y: {
            ticks: {
              color: textColorSecondary,
              font: { size: 12, family: 'Urbanist' },
            },
            grid: { color: '#f8f8f9' },
          },
        },
        animation: {
          duration: 400,
          easing: 'easeInOutQuart',
        },
      };

      this.cd.markForCheck();
    }
  }

  //ALERTING LOGIC
  customerAlerts: { severity: string; summary: string; detail: string }[] = [];
  mockCustomer = {
    status: 'ON_HOLD' as Customer['status'],
    creditLimit: 100000,
    outstandingBalance: 85000,
    overdueBalance: 8000,
    overdueInvoiceCount: 3,
    billingAddress: '',
    vat: '',
  };

  loadCustomerAlerts(customer: Partial<Customer>) {
    this.customerAlerts = [];

    if (customer.status === 'BLACKLISTED') {
      this.customerAlerts.push({
        severity: 'error',
        summary: 'Blacklisted',
        detail: 'This customer is blacklisted — new orders are not permitted',
      });
    }

    if (customer.status === 'ON_HOLD') {
      this.customerAlerts.push({
        severity: 'error',
        summary: 'On Hold',
        detail: 'This account is on hold — new orders are blocked',
      });
    }

    const outstanding = customer.outstandingBalance ?? 0;
    const creditLimit = customer.creditLimit ?? 0;
    const overdueBalance = customer.overdueBalance ?? 0;
    const overdueCount = customer.overdueInvoiceCount ?? 0;

    if (creditLimit > 0 && outstanding > creditLimit) {
      this.customerAlerts.push({
        severity: 'error',
        summary: 'Credit Limit Exceeded',
        detail: `Outstanding balance of ${outstanding.toLocaleString()} USD exceeds credit limit of ${creditLimit.toLocaleString()} USD`,
      });
    }

    if (
      creditLimit > 0 &&
      outstanding > creditLimit * 0.8 &&
      outstanding <= creditLimit
    ) {
      this.customerAlerts.push({
        severity: 'warn',
        summary: 'Credit Limit Warning',
        detail: `Credit limit ${Math.round((outstanding / creditLimit) * 100)}% utilized — ${(creditLimit - outstanding).toLocaleString()} USD remaining`,
      });
    }

    if (overdueBalance > 0) {
      this.customerAlerts.push({
        severity: 'warn',
        summary: 'Overdue Invoices',
        detail: `${overdueCount} overdue invoice(s) totalling ${overdueBalance.toLocaleString()} USD`,
      });
    }

    if (!customer.billingAddress || !customer.vat) {
      this.customerAlerts.push({
        severity: 'info',
        summary: 'Incomplete Profile',
        detail:
          'Billing address or Tax ID is missing — please complete the customer profile',
      });
    }
  }

  alertsExpanded = false;

  upcomingDeliveries = [
    {
      soNumber: 'SO-2026-001',
      vessel: 'British Landlord',
      port: 'Port Said',
      deliveryDate: new Date('2026-04-05'),
      daysLeft: 7,
      status: 'confirmed',
    },
    {
      soNumber: 'SO-2026-002',
      vessel: 'Maersk Eagle',
      port: 'Alexandria',
      deliveryDate: new Date('2026-04-15'),
      daysLeft: 17,
      status: 'progress',
    },
  ];

  invoicesDue = [
    {
      invoiceNo: 'INV-2026-001',
      amount: 12050,
      dueDate: new Date('2026-04-03'),
      daysLeft: 5,
      status: 'unpaid',
    },
    {
      invoiceNo: 'INV-2026-002',
      amount: 8200,
      dueDate: new Date('2026-04-20'),
      daysLeft: 22,
      status: 'partial',
    },
  ];

  getDaysClass(days: number): string {
    if (days <= 5) return 'days-badge--urgent';
    if (days <= 15) return 'days-badge--warning';
    return 'days-badge--normal';
  }

  // PAYMENT BEHAVIOUR
  behavior = {
    agreedTerms: 'Net 30',
    avgDaysToPay: 42,
    avgDelay: 12,
    totalInvoices: 20,
    paidOnTime: 15,
    onTimeRate: 64,
    lastPaymentDate: new Date('2026-03-22'),
    lastPaymentAmount: 4500,
  };

  get paymentVerdict(): { message: string; class: string } {
    const rate = this.behavior.onTimeRate;
    if (rate >= 85)
      return {
        message: 'Reliable payer — consistently on time',
        class: 'pb-verdict--good',
      };
    if (rate >= 60)
      return {
        message: 'Paying late on average — follow up recommended',
        class: 'pb-verdict--warn',
      };
    return {
      message: 'Poor payment history — review credit terms',
      class: 'pb-verdict--late',
    };
  }

  getDelayClass(days: number): string {
    if (days <= 0) return 'text-success';
    if (days <= 10) return 'text-warn';
    return 'text-danger';
  }

  getRateClass(rate: number): string {
    if (rate >= 85) return 'text-success';
    if (rate >= 60) return 'text-warn';
    return 'text-danger';
  }
}
