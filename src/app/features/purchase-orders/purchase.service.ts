import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  getProducts() {
    return of([
      {
        id: 1,
        orderNumber: 'PO-001',
        employee: 'Omar Alaa',
        supplier: 'El-Hussieny',
        deliveryDate: '12/09/2025',
        date: '12/09/2025',
        items: 32,
        total: 12010,
        status: 'In-progress',
        paymentStatus: 'Paid',
      },

      {
        id: 2,
        orderNumber: 'PO-002',
        employee: 'Mohamed',
        supplier: '2B Egypt',
        deliveryDate: '2/12/2025',
        date: '12/09/2025',
        items: 121,
        total: 122112,
        status: 'In-progress',
        paymentStatus: 'Paid',
      },

      {
        id: 3,
        orderNumber: 'PO-003',
        employee: 'Mostafa Ali',
        supplier: 'Marks & CO',
        deliveryDate: '1/04/2025',
        date: '12/09/2025',
        items: 2,
        total: 13000,
        status: 'Draft',
        paymentStatus: 'Paid',
      },
    ]);
  }
}
