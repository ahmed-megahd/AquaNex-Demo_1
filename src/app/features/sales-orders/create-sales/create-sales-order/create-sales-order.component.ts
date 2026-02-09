import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { FormFieldComponent } from '../../../../shared/components/form-input/form-field/form-field.component';
import { MultiSelectModule } from 'primeng/multiselect';
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
import { AutoComplete } from 'primeng/autocomplete';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';

export interface Vessel {
  id: number;
  name: string;
  imo: string;
}

export interface ShipManager {
  id: number;
  name: string;
  compAddress: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  vessels: Vessel[];
}

@Component({
  selector: 'app-create-sales-order',
  imports: [
    ButtonModule,
    BreadcrumbModule,
    FormFieldComponent,
    MultiSelectModule,
    SelectModule,
    ReactiveFormsModule,
    DatePickerModule,
    StepperModule,
    TableModule,
    FormsModule,
    AutoComplete,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './create-sales-order.component.html',
  styleUrl: './create-sales-order.component.css',
})
export class CreateSalesOrderComponent {
  private fb = inject(FormBuilder);

  baseTotal = 0;
  sellingTotal = 0;
  grossProfit = 0;
  netProfit = 0;

  items: MenuItem[] = [
    { label: 'Sales', routerLink: '/sales-orders' },
    { label: 'Create Sales Order' },
  ];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  assignedEmployees = [
    { name: 'Mostafa Mahmoud' },
    { name: 'Nader Shawky' },
    { name: 'Mohamed Gabalawy' },
  ];
  salesOrderCategory = [
    { name: 'Provision' },
    { name: 'Bonded' },
    { name: 'Deck & Engine' },
    { name: 'Oil & Gas' },
    { name: 'Offshore Catering' },
    { name: 'Cabin Store' },
  ];
  purchaseOrders = [
    { name: 'PO-2289101' },
    { name: 'PO-2189201' },
    { name: 'PO-3189201' },
  ];
  salesStatus = [
    { name: 'Draft' },
    { name: 'In-progress' },
    { name: 'Delivered' },
    { name: 'Invoiced' },
    { name: 'Closed' },
    { name: 'Cancelled' },
  ];
  paymentStatus = [{ name: 'Paid' }, { name: 'Partial' }, { name: 'Un-paid' }];
  paymentTerms = [{ name: 'Net 30' }, { name: 'Net 60' }, { name: 'Net 90' }];
  paymentMethods = [
    { name: 'Cash' },
    { name: 'Bank Transfer' },
    { name: 'Credit Card' },
    { name: 'Cheque' },
  ];
  shipManagers: ShipManager[] = [
    {
      id: 1,
      name: 'Manager A',
      compAddress: '123 Main Street',
      contactPerson: 'John Doe',
      contactEmail: 'john@managera.com',
      contactPhone: '+123456789',
      vessels: [
        { id: 1, name: 'Vessel A1', imo: 'IMO12345' },
        { id: 2, name: 'Vessel A2', imo: 'IMO67890' },
      ],
    },
    {
      id: 2,
      name: 'Manager B',
      compAddress: '456 Ocean Drive',
      contactPerson: 'Jane Smith',
      contactEmail: 'jane@managerb.com',
      contactPhone: '+987654321',
      vessels: [{ id: 3, name: 'Vessel B1', imo: 'IMO54321' }],
    },
  ];

  availableVessels: Vessel[] = [];

  currencys = [
    { name: 'USD - United States Dollar' },
    { name: 'EURO' },
    { name: 'Pounds' },
    { name: 'LE - Egyptian Pounds' },
  ];

  deliveryMethods = [
    { name: 'Onboard Delivery' },
    { name: 'Port Delivery' },
    { name: 'Courier' },
    { name: 'Company Delivery' },
    { name: 'Pickup' },
  ];

  cities = [{ name: 'Suez' }, { name: 'Port-Said' }, { name: 'Damietta' }];

  rows: any[] = [{ item: '', quantity: 1 }];
  itemOptions = [
    {
      name: 'Apple',
      description: 'A 1Kg of fresh red apples',
      unit: 'kg',
      price: 3,
    },
    {
      name: 'Apple',
      description: 'A 1Kg of fresh red apples',
      unit: 'kg',
      price: 3,
    },
    { name: 'Apple', unit: 'kg', price: 3 },
    { name: 'Apple', unit: 'kg', price: 3 },
    { name: 'Apple', unit: 'kg', price: 3 },
    { name: 'Apple', unit: 'kg', price: 3 },
    { name: 'Apple', unit: 'kg', price: 3 },
    { name: 'Apple', unit: 'kg', price: 3 },
    { name: 'Apple', unit: 'kg', price: 3 },
    { name: 'Apple', unit: 'kg', price: 3 },
    { name: 'Apple', unit: 'kg', price: 3 },
    { name: 'Apple', unit: 'kg', price: 3 },
    { name: 'Apple', unit: 'kg', price: 3 },
    { name: 'Apple', unit: 'kg', price: 3 },
    { name: 'Apple', unit: 'kg', price: 3 },
    { name: 'Apple', unit: 'kg', price: 3 },
    { name: 'Banana', unit: 'bunch', price: 5 },
    { name: 'Orange', unit: 'kg', price: 4 },
  ];

  searchInput: any = null;

  filteredItems: any[] = [];
  // addRow() {
  //   this.rows.push({ item: '', quantity: 1 });
  // }

  orderForm = this.fb.group({
    assignedEmployee: ['', Validators.required],
    salesOrderCategory: ['', Validators.required],
    creationDate: ['', Validators.required],
    quoteNumber: ['', Validators.required],
    purchaseOrders: ['', Validators.required],
    salesStatus: ['', Validators.required],
    paymentStatus: ['', Validators.required],
    shipManager: this.fb.control<ShipManager | null>(null, {
      validators: Validators.required,
    }),
    compAddress: ['', Validators.required],
    contactPerson: ['', Validators.required],
    contactEmail: ['', Validators.required],
    contactPhone: ['', Validators.required],
    vesselName: ['', Validators.required],
    imoNum: ['', Validators.required],
    paymentTerms: ['', Validators.required],
    paymentMethod: ['', Validators.required],
    invoiceAddress: ['', Validators.required],
    currency: ['', Validators.required],
    deliveryDate: ['', Validators.required],
    deliveryMethod: ['', Validators.required],
    deliveryAddress: ['', Validators.required],
    deliveryCity: ['', Validators.required],
    items: this.fb.array([]),

    generalMargin: [0],
    netPrice: [0],
    discount: [0],
    deliveryCost: [0],
    additionalCost: [0],
    vat: [0],
    totalPrice: [0],
  });

  ngOnInit(): void {
    // 1. Ship manager → vessels + autofill contact info
    this.orderForm.get('shipManager')?.valueChanges.subscribe((manager) => {
      if (!manager) return;

      this.availableVessels = manager.vessels || [];
      this.fillShipManagerDetails(manager);
      this.orderForm.patchValue({ imoNum: '' });
    });

    // 2. Vessel → IMO autofill
    this.orderForm.get('vesselName')?.valueChanges.subscribe((vessel: any) => {
      if (vessel) {
        this.orderForm.patchValue({ imoNum: vessel.imo });
      }
    });

    // // 3. General margin → propagate to items (unless overridden)
    this.orderForm.get('generalMargin')?.valueChanges.subscribe(() => {
      this.applyGeneralMarginToItems();
    });

    // // 4. Order summary recalculation trigger
    // This listens to ANY meaningful change (items, discounts, VAT, etc.)
    this.orderForm.valueChanges.subscribe(() => {
      this.recalculateAllFinancials();
    });

    // this.orderItems.valueChanges.subscribe(() => {
    //   this.updateBaseAndSellingTotals();
    //   this.updateNetProfit();
    // });

    // this.orderForm.valueChanges.subscribe(() => {
    //   this.updateNetProfit();
    // });
  }

  fillShipManagerDetails(manager: any) {
    this.orderForm.patchValue({
      compAddress: manager.compAddress,
      contactPerson: manager.contactPerson,
      contactEmail: manager.contactEmail,
      contactPhone: manager.contactPhone,
    });
  }

  //Profit calculation
  private updateBaseAndSellingTotals(): void {
    let base = 0;
    let selling = 0;

    this.orderItems.controls.forEach((row) => {
      const qty = Number(row.get('quantity')?.value) || 0;
      const basePrice = Number(row.get('price')?.value) || 0;
      const margin = Number(row.get('itemMargin')?.value) || 0;

      const sellingPrice = basePrice + (basePrice * margin) / 100;

      base += basePrice * qty;
      selling += sellingPrice * qty;
    });

    this.baseTotal = this.roundMoney(base);
    this.sellingTotal = this.roundMoney(selling);
    this.grossProfit = this.roundMoney(selling - base);
  }

  private updateNetProfit(): void {
    const delivery = Number(this.orderForm.get('deliveryCost')?.value) || 0;
    const additional = Number(this.orderForm.get('additionalCost')?.value) || 0;
    const discount = Number(this.orderForm.get('discount')?.value) || 0;

    this.netProfit = this.roundMoney(
      this.grossProfit - delivery - additional - discount
    );
  }

  //Margin calculation
  private resolveMargin(row?: FormGroup): number {
    if (!row) return 0;

    const rowMargin = row.get('itemMargin')?.value;
    const generalMargin = this.orderForm?.get('generalMargin')?.value;

    return rowMargin !== null && rowMargin !== undefined && rowMargin !== ''
      ? Number(rowMargin) || 0
      : Number(generalMargin) || 0;
  }

  resetItemMargin(row: FormGroup): void {
    row.get('isMarginOverridden')?.setValue(false, {
      emitEvent: false,
    });

    const generalMargin =
      Number(this.orderForm.get('generalMargin')?.value) || 0;

    row.get('itemMargin')?.setValue(generalMargin);
  }

  applyGeneralMarginToItems(): void {
    const generalMargin =
      Number(this.orderForm.get('generalMargin')?.value) || 0;

    this.orderItems.controls.forEach((row) => {
      const fg = row as FormGroup;

      if (!fg.get('isMarginOverridden')?.value) {
        fg.get('itemMargin')?.setValue(generalMargin, { emitEvent: false });
      }
    });

    this.recalculateAllFinancials(); // 🔥 THIS replaces ngOnInit triggers
  }

  //Items creation & search
  get orderItems(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  searchItems(event: any) {
    const query = event.query.toLowerCase();
    this.filteredItems = this.itemOptions.filter(
      (item) =>
        item.name.toLowerCase().includes(query) &&
        !this.orderItems.value.some((row: any) => row.item === item.name)
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
    const generalMargin =
      Number(this.orderForm.get('generalMargin')?.value) || null;

    const rowMargin =
      data?.itemMargin != null ? data.itemMargin : generalMargin;

    const isOverridden = data?.itemMargin != null;

    const row = this.fb.group({
      item: [data?.item || ''],
      description: [data?.description || ''],
      unit: [{ value: data?.unit || '', disabled: true }],
      quantity: [data?.quantity ?? 1, Validators.required],
      price: [data?.price ?? 0],
      itemMargin: [rowMargin],
      isMarginOverridden: [isOverridden],
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

    row.get('itemMargin')?.valueChanges.subscribe(() => {
      row.get('isMarginOverridden')?.setValue(true, { emitEvent: false });
      this.recalculateAllFinancials(); // 🔥 REQUIRED
    });
  }

  private updateRowTotal(row?: FormGroup): void {
    if (!row) return;

    const qty = Number(row.get('quantity')?.value) || 0;
    const basePrice = Number(row.get('price')?.value) || 0;
    const margin = this.resolveMargin(row);

    const sellingPrice = basePrice + (basePrice * margin) / 100;

    row.get('totalPrice')?.setValue(this.roundMoney(sellingPrice * qty), {
      emitEvent: false,
    });
  }

  removeItemRow(index: number): void {
    this.orderItems.removeAt(index);
    this.recalculateAllFinancials();
  }

  resetItems(): void {
    this.orderItems.clear();
    this.recalculateAllFinancials();
    this.orderForm.patchValue(
      {
        generalMargin: 0,
      },
      { emitEvent: false }
    );
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

  //Financials
  updateSummary(): void {
    const subtotal = this.orderItems.controls.reduce((sum, row) => {
      return sum + (Number(row.get('totalPrice')?.value) || 0);
    }, 0);

    const discount = Number(this.orderForm.get('discount')?.value) || 0;
    const delivery = Number(this.orderForm.get('deliveryCost')?.value) || 0;
    const additional = Number(this.orderForm.get('additionalCost')?.value) || 0;
    const vat = Number(this.orderForm.get('vat')?.value) || 0;

    const net = subtotal - discount;
    const vatAmount = (vat / 100) * net;
    const total = net + delivery + additional + vatAmount;

    this.orderForm.patchValue(
      {
        netPrice: this.roundMoney(subtotal),
        totalPrice: this.roundMoney(total),
      },
      { emitEvent: false }
    );
  }

  private recalculateAllFinancials(): void {
    // 1. Row totals
    this.orderItems.controls.forEach((row) => {
      this.updateRowTotal(row as FormGroup);
    });

    // 2. Base, selling, gross
    this.updateBaseAndSellingTotals();

    // 3. Net profit
    this.updateNetProfit();

    // 4. Net & total price
    this.updateSummary();
  }

  //Utility Method
  private roundMoney(value: number, decimals = 3): number {
    return (
      Math.round((value + Number.EPSILON) * Math.pow(10, decimals)) /
      Math.pow(10, decimals)
    );
  }
  //Form submission
  onSubmit(formGroup: FormGroup) {
    this.orderForm.get('paymentStatus')?.setValue('Un-paid');
    this.orderForm.get('salesStatus')?.setValue('Draft');

    // console.log(formGroup.getRawValue());
    console.log(formGroup.value);
  }
}
