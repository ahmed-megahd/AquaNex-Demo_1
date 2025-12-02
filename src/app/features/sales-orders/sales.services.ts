// src/app/service/productservice.ts
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';

import { catchError, Observable, of, retry, throwError } from 'rxjs';
import { FirestoreService } from '../../shared/services/firestore.service';

// src/app/domain/product.ts
// export interface Product {
//   id?: string;
//   name?: string;
//   description?: string;
//   price?: number;
//   quantity?: number;
//   category?: string;
//   inventoryStatus?: string;
//   rating?: number;
// }

export interface SalesOrder {
  id: number;
  orderNumber: string;
  employee: string;
  customer: string;
  deliveryDate: string;
  items: number;
  status: string;
  paymentStatus: string;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  // private salesEntryURL = '';
  // private httpClient = inject(HttpClient);
  private firestoreService = inject(FirestoreService);
  private collectionName = 'salesOrders';

  // getAllSalesOrders(): Observable<any[]> {
  //   return this.firestoreService.getItems('salesOrder');
  // }

  getAllSalesOrders(): Observable<any[]> {
    return this.firestoreService.getItems(this.collectionName);
  }

  addSaleOrder(salesOrder: {}) {
    this.firestoreService.addItem('salesOrders', salesOrder);
  }

  getProducts() {
    return of([
      {
        id: 1,
        orderNumber: 'SO-001',
        employee: 'Omar Alaa',
        customer: 'Trade Lion / Wonderville',
        deliveryDate: '12/09/2025',
        items: 32,
        total: 12010,
        status: 'In-progress',
        paymentStatus: 'Paid',
      },

      {
        id: 2,
        orderNumber: 'SO-002',
        employee: 'Mohamed Mohsen',
        customer: 'Trading Bird',
        deliveryDate: '2/12/2025',
        items: 121,
        total: 122112,
        status: 'In-progress',
        paymentStatus: 'Paid',
      },

      {
        id: 3,
        orderNumber: 'SO-003',
        employee: 'Mostafa Ali',
        customer: 'Marks & CO',
        deliveryDate: '1/04/2025',
        items: 2,
        total: 13000,
        status: 'Draft',
        paymentStatus: 'Paid',
      },
    ]);
  }
  //   //GET all sales entries
  //   getSalesEntries(): Observable<SalesOrder[]> {
  //     return this.httpClient
  //       .get<SalesOrder[]>(this.salesEntryURL)
  //       .pipe(retry(3), catchError(this.httpErrorHandler));
  //   }

  //   //GET a sale entry
  //   getSaleEntry(id: number): Observable<SalesOrder> {
  //     return this.httpClient
  //       .get<SalesOrder>(this.salesEntryURL + '/' + id)
  //       .pipe(retry(3), catchError(this.httpErrorHandler));
  //   }

  //   //ADD a sale entry
  //   addSaleEntry(saleEntry: SalesOrder): Observable<SalesOrder> {
  //     return this.httpClient
  //       .post<SalesOrder>(this.salesEntryURL, saleEntry)
  //       .pipe(retry(3), catchError(this.httpErrorHandler));
  //   }

  //   //UPDATE a sale entry
  //   updateSaleEntry(saleEntry: SalesOrder): Observable<SalesOrder> {
  //     return this.httpClient
  //       .put<SalesOrder>(this.salesEntryURL + '/' + saleEntry.id, saleEntry)
  //       .pipe(retry(3), catchError(this.httpErrorHandler));
  //   }

  //   //DELETE a sale entry
  //   deleteSaleEntry(id: number): Observable<SalesOrder> {
  //     return this.httpClient
  //       .delete<SalesOrder>(this.salesEntryURL + '/' + id)
  //       .pipe(retry(3), catchError(this.httpErrorHandler));
  //   }

  //   private httpErrorHandler(error: HttpErrorResponse) {
  //     if (error.error instanceof ErrorEvent) {
  //       console.error(
  //         'A client side error occurs. The error message is ' + error.message
  //       );
  //     } else {
  //       console.error(
  //         'An error happened in server. The HTTP status code is ' +
  //           error.status +
  //           ' and the error returned is ' +
  //           error.message
  //       );
  //     }

  //     return throwError('Error occurred. Pleas try again');
  //   }
  //
}
