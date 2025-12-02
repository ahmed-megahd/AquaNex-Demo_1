import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FormFieldComponent } from '../../../shared/components/form-input/form-field/form-field.component';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-create-supplier',
  imports: [
    BreadcrumbModule,
    FormFieldComponent,
    ReactiveFormsModule,
    ButtonModule,
    SelectModule,
    MultiSelectModule,
  ],
  standalone: true,
  templateUrl: './create-supplier.component.html',
  styleUrl: './create-supplier.component.css',
})
export class CreateSupplierComponent {
  private fb = inject(FormBuilder);
  items: MenuItem[] = [
    { label: 'Suppliers', routerLink: '/suppliers' },
    { label: 'Add New Supplier' },
  ];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  categories = [
    { name: 'Provision', value: 'Provision' },
    { name: 'Bonded', value: 'Bonded' },
    { name: 'Cabin Store', value: 'Cabin' },
    { name: 'Deck & Engine', value: 'deck-engine' },
    { name: 'Gas & Chemicals', value: 'gas-chemicals' },
    { name: 'Catering Services', value: 'Catering' },
    { name: 'Other', value: 'Others' },
  ];

  supplierForm = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    phone: [0, Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required],
    taxID: [''],

    paymentTerms: ['', Validators.required],
    paymentMethod: ['', Validators.required],
    billingAddress: ['', Validators.required],
  });

  paymentMethod = [
    { name: 'Bank transfer' },
    { name: 'Cheque' },
    { name: 'Cash' },
    { name: 'Stripe' },
  ];

  paymentTerms = [{ name: 'Net 30' }, { name: 'Net 60' }, { name: 'Net 90' }];

  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    // Allow only digits (0–9)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
  }
}
