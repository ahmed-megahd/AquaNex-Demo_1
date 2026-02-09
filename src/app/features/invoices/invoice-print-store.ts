import { Injectable } from '@angular/core';
import { InvoiceDocumentModel } from './invoice-document/invoice-document.component';

@Injectable({
  providedIn: 'root',
})
export class InvoicePrintStore {
  invoice!: InvoiceDocumentModel;
  type!: 'supplier' | 'customer';
}
