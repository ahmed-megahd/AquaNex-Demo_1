import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  getProducts() {
    return of([
      {
        ID: 1,
        name: 'Maersc LTD',
        type: 'Manager',
        ships: 91,
        totalSOs: '11',
        totalInvoices: 20000,
        outstandingBalance: 19000,
        contact: 'John Edwars',
        email: 'jEdwars.maersc@maersc.com',
      },

      {
        ID: 1,
        name: 'MSC WWA',
        type: 'Owner',
        ships: 9,
        totalSOs: '11',
        totalInvoices: 200000,
        outstandingBalance: 190000,
        contact: 'Edward Maya',
        email: 'edMaya@msc@msc.com',
      },
    ]);
  }
}
