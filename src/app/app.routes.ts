import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';
import { SalesComponent } from './features/sales-orders/sales/sales.component';
import { CreateSalesOrderComponent } from './features/sales-orders/create-sales/create-sales-order/create-sales-order.component';
// import { PaymentsComponent } from './features/payments/all-payments/payments.component';
import { ViewSalesComponent } from './features/sales-orders/view-sales/view-sales/view-sales.component';
import { ExpensesComponent } from './features/expenses/expenses/expenses.component';
import { CreateExpenseComponent } from './features/expenses/create-expense/create-expense/create-expense.component';
import { ViewExpensesComponent } from './features/expenses/view-expenses/view-expenses/view-expenses.component';
import { ItemsComponent } from './features/items/items/items/items.component';
import { AddItemComponent } from './features/items/add-item/add-item/add-item.component';
import { ViewItemComponent } from './features/items/view-item/view-item/view-item.component';
import { SuppliersComponent } from './features/suppliers/suppliers/suppliers.component';
import { CreateSupplierComponent } from './features/suppliers/create-supplier/create-supplier.component';
import { ViewSupplierComponent } from './features/suppliers/view-supplier/view-supplier.component';
import { PurchasesComponent } from './features/purchase-orders/purchases/purchases.component';
import { CreatePurchaseComponent } from './features/purchase-orders/create-purchase/create-purchase.component';
import { ViewPurchaseComponent } from './features/purchase-orders/view-purchase/view-purchase.component';
import { CustomersComponent } from './features/customers/customers/customers.component';
import { CreateCustomerComponent } from './features/customers/create-customer/create-customer.component';
import { ViewCustomerComponent } from './features/customers/view-customer/view-customer.component';
import { VesselsComponent } from './features/vessels/vessels/vessels.component';
import { AddVesselComponent } from './features/vessels/add-vessel/add-vessel.component';
import { ViewVesselComponent } from './features/vessels/view-vessel/view-vessel.component';
import { SupplierInvoices } from './features/invoices/supplier/supplier-invoices/supplier-invoices.component';
import { SupplierInvoiceCreateComponent } from './features/invoices/supplier/supplier-invoice-create/supplier-invoice-create.component';
import { SupplierInvoiceViewComponent } from './features/invoices/supplier/supplier-invoice-view/supplier-invoice-view.component';
import { InvoicePrintPageComponent } from './features/invoices/invoice-print-page/invoice-print-page';
import { PoComparisonComponent } from './features/purchase-orders/po-comparison/po-comparison.component';
import { CustomerInvoiceCreateComponent } from './features/invoices/customer/customer-invoice-create/customer-invoice-create.component';
import { CustomerInvoiceViewComponent } from './features/invoices/customer/customer-invoice-view/customer-invoice-view.component';
import { CustomerInvoices } from './features/invoices/customer/customer-invoices/customer-invoices.component';
import { UnderConstruction } from './under-construction/under-construction';
import { InflowPaymentsComponent } from './features/payments/inflow-payments/inflow-payments/inflow-payments.component';
import { CreateInflowPaymentsComponent } from './features/payments/inflow-payments/create-inflow-payments/create-inflow-payments.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'prefix',
      },
      { path: 'sales-orders', component: SalesComponent },
      { path: 'sales-order/create', component: CreateSalesOrderComponent },
      { path: 'sales-order/view/:id', component: ViewSalesComponent },

      // { path: 'payments', component: PaymentsComponent },

      { path: 'expenses', component: ExpensesComponent },
      { path: 'expenses/create', component: CreateExpenseComponent },
      { path: 'expenses/view/:id', component: ViewExpensesComponent },

      { path: 'items', component: ItemsComponent },
      { path: 'items/add', component: AddItemComponent },
      { path: 'items/view/:id', component: ViewItemComponent },

      { path: 'suppliers', component: SuppliersComponent },
      { path: 'suppliers/create', component: CreateSupplierComponent },
      { path: 'suppliers/view/:id', component: ViewSupplierComponent },

      { path: 'customers', component: CustomersComponent },
      { path: 'customers/create', component: CreateCustomerComponent },
      { path: 'customers/view/:id', component: ViewCustomerComponent },

      { path: 'vessels', component: VesselsComponent },
      { path: 'vessels/create', component: AddVesselComponent },
      { path: 'vessels/view/:id', component: ViewVesselComponent },

      { path: 'purchase-orders', component: PurchasesComponent },
      { path: 'purchase-orders/create', component: CreatePurchaseComponent },
      { path: 'purchase-orders/view/:id', component: ViewPurchaseComponent },
      { path: 'compareison-tool', component: PoComparisonComponent },

      { path: 'supplier-invoices', component: SupplierInvoices },
      {
        path: 'supplier-invoices/create',
        component: SupplierInvoiceCreateComponent,
      },
      {
        path: 'supplier-invoices/view/:id',
        component: SupplierInvoiceViewComponent,
      },

      { path: 'customer-invoices', component: CustomerInvoices },
      {
        path: 'customer-invoices/create',
        component: CustomerInvoiceCreateComponent,
      },
      {
        path: 'customer-invoices/view/:id',
        component: CustomerInvoiceViewComponent,
      },

      {
        path: 'inflow-payments',
        component: InflowPaymentsComponent,
      },
      {
        path: 'inflow-payments/create',
        component: CreateInflowPaymentsComponent,
      },
      // UNDER CONSTRUCTION ROUTES
      {
        path: 'overview',
        component: UnderConstruction,
      },
      {
        path: 'sales-report',
        component: UnderConstruction,
      },
      {
        path: 'overview',
        component: UnderConstruction,
      },
      {
        path: 'activity',
        component: UnderConstruction,
      },
      {
        path: 'charts',
        component: UnderConstruction,
      },
      {
        path: 'purchasing-report',
        component: UnderConstruction,
      },

      {
        path: 'payments-cst',
        component: UnderConstruction,
      },
      {
        path: 'payments-cst',
        component: UnderConstruction,
      },
      {
        path: 'finance-summary',
        component: UnderConstruction,
      },
      {
        path: 'stock',
        component: UnderConstruction,
      },
      {
        path: 'stock-reorder',
        component: UnderConstruction,
      },
      {
        path: 'customer-analysis',
        component: UnderConstruction,
      },
      {
        path: 'purchase-history',
        component: UnderConstruction,
      },
      {
        path: 'pricing-logs',
        component: UnderConstruction,
      },
      {
        path: 'reports',
        component: UnderConstruction,
      },
      {
        path: 'users',
        component: UnderConstruction,
      },

      // { path: '**', component: UnderConstruction },
    ],
  },
  { path: 'print/invoice', component: InvoicePrintPageComponent },
];
