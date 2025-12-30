import { Component, inject } from '@angular/core';
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
  ],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css',
})
export class CreateCustomerComponent {
  private fb = inject(FormBuilder);
  items: MenuItem[] = [
    { label: 'Customers', routerLink: '/customers' },
    { label: 'Create Sales Order' },
  ];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  assignedEmployees = [
    { name: 'Mostafa Mahmoud' },
    { name: 'Nader Shawky' },
    { name: 'Mohamed Gabalawy' },
  ];

  type = [{ name: 'Ship Owner' }, { name: 'Ship Manager' }];

  regCountry = [{ name: 'Panama' }, { name: 'China' }];

  countries = [{ name: 'Germany' }, { name: 'England' }];

  paymentTerms = [{ name: 'Net 30' }, { name: 'Net 60' }, { name: 'Net 90' }];
  paymentMethods = [
    { name: 'Cash' },
    { name: 'Bank Transfer' },
    { name: 'Credit Card' },
    { name: 'Cheque' },
  ];
  currencys = [
    { name: 'USD - United States Dollar' },
    { name: 'EURO' },
    { name: 'Pounds' },
    { name: 'LE - Egyptian Pounds' },
  ];

  timeZones = [
    { name: '+1:00' },
    { name: '+2:00' },
    { name: '+3:00' },
    { name: '+4:00' },
  ];

  cstForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    regCountry: ['', Validators.required],
    vat: ['', Validators.required],
    address: ['', Validators.required],
    city: [''],
    country: ['', Validators.required],
    website: [''],
    timeZone: [''],

    contact: ['', Validators.required],
    title: [''],
    email: ['', Validators.required],
    phone: ['', Validators.required],

    pyTerms: ['', Validators.required],
    pyMethod: ['', Validators.required],
    currency: ['', Validators.required],
    billingAddress: ['', Validators.required],

    accountManager: ['', Validators.required],
    cstAge: [''],
  });

  onSubmit(formGroup: FormGroup) {
    // this.orderForm.get('paymentStatus')?.setValue('Un-paid');
    // this.orderForm.get('salesStatus')?.setValue('Draft');

    // console.log(formGroup.getRawValue());
    console.log(formGroup.value);
  }
}
