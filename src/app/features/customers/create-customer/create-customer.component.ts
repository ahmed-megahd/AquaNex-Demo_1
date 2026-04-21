import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { FormFieldComponent } from '../../../shared/components/form-input/form-field/form-field.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { MenuItem } from 'primeng/api';
import { StepperModule } from 'primeng/stepper';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import {
  COUNTRIES,
  CURRENCIES,
  EGYPTPORTS,
  PORTS,
} from '../../../shared/constants/maritime.constants';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [
    ButtonModule,
    BreadcrumbModule,
    FormFieldComponent,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    SelectModule,
    StepperModule,
    DatePickerModule,
    InputNumberModule,
  ],
  templateUrl: './create-customer.component.html',
})
export class CreateCustomerComponent {
  private fb = inject(FormBuilder);

  countries = COUNTRIES;
  ports = PORTS;
  egyptPorts = EGYPTPORTS;
  currencies = CURRENCIES;

  items: MenuItem[] = [
    { label: 'Customers', routerLink: '/customers' },
    { label: 'Create Sales Order' },
  ];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  type = [{ name: 'Ship Owner' }, { name: 'Ship Manager' }];

  assignedEmployees = [
    { name: 'Mostafa Mahmoud' },
    { name: 'Nader Shawky' },
    { name: 'Mohamed Gabalawy' },
  ];

  customerStatus = [
    { name: 'Active', code: 'ACTIVE' },
    { name: 'Inactive', code: 'INACTIVE' },
    { name: 'Prospect', code: 'PROSPECT' },
    { name: 'On Hold', code: 'ON_HOLD' },
    { name: 'Blacklisted', code: 'BLACKLISTED' },
  ];

  source = [
    { name: 'Direct Sales' },
    { name: 'Agent / Broker' },
    { name: 'Referral' },
    { name: 'Trade Exhibition' },
    { name: 'Online / Website' },
    { name: 'Tender / Bid' },
    { name: 'Returning Customer' },
  ];

  paymentTerms = [{ name: 'Net 30' }, { name: 'Net 60' }, { name: 'Net 90' }];
  paymentMethods = [
    { name: 'Cash' },
    { name: 'Bank Transfer' },
    { name: 'Credit Card' },
    { name: 'Cheque' },
  ];

  timeZones = [
    { name: '+1:00' },
    { name: '+2:00' },
    { name: '+3:00' },
    { name: '+4:00' },
  ];

  groupedPorts = Object.entries(
    this.ports.reduce(
      (acc, port) => {
        (acc[port.region] ??= []).push({
          name: `${port.name} (${port.code})`,
          code: port.code,
        });
        return acc;
      },
      {} as Record<string, { name: string; code: string }[]>,
    ),
  ).map(([region, ports]) => ({ region, ports }));

  cstForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    regCountry: [''],
    vat: [''],
    address: ['', Validators.required],
    city: [''],
    country: [''],
    website: [''],
    timeZone: [''],
    operationPort: [''],
    deliveryPort: [''],

    contact: ['', Validators.required],
    title: [''],
    email: ['', Validators.required],
    phone: ['', Validators.required],

    pyTerms: ['', Validators.required],
    pyMethod: ['', Validators.required],
    currency: [''],
    billingAddress: ['', Validators.required],
    creditLimit: [],

    accountManager: ['', Validators.required],
    cstAge: ['', Validators.required],
    source: [''],
    status: ['', Validators.required],

    notes: [''],
  });

  onSubmit(formGroup: FormGroup) {
    // this.orderForm.get('paymentStatus')?.setValue('Un-paid');
    // this.orderForm.get('salesStatus')?.setValue('Draft');

    // console.log(formGroup.getRawValue());
    console.log(formGroup.value);
  }
}
