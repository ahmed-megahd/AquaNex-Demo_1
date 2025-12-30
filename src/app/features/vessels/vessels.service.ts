import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VesselsService {
  getProducts() {
    return of([
      {
        ID: 1,
        name: 'Maersc Ship Lord',
        type: 'Yacht',
        IMO: 11391,
        customer: 'Dubai Dock',
        totalSOs: '11',
        totalInvoices: 20000,
        outstandingBalance: 19000,
        status: 'Active',
      },

      {
        ID: 2,
        name: 'MSC WWA',
        type: 'Cargo',
        IMO: 11239,
        customer: 'Dubai Dock',
        totalSOs: '11',
        totalInvoices: 200000,
        outstandingBalance: 190000,
        contact: 'Edward Maya',
        status: 'Inactive',
      },

      {
        ID: 3,
        name: 'MSC WWA',
        type: 'Naval',
        IMO: 11239,
        customer: 'Dubai Dock',
        totalSOs: '11',
        totalInvoices: 200000,
        outstandingBalance: 190000,
        contact: 'Edward Maya',
        status: 'Inactive',
      },

      {
        ID: 4,
        name: 'MSC WWA',
        type: 'Cargo',
        IMO: 11239,
        customer: 'Dubai Dock',
        totalSOs: '11',
        totalInvoices: 200000,
        outstandingBalance: 190000,
        contact: 'Edward Maya',
        status: 'Inactive',
      },

      {
        ID: 5,
        name: 'MSC WWA',
        type: 'Cargo',
        IMO: 11239,
        customer: 'Dubai Dock',
        totalSOs: '11',
        totalInvoices: 200000,
        outstandingBalance: 190000,
        contact: 'Edward Maya',
        status: 'Inactive',
      },

      {
        ID: 6,
        name: 'MSC WWA',
        type: 'Container',
        IMO: 11239,
        customer: 'Dubai Dock',
        totalSOs: '11',
        totalInvoices: 200000,
        outstandingBalance: 190000,
        contact: 'Edward Maya',
        status: 'Inactive',
      },

      {
        ID: 7,
        name: 'MSC WWA',
        type: 'Cargo',
        IMO: 11239,
        customer: 'Dubai Dock',
        totalSOs: '11',
        totalInvoices: 200000,
        outstandingBalance: 190000,
        contact: 'Edward Maya',
        status: 'Inactive',
      },

      {
        ID: 8,
        name: 'MSC WWA',
        type: 'Carrier',
        IMO: 11239,
        customer: 'Dubai Dock',
        totalSOs: '11',
        totalInvoices: 200000,
        outstandingBalance: 190000,
        contact: 'Edward Maya',
        status: 'Inactive',
      },

      {
        ID: 9,
        name: 'MSC WWA',
        type: 'Cargo',
        IMO: 111111,
        customer: 'Dubai Dock',
        totalSOs: '11',
        totalInvoices: 200000,
        outstandingBalance: 190000,
        contact: 'Edward Maya',
        status: 'Inactive',
      },

      {
        ID: 10,
        name: 'MSC WWA',
        type: 'Container',
        IMO: 11239,
        customer: 'Dubai Dock',
        totalSOs: '11',
        totalInvoices: 200000,
        outstandingBalance: 190000,
        contact: 'Edward Maya',
        status: 'Inactive',
      },
    ]);
  }
}
