import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';
import { SalesComponent } from './features/sales-orders/sales/sales.component';
import { CreateSalesOrderComponent } from './features/sales-orders/create-sales/create-sales-order/create-sales-order.component';
import { PaymentsComponent } from './features/payments/all-payments/payments.component';
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

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'expenses',
        pathMatch: 'prefix',
      },
      { path: 'sales-orders', component: SalesComponent },
      { path: 'sales-order/create', component: CreateSalesOrderComponent },
      { path: 'sales-order/view/:id', component: ViewSalesComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'expenses/create', component: CreateExpenseComponent },
      { path: 'expenses/view/:id', component: ViewExpensesComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'items/add', component: AddItemComponent },
      { path: 'items/view/:id', component: ViewItemComponent },
      { path: 'suppliers', component: SuppliersComponent },
      { path: 'suppliers/create', component: CreateSupplierComponent },
      { path: 'suppliers/view/:id', component: ViewSupplierComponent },
      { path: 'purchase-orders', component: PurchasesComponent },
      { path: 'purchase-orders/create', component: CreatePurchaseComponent },
      { path: 'purchase-orders/view/:id', component: ViewPurchaseComponent },
    ],
  },
];
