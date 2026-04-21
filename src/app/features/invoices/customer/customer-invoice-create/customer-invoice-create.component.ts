import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { FormFieldComponent } from '../../../../shared/components/form-input/form-field/form-field.component';
import { SelectModule } from 'primeng/select';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { StepperModule } from 'primeng/stepper';
import { TableModule } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoComplete } from 'primeng/autocomplete';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-customer-invoice-create',
  imports: [
    ButtonModule,
    BreadcrumbModule,
    FormFieldComponent,
    SelectModule,
    MultiSelectModule,
    ReactiveFormsModule,
    DatePickerModule,
    StepperModule,
    TableModule,
    FormsModule,
    AutoComplete,
  ],
  standalone: true,
  templateUrl: './customer-invoice-create.component.html',
})
export class CustomerInvoiceCreateComponent implements OnInit {
  private fb = inject(FormBuilder);
  items: MenuItem[] = [
    { label: 'Customer Invoices', routerLink: '/customer-invoices' },
    { label: 'New Invoice' },
  ];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  searchInput: any = null;
  filteredItems: any[] = [];

  customers = [{ name: 'B.Tech' }, { name: 'Amazon' }, { name: 'El-Modeer' }];

  salesOrders = [
    { name: 'SO-2289101' },
    { name: 'SO-2189201' },
    { name: 'SO-3189201' },
  ];
  paymentTerms = [{ name: 'Net 30' }, { name: 'Net 60' }, { name: 'Net 90' }];

  currencys = [
    { name: 'USD - US Dollar' },
    { name: 'EUR - Euro' },
    { name: 'GBP - British Pound' },
    { name: 'LE - Egyptian Pounds' },
    { name: 'AED - UAE Dirham' },
  ];

  itemOptions = [
    {
      name: 'Apple',
      description: 'A 1Kg of fresh red apples',
      unit: 'kg',
      price: 3,
    },
    { name: 'Apple', unit: 'kg', price: 3 },
    { name: 'Banana', unit: 'bunch', price: 5 },
    { name: 'Orange', unit: 'kg', price: 4 },
  ];

  invoiceForm = this.fb.group({
    customer: ['', Validators.required],
    vessel: ['', Validators.required], //new
    IMO: ['', Validators.required], //new
    quotationNo: ['', Validators.required],
    invoiceAddress: ['', Validators.required],
    salesRep: [''],
    invoiceDate: [new Date(), Validators.required],
    dueDate: ['', Validators.required],
    salesOrder: ['', Validators.required],
    paymentTerms: ['', Validators.required],
    currency: ['', Validators.required],
    items: this.fb.array([]),
    remarks: [''],
    // summary
    netPrice: [0],
    discount: [0],
    deliveryCost: [0],
    additionalCost: [0],
    vat: [0],
    totalPrice: [0],
  });

  ngOnInit(): void {
    // Recalculate whenever items or summary fields change
    this.invoiceForm.valueChanges.subscribe(() => {
      this.updateSummary();
    });
  }

  onSubmit(formGroup: FormGroup) {
    // this.invoiceForm.get('paymentStatus')?.setValue('Un-paid');
    // this.invoiceForm.get('salesStatus')?.setValue('Draft');

    // console.log(formGroup.getRawValue());
    console.log(formGroup.value);
  }
  updateSummary() {
    const itemsArray = this.orderItems;
    const subtotal = itemsArray.controls.reduce((sum, row) => {
      const price = row.get('price')?.value || 0;
      const qty = row.get('quantity')?.value || 0;
      return sum + price * qty;
    }, 0);

    const discount = this.invoiceForm.get('discount')?.value || 0;
    const delivery = this.invoiceForm.get('deliveryCost')?.value || 0;
    const additional = this.invoiceForm.get('additionalCost')?.value || 0;
    const vat = this.invoiceForm.get('vat')?.value || 0;

    // discount as absolute value (you can change to % logic)
    const net = subtotal - discount;
    const vatAmount = (vat / 100) * net;

    const total = net + delivery + additional + vatAmount;

    this.invoiceForm.patchValue(
      {
        netPrice: this.roundMoney(subtotal),
        totalPrice: this.roundMoney(total),
      },
      { emitEvent: false }, // prevent infinite loop
    );
  }

  get orderItems(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  searchItems(event: any) {
    const query = event.query.toLowerCase();
    this.filteredItems = this.itemOptions.filter(
      (item) =>
        item.name.toLowerCase().includes(query) &&
        !this.orderItems.value.some((row: any) => row.item === item.name),
    );
  }

  onItemSelect(event: any): void {
    const item = event.value;

    const row = this.buildItemRow({
      item: item.name,
      description: item.description,
      unit: item.unit,
      price: item.price,
    });

    this.orderItems.push(row);
    this.updateRowTotal(row); // ✅ HERE
  }

  private buildItemRow(data?: any): FormGroup {
    const row = this.fb.group({
      item: [data?.item || ''],
      itemIMBA: [data?.itemIMBA || ''],
      description: [data?.description || ''],
      unit: [{ value: data?.unit || '', disabled: true }],
      quantity: [data?.quantity ?? 1, Validators.required],
      price: [data?.price ?? 0],
      totalPrice: [0],
    });

    this.attachRowListeners(row);
    this.updateRowTotal(row);

    return row;
  }

  private attachRowListeners(row: FormGroup): void {
    row.get('quantity')?.valueChanges.subscribe(() => {
      this.recalculateAllFinancials();
    });

    row.get('price')?.valueChanges.subscribe(() => {
      this.recalculateAllFinancials();
    });
  }

  private updateRowTotal(row?: FormGroup): void {
    if (!row) return;

    const qty = Number(row.get('quantity')?.value) || 0;
    const basePrice = Number(row.get('price')?.value) || 0;

    row
      .get('totalPrice')
      ?.setValue(this.roundMoney(basePrice * qty), { emitEvent: false });
  }

  removeItemRow(index: number): void {
    this.orderItems.removeAt(index);
  }

  resetItems(): void {
    this.orderItems.clear();
    this.recalculateAllFinancials();
  }

  //Item import logic
  onExcelImport(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e: any) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const rows = XLSX.utils.sheet_to_json<any>(sheet, {
        defval: '',
        raw: true,
      });

      this.importItemsFromExcel(rows);
    };

    reader.readAsBinaryString(file);
    event.target.value = '';
  }

  importItemsFromExcel(rows: any[]): void {
    const itemsArray = this.orderItems;
    // itemsArray.clear();

    rows.forEach((rowData) => {
      const row = this.buildItemRow({
        item: rowData.item,

        itemIMBA: rowData.itemIMBA,
        description: rowData.description,
        unit: rowData.unit,
        quantity: Number(rowData.quantity) || 1,
        price: Number(rowData.price) || 0,
        itemMargin:
          rowData['item_margin_%'] !== ''
            ? Number(rowData['item_margin_%'])
            : null,
      });

      itemsArray.push(row);
      // this.updateRowTotal(row); // ✅ HERE
    });

    this.recalculateAllFinancials();
  }

  private recalculateAllFinancials(): void {
    // 1. Row totals
    this.orderItems.controls.forEach((row) => {
      this.updateRowTotal(row as FormGroup);
    });
    // 4. Net & total price
    this.updateSummary();
  }

  //Utility Method
  private roundMoney(value: number, decimals = 2): number {
    return (
      Math.round((value + Number.EPSILON) * Math.pow(10, decimals)) /
      Math.pow(10, decimals)
    );
  }
}
