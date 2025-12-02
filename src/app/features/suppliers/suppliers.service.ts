import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SuppliersService {
  getProducts() {
    return of([
      {
        supplierID: 1,
        name: 'B.Tech',
        category: 'Provision, Bonded',
        itemsNo: 91,
        LastPO: 'PO-110-911',
        totalPOValue: 20000,
        payments: 19000,
      },

      {
        supplierID: 1,
        name: 'Carefour',
        category: 'Provision',
        itemsNo: 9,
        LastPO: 'PO-120-111',
        totalPOValue: 200000,
        payments: 190000,
      },
    ]);
  }
}
