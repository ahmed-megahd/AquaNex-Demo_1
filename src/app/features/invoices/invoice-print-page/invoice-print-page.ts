import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  InvoiceDocumentComponent,
  InvoiceDocumentModel,
} from '../invoice-document/invoice-document.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-invoice-print-page',
  imports: [InvoiceDocumentComponent],
  templateUrl: './invoice-print-page.component.html',
})
export class InvoicePrintPageComponent implements OnInit, OnDestroy {
  invoice!: InvoiceDocumentModel;
  type!: 'supplier' | 'customer';

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    // if (!this.invoice) {
    //   window.close();
    // }

    const stored = localStorage.getItem('print_invoice');

    if (!stored) {
      this.router.navigate(['/invoices']);
      return;
    }

    this.invoice = JSON.parse(stored);

    // ✅ Correct way: read from query params
    this.route.queryParams.subscribe((params) => {
      this.type = params['type'] === 'customer' ? 'customer' : 'supplier';
    });

    setTimeout(() => window.print(), 300);

    window.onafterprint = () => {
      localStorage.removeItem('print_invoice');
    };
  }

  ngOnDestroy(): void {
    localStorage.removeItem('print_invoice');
  }
}
