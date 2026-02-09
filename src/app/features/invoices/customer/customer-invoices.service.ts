import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface Invoice {
  id: string;
  quotationNo: string;
  customer: string;
  vessel: string;
  linkedSO: string;
  date: string;
  dueDate: string;
  status: string;
  amount: number;
  remaining: number;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerInvoicesService {
  getProducts() {
    return of([
      {
        id: 'CST-INV-0098-999',
        quotationNo: 'MM9IH-0092-912',
        customer: 'MAERSC',
        vessel: 'MAERSC-PARTYLAND',
        linkedSO: 'SO-1102-0092',
        date: '24/09/2023',
        dueDate: '24/10/2023',
        status: 'Paid',
        amount: 1120,
        remaining: 0,
      },
      {
        id: 'CST-INV-0098-1000',
        quotationNo: 'SE11-009-0092-888',
        customer: 'Mobile-LTD',

        vessel: 'MAERSC-PARTYLAND',
        linkedSO: 'SO-1105-2092',
        date: '24/09/2023',
        dueDate: '24/10/2023',
        status: 'Paid',
        amount: 1120,
        remaining: 0,
      },

      {
        id: 'CST-INV-0098-1001',
        quotationNo: 'PPO0-989-9222-912',
        customer: 'B.tech-LTD',

        vessel: 'MAERSC-PARTYLAND',
        linkedSO: 'SO-1109-1092',
        date: '24/09/2023',
        dueDate: '24/10/2023',
        status: 'Un-paid',
        amount: 1120,
        remaining: 120,
      },
    ]);
  }
}
