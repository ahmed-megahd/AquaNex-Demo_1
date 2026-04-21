import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { FormFieldComponent } from '../../../../shared/components/form-input/form-field/form-field.component';
import { DatePickerModule } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { MenuItem, MessageService } from 'primeng/api';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table/data-table.component';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-create-inflow-payments',
  imports: [
    ButtonModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    FormFieldComponent,
    DatePickerModule,
    MultiSelectModule,
    SelectModule,
    TextareaModule,
    DataTableComponent,
    DatePipe,
    CurrencyPipe,
    TagModule,
    InputNumberModule,
    MessageModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './create-inflow-payments.component.html',
  standalone: true,
})
export class CreateInflowPaymentsComponent implements OnInit {
  private fb = inject(FormBuilder);

  items: MenuItem[] = [
    { label: 'Customer Payments', routerLink: '/inflow-payments' },
    { label: 'Record New Payment' },
  ];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  ngOnInit(): void {
    this.paymentForm.get('totalAmount')?.valueChanges.subscribe((value) => {
      this.totalPaymentAmount = value || 0;
      console.log('Total Payment Amount updated:', this.totalPaymentAmount);
    });
  }

  paymentForm = this.fb.group({
    paymentNumber: ['', Validators.required],
    paymentDate: ['', Validators.required],
    paymentMethod: ['', Validators.required],
    paymentType: ['', Validators.required],

    customerName: ['', Validators.required],
    customerCode: ['', Validators.required],
    vesselName: ['', Validators.required],
    vesselImo: ['', Validators.required],
    customerBankName: ['', Validators.required],
    customerBankNumber: ['', Validators.required],
    customerBankIBAN: [''],
    customerPoRef: [''],

    currency: ['', Validators.required],
    exchangeRate: [''],
    totalAmount: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    discountAmount: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    netAmount: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    unappliedAmount: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    withholdingTax: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    bankCharges: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],

    receiverBankName: ['', Validators.required],
    receiverAccountNumber: [''],
    receiverIBAN: [''],
    receiverSWIFT: [''],
    receiverBranch: [''],
    receiverCurrency: [''],
    referenceNumber: [''],
    depositDate: ['', Validators.required],

    remarks: [''],

    createdBy: ['Mohamed Mohsen'],
    createdDate: ['25/03/2026'],
    lastModifiedBy: ['-'],
    approvalStatus: ['Pending Approval'],
  });

  paymentMethod = [
    { name: 'Bank transfer' },
    { name: 'Wire transfer' },
    { name: 'Cheque / Check' },
    { name: 'Cash' },
    { name: 'Credit Card' },
    { name: 'Online Payment' },
  ];

  paymentType = [
    { name: 'Invoice Payment' },
    { name: 'Advance Payment' },
    { name: 'Deposit' },
    { name: 'Others' },
  ];

  customers = [
    { name: 'MAERSC' },
    { name: 'Happag Loyd' },
    { name: 'Red Sea LTD.' },
    { name: 'Ocean 12 LTD.' },
    { name: 'MSC' },
    { name: 'Qatari N' },
  ];

  vessels = [{ name: 'Red Land 12' }, { name: 'Advance 1000' }];

  customerBanks = [{ name: 'Main LTD HSBC' }, { name: 'DR CIB LTD' }];
  companyBanks = [
    { name: '1001 Main Account CIB' },
    { name: '1001 DR Account Al-Ahly' },
  ];
  currency = [
    { name: 'USD - US Dollar' },
    { name: 'EUR - Euro' },
    { name: 'GBP - British Pound' },
    { name: 'LE - Egyptian Pounds' },
    { name: 'AED - UAE Dirham' },
  ];

  //Invoices allocation

  invoiceColumn = [
    { field: 'invoiceID', header: 'Invoice #' },
    { field: 'date', header: 'Invoice Date' },
    { field: 'vessel', header: 'Vessel' },
    { field: 'salesOrder', header: ' Order Ref' },
    { field: 'invoiceTotal', header: ' Invoice Amount' },
    { field: 'outstanding', header: 'Outstanding' },
  ];

  invoices: any[] = [
    {
      id: 1,
      invoiceID: 'INV-11928-110',
      date: '25/03/2020',
      vessel: 'Sea Wheel',
      salesOrder: 'SO-1190-199',
      invoiceTotal: 1000,
      outstanding: 100,
      amountToPay: 0,
    },
    {
      id: 2,
      invoiceID: 'INV-11928-111',
      date: '25/03/2020',
      vessel: 'Sea Wheel',
      salesOrder: 'SO-1190-109',
      invoiceTotal: 2000,
      outstanding: 1000,
      amountToPay: 0,
    },
  ];

  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    // Allow only digits (0–9)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  onSubmit(form: FormGroup) {}

  selectedInvoices: any[] = [];
  totalPaymentAmount: number = 0;
  outstandingInvoices: any[] = [];

  // handleInvoiceSelection() {
  //   // Initialize amountToPay for newly selected invoices
  //   this.selectedInvoices.forEach((invoice) => {
  //     if (!invoice.amountToPay) {
  //       invoice.amountToPay = 0;
  //     }
  //   });
  // }

  // autoAllocate() {
  //   let remaining = this.totalPaymentAmount;

  //   this.selectedInvoices.forEach((invoice) => {
  //     if (remaining >= invoice.outstanding) {
  //       invoice.amountToPay = invoice.outstanding;
  //       remaining -= invoice.outstanding;
  //     } else {
  //       invoice.amountToPay = remaining;
  //       remaining = 0;
  //     }
  //   });

  //   this.validateAllocation();
  // }

  // payFull(invoice: any) {
  //   invoice.amountToPay = invoice.outstanding;
  //   this.validateAllocation();
  // }

  // getTotalAllocated(): number {
  //   return this.selectedInvoices.reduce(
  //     (sum, inv) => sum + (inv.amountToPay || 0),
  //     0,
  //   );
  // }

  // getUnallocatedAmount(): number {
  //   return this.totalPaymentAmount - this.getTotalAllocated();
  // }

  // validateAllocation() {
  //   // Add validation logic
  //   const totalAllocated = this.getTotalAllocated();
  //   if (totalAllocated > this.totalPaymentAmount) {
  //     // Show error
  //     console.error('Allocated amount exceeds payment amount');
  //   }
  // }

  // Called when selection changes
  handleInvoiceSelection() {
    console.log('Selected invoices:', this.selectedInvoices);
    // Initialize amountToPay for newly selected invoices
    this.selectedInvoices.forEach((invoice) => {
      if (!invoice.amountToPay) {
        invoice.amountToPay = 0;
      }
    });
  }

  autoAllocate() {
    let remaining = this.totalPaymentAmount;

    this.selectedInvoices.forEach((invoice) => {
      if (remaining >= invoice.outstanding) {
        invoice.amountToPay = invoice.outstanding;
        remaining -= invoice.outstanding;
      } else {
        invoice.amountToPay = remaining;
        remaining = 0;
      }
    });

    this.validateAllocation();
  }

  payFull(invoice: any) {
    invoice.amountToPay = invoice.outstanding;
    this.validateAllocation();
  }

  getTotalAllocated(): number {
    return this.selectedInvoices.reduce(
      (sum, inv) => sum + (inv.amountToPay || 0),
      0,
    );
  }

  getUnallocatedAmount(): number {
    return this.totalPaymentAmount - this.getTotalAllocated();
  }

  validateAllocation() {
    const totalAllocated = this.getTotalAllocated();
    if (totalAllocated > this.totalPaymentAmount) {
      console.error('Allocated amount exceeds payment amount');
    }
  }
}
