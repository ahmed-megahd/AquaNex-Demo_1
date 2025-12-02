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
import { BadgeDirective } from 'primeng/badge';

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
    BadgeDirective,
  ],
  standalone: true,
  templateUrl: './create-sales-order.component.html',
  styleUrl: './create-sales-order.component.css',
})
export class CreateSalesOrderComponent {
  private fb = inject(FormBuilder);

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
    items: this.fb.array([this.createItem()]),
    netPrice: [0],
    discount: [0],
    deliveryCost: [0],
    additionalCost: [0],
    vat: [0],
    totalPrice: [0],
  });

  ngOnInit() {
    this.orderForm
      .get('shipManager')
      ?.valueChanges.subscribe((selectedManager) => {
        if (selectedManager) {
          this.availableVessels = selectedManager.vessels || [];
          this.fillShipManagerDetails(selectedManager);

          this.orderForm.patchValue({ imoNum: '' });
        }
      });

    this.orderForm.get('vesselName')?.valueChanges.subscribe((vessel: any) => {
      if (vessel) {
        this.orderForm.patchValue({ imoNum: vessel.imo });
      }
    });

    // Recalculate whenever items or summary fields change
    this.orderForm.valueChanges.subscribe(() => {
      this.updateSummary();
    });
  }

  fillShipManagerDetails(manager: any) {
    this.orderForm.patchValue({
      compAddress: manager.compAddress,
      contactPerson: manager.contactPerson,
      contactEmail: manager.contactEmail,
      contactPhone: manager.contactPhone,
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

  onSubmit(formGroup: FormGroup) {
    this.orderForm.get('paymentStatus')?.setValue('Un-paid');
    this.orderForm.get('salesStatus')?.setValue('Draft');

    // console.log(formGroup.getRawValue());
    console.log(formGroup.value);
  }
}

// onItemSelect(event: any) {
//   console.log(event);
//   const selectedItem = event;
//   const itemGroup = this.fb.group({
//     item: [selectedItem.value.name],
//     quantity: [1, Validators.required],
//     price: [selectedItem.value.price],
//     unit: [selectedItem.value.unit],
//   });

//   this.orderItems.push(itemGroup);
// }
