import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { FormFieldComponent } from '../../../shared/components/form-input/form-field/form-field.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-add-vessel',
  imports: [
    ButtonModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    FormFieldComponent,
    MultiSelectModule,
    SelectModule,
  ],
  standalone: true,
  templateUrl: './add-vessel.component.html',
})
export class AddVesselComponent {
  private fb = inject(FormBuilder);

  items: MenuItem[] = [
    { label: 'Vessels', routerLink: '/vessels' },
    { label: 'Add New Vessel' },
  ];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  vesselForm = this.fb.group({
    name: ['', Validators.required],
    IMO: [, Validators.required],
    type: ['', Validators.required],
    flag: ['', Validators.required],
    tag: ['', Validators.required],
    owner: ['', Validators.required],
    manager: ['', Validators.required],
    email: ['', Validators.required],
    phone: [, Validators.required],
    captainName: [''],
    captainPhone: [,],
    captainEmail: [''],
  });

  type = [
    { name: 'Other', value: 'Other' },
    { name: 'Cargo', value: 'Cargo' },
    { name: 'Container', value: 'Container' },
    { name: 'Tanker', value: 'Tanker' },
    { name: 'BulkCarrier', value: 'Bulk Carrier' },
    { name: 'Offshore', value: 'Offshore' },
    { name: 'Naval', value: 'Naval' },
    { name: 'Yacht', value: 'Yacht' },
  ];

  owners = [
    { name: 'MSC', value: 'MSC' },
    { name: 'MAERSC', value: 'MAERSC' },
    { name: 'Red-Sea', value: 'Red-Sea' },
    { name: 'El-Mahrosa', value: 'El-Mahrosa' },
  ];

  managers = [
    { name: 'MSC-Party', value: 'MSC-Party' },
    { name: 'MAERSC--On', value: 'MAERSC--On' },
  ];

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
