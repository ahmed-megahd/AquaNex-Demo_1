import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface Customer {
  // Identity
  id: string;
  code: string; // auto-generated e.g. CST-001
  name: string;
  type: 'SHIP_OWNER' | 'SHIP_MANAGER';
  status: 'ACTIVE' | 'INACTIVE' | 'PROSPECT' | 'ON_HOLD' | 'BLACKLISTED';
  regCountry: string; // ISO code e.g. 'EG'
  vat: string;
  companyRegNumber?: string;
  // industrySegment?: string;
  website?: string;
  timezone?: string;

  // Location
  address: string;
  city: string;
  country: string; // ISO code
  billingAddress?: string;

  // Operations
  operationPorts: string[]; // array of LOCODE codes
  deliveryPorts: string[];
  // fleetSize?: number;

  // Contact
  contact: string;
  title?: string;
  email: string;
  phone: string;

  // Commercial
  pyTerms: string;
  pyMethod: string;
  currency: string; // ISO code e.g. 'USD'
  creditLimit: number;

  // Financial (computed, not stored on customer directly)
  outstandingBalance: number;
  overdueBalance: number;
  overdueInvoiceCount: number;

  // Internal
  source?: string;
  customerSince?: Date;
  accountManager?: string;
  notes?: string;

  // Audit
  createdBy: string;
  createdAt: Date;
  updatedBy?: string;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  getProducts() {
    return of([
      {
        ID: 1,
        name: 'Maersc LTD',
        status: 'Active',
        type: 'Manager',
        ships: 91,
        totalSOs: '11',
        totalInvoices: 20000,
        outstandingBalance: 19000,
        email: 'jEdwars.maersc@maersc.com',
      },

      {
        ID: 1,
        name: 'MSC WWA',
        status: 'Not-Active',
        type: 'Owner',
        ships: 9,
        totalSOs: '11',
        totalInvoices: 200000,
        outstandingBalance: 190000,
        email: 'edMaya@msc@msc.com',
      },
    ]);
  }
}
