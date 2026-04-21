import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface Payment {
  id: string;
  // type: string;
  date: string;
  vendor: string;
  invoiceNumber: string;
  externalInvoice: string;
  amountPaid: number;
  method: string;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  getProducts() {
    return of([
      {
        id: 'IPY-109-221',
        // type: 'vendor',
        vendor: 'Trade Lion/Wonderville',
        date: '12/09/2025',
        invoiceNumber: 'CST-0012-000',
        externalInvoice: 'TRLW-1000',
        method: 'Bank Transfer',
        amountPaid: 12010,
      },
      {
        id: 'IPY-209-222',
        // type: 'Supplier',
        vendor: 'Trade Lion/Wonderville',
        date: '12/09/2025',
        invoiceNumber: 'CST-0012-001',
        externalInvoice: 'TRLW-1000',
        method: 'Bank Transfer',
        amountPaid: 1210,
      },
      {
        id: 'IPY-109-421',
        // type: 'Supplier',
        vendor: 'Maersk',
        date: '12/09/2025',
        invoiceNumber: 'CST-1012-010',
        externalInvoice: 'MKOP-0091',
        method: 'Bank Transfer',
        amountPaid: 22010,
      },
      {
        id: 'IPY-109-421',
        // type: 'Supplier',
        vendor: 'Maersk',
        date: '12/09/2025',
        invoiceNumber: 'CST-1012-010',
        externalInvoice: 'MKOP-0091',
        method: 'Cash',
        amountPaid: 2010,
      },
      {
        id: 'IPY-109-421',
        // type: 'Supplier',
        vendor: 'Maersk',
        date: '12/09/2025',
        invoiceNumber: 'CST-1012-010',
        externalInvoice: 'MKOP-0091',
        method: 'Bank Transfer',
        amountPaid: 1000,
      },
      {
        id: 'IPY-109-421',
        // type: 'Supplier',
        vendor: 'Maersk',
        date: '12/09/2025',
        invoiceNumber: 'CST-1012-010',
        externalInvoice: 'MKOP-0091',
        method: 'Bank Transfer',
        amountPaid: 12010,
      },
    ]);
  }
}
