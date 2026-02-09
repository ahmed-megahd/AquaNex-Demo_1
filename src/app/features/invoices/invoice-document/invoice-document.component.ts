// import autoTable from 'jspdf-autotable';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

export interface InvoiceDocumentModel {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  currency: string;
  status: 'Draft' | 'Confirmed' | 'Partially Paid' | 'Paid' | 'Overdue';

  supplier?: PartyModel;
  customer?: PartyModel;

  poReference?: string;
  soReference?: string;

  items: InvoiceItemModel[];

  subtotal: number;
  delivery: number;
  tax: number;
  discount?: number;
  total: number;

  payments?: PaymentSummaryModel[];
}

export interface PartyModel {
  id: string;
  name: string;
  address?: string;
  taxId?: string;
  vessel?: string;
}

export interface InvoiceItemModel {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

export interface PaymentSummaryModel {
  paymentId: string;
  date: string;
  amount: number;
  method: string;
}

@Component({
  selector: 'app-invoice-document',
  imports: [DecimalPipe, CommonModule],
  standalone: true,
  templateUrl: './invoice-document.component.html',
  styleUrl: './invoice-document.component.css',
})
export class InvoiceDocumentComponent {
  @ViewChild('invoiceRef') invoiceRef!: ElementRef;
  /**
   * Invoice object
   * Snapshot of invoice data at time of viewing / printing
   */
  @Input() invoice!: InvoiceDocumentModel;

  /**
   * Invoice type
   * 'supplier' | 'customer'
   * Used to toggle labels, titles, and sections
   */
  @Input() type: 'supplier' | 'customer' = 'supplier';

  displayPreview: boolean = false;

  showPreview() {
    this.displayPreview = true;
  }

  closePreview() {
    this.displayPreview = false;
  }
}
