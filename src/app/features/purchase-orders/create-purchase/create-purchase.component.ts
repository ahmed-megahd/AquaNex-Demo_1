import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { StepperModule } from 'primeng/stepper';
import { FormFieldComponent } from '../../../shared/components/form-input/form-field/form-field.component';
import { AutoComplete } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { value } from '@primeuix/themes/aura/knob';

@Component({
  selector: 'app-create-purchase',
  imports: [
    BreadcrumbModule,
    ButtonModule,
    ReactiveFormsModule,
    StepperModule,
    MultiSelectModule,
    SelectModule,
    DatePickerModule,
    FormFieldComponent,
    AutoComplete,
    FormsModule,
    TableModule,
  ],
  standalone: true,
  templateUrl: './create-purchase.component.html',
  styleUrl: './create-purchase.component.css',
})
export class CreatePurchaseComponent implements OnInit {
  private fb = inject(FormBuilder);
  items: MenuItem[] = [
    { label: 'Purchasing', routerLink: '/purchase-orders' },
    { label: 'Create Purchase Order' },
  ];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  assignedEmployees = [
    { name: 'Mostafa Mahmoud' },
    { name: 'Nader Shawky' },
    { name: 'Mohamed Gabalawy' },
  ];
  orderCategory = [
    { name: 'Provision' },
    { name: 'Bonded' },
    { name: 'Deck & Engine' },
    { name: 'Oil & Gas' },
    { name: 'Offshore Catering' },
    { name: 'Cabin Store' },
  ];
  orderStatus = [
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

  suppliers: any[] = [
    {
      id: 1,
      supplierName: 'Supplier A',
      supplierAddress: '123 Main Street',
      supplierEmail: 'john@managera.com',
      supplierPhone: '+123456789',
    },
    {
      id: 2,
      supplierName: 'Supplier B',
      supplierAddress: '456 Ocean Drive',
      supplierEmail: 'jane@managerb.com',
      supplierPhone: '+987654321',
    },
  ];

  currencys = [
    { name: 'USD - United States Dollar' },
    { name: 'EURO' },
    { name: 'Pounds' },
    { name: 'LE - Egyptian Pounds' },
  ];

  cities = [{ name: 'Suez' }, { name: 'Port-Said' }, { name: 'Damietta' }];

  deliveryMethods = [
    { name: 'Onboard Delivery' },
    { name: 'Port Delivery' },
    { name: 'Courier' },
    { name: 'Company Delivery' },
    { name: 'Pickup' },
  ];

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
  orderForm = this.fb.group({
    assignedEmployee: ['', Validators.required],
    orderCategory: ['', Validators.required],
    creationDate: ['', Validators.required],
    quoteNumber: ['', Validators.required],
    status: ['', Validators.required],
    paymentStatus: ['', Validators.required],
    // shipManager: this.fb.control<ShipManager | null>(null, {
    //   validators: Validators.required,
    // }),
    supplierName: this.fb.control<any | null>(null, {
      validators: Validators.required,
    }),

    // supplierName: ['', Validators.required],
    supplierAddress: ['', Validators.required],
    // contactPerson: ['', Validators.required],
    supplierEmail: ['', Validators.required],
    supplierPhone: ['', Validators.required],

    paymentTerms: ['', Validators.required],
    paymentMethod: ['', Validators.required],
    invoiceAddress: ['', Validators.required],
    currency: ['', Validators.required],

    deliveryDate: ['', Validators.required],
    deliveryMethod: ['', Validators.required],
    deliveryAddress: ['', Validators.required],
    deliveryCity: ['', Validators.required],

    items: this.fb.array([this.createItem()]),
    netPrice: [0],
    discount: [0],
    deliveryCost: [0],
    additionalCost: [0],
    vat: [0],
    totalPrice: [0],
  });
  selectedSupplierData: any[] = [];
  ngOnInit(): void {
    // this.orderForm
    //   .get('supplierName')
    //   ?.valueChanges.subscribe((selectedSupplier) => {
    //     if (selectedSupplier) {
    //       this.selectedSupplierData = this.suppliers.map((supplier) => {
    //         selectedSupplier == supplier.supplierName;
    //       });
    //       console.log(this.selectedSupplierData);
    //       this.fillSupplierDetails(selectedSupplier);
    //     }
    //   });

    // Recalculate whenever items or summary fields change
    this.orderForm.valueChanges.subscribe(() => {
      this.updateSummary();
    });
  }
  fillSupplierDetails(supplier: any) {
    this.orderForm.patchValue({
      supplierAddress: supplier.compAddress,
      supplierEmail: supplier.contactEmail,
      supplierPhone: supplier.contactPhone,
    });
  }

  updateSummary() {
    const itemsArray = this.orderItems;
    const subtotal = itemsArray.controls.reduce((sum, row) => {
      const price = row.get('price')?.value || 0;
      const qty = row.get('quantity')?.value || 0;
      return sum + price * qty;
    }, 0);

    const discount = this.orderForm.get('discount')?.value || 0;
    const delivery = this.orderForm.get('deliveryCost')?.value || 0;
    const additional = this.orderForm.get('additionalCost')?.value || 0;
    const vat = this.orderForm.get('vat')?.value || 0;

    // discount as absolute value (you can change to % logic)
    const net = subtotal - discount;
    const vatAmount = (vat / 100) * net;

    const total = net + delivery + additional + vatAmount;

    this.orderForm.patchValue(
      {
        netPrice: subtotal,
        totalPrice: total,
      },
      { emitEvent: false } // prevent infinite loop
    );
  }

  get orderItems(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }
  createItem(): FormGroup {
    return this.fb.group({
      item: [''],
      description: [''],
      quantity: [1, Validators.required],
      price: [''],
      totalPrice: [''],
      unit: [{ value: '', disabled: true }],
    });
  }

  onSubmit(formGroup: FormGroup) {
    this.orderForm.get('paymentStatus')?.setValue('Un-paid');
    this.orderForm.get('status')?.setValue('Draft');

    // console.log(formGroup.getRawValue());
    console.log(formGroup.value);
  }

  searchItems(event: any) {
    const query = event.query.toLowerCase();
    this.filteredItems = this.itemOptions.filter(
      (item) =>
        item.name.toLowerCase().includes(query) &&
        !this.orderItems.value.some((row: any) => row.item === item.name)
    );
  }

  //ITEMS MAPPING SELECT OPTION
  onItemSelect(event: any) {
    const selectedItem = event;

    // Create the new item group
    const itemGroup = this.fb.group({
      item: [selectedItem.value.name],
      description: [selectedItem.value.description],
      unit: [selectedItem.value.unit],
      quantity: [1, Validators.required],
      price: [selectedItem.value.price],
      totalPrice: [selectedItem.value.price * 1],
    });

    itemGroup.get('quantity')?.valueChanges.subscribe((qty) => {
      const price = itemGroup.get('price')?.value || 0;
      itemGroup.get('totalPrice')?.setValue(price * qty!, { emitEvent: false });
    });

    itemGroup.get('price')?.valueChanges.subscribe((price) => {
      const qty = itemGroup.get('quantity')?.value || 0;
      itemGroup.get('totalPrice')?.setValue(price * qty, { emitEvent: false });
    });

    const itemsArray = this.orderItems;

    // Check if first row is empty (item field is not filled)
    if (itemsArray.length === 0) {
      itemsArray.push(itemGroup);
    } else {
      const firstItem = itemsArray.at(0).get('item')?.value;
      if (!firstItem) {
        itemsArray.setControl(0, itemGroup);
      } else {
        itemsArray.push(itemGroup);
      }
    }

    this.searchInput = '';
  }

  addItemRow(): void {
    this.orderItems.push(this.createItem());
  }

  removeItemRow(index: number): void {
    this.orderItems.removeAt(index);
  }
}
