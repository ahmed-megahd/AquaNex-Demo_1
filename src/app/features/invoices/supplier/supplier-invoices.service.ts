import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface Invoice {
  id: string;
  supplierInvoice: string;
  supplier: string;
  linkedPO: string;
  date: string;
  dueDate: string;
  status: string;
  amount: number;
  remaining: number;
}

@Injectable({
  providedIn: 'root',
})
export class SupplierInvoicesService {
  getProducts() {
    return of([
      {
        id: 'SUP-INV-0098-999',
        supplierInvoice: 'SE-0092-912',
        supplier: 'Mobacco',
        linkedPO: 'PO-1102-0092',
        date: '24/09/2023',
        dueDate: '24/10/2023',
        status: 'Paid',
        amount: 1120,
        remaining: 0,
      },
      {
        id: 'SUP-INV-0098-1000',
        supplierInvoice: 'SE-0092-888',
        supplier: 'Mobile-LTD',
        linkedPO: 'PO-1105-2092',
        date: '24/09/2023',
        dueDate: '24/10/2023',
        status: 'Paid',
        amount: 1120,
        remaining: 0,
      },

      {
        id: 'SUP-INV-0098-1001',
        supplierInvoice: 'SE-9222-912',
        supplier: 'B.tech-LTD',
        linkedPO: 'PO-1109-1092',
        date: '24/09/2023',
        dueDate: '24/10/2023',
        status: 'Un-paid',
        amount: 1120,
        remaining: 120,
      },
    ]);
  }
}
