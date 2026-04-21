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
import {
  COUNTRIES,
  PORTS,
  TRADEROUTES,
  VESSELSTATUS,
  VESSELTYPE,
} from '../../../shared/constants/maritime.constants';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-add-vessel',
  imports: [
    ButtonModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    FormFieldComponent,
    MultiSelectModule,
    SelectModule,
    DatePickerModule,
  ],
  standalone: true,
  templateUrl: './add-vessel.component.html',
})
export class AddVesselComponent {
  private fb = inject(FormBuilder);
  countries = COUNTRIES;
  type = VESSELTYPE;
  status = VESSELSTATUS;
  ports = PORTS;
  tradeRoutes = TRADEROUTES;

  items: MenuItem[] = [
    { label: 'Vessels', routerLink: '/vessels' },
    { label: 'Add New Vessel' },
  ];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  vesselForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    IMO: [, Validators.required],
    MMSI: [],
    callSign: [''],
    flag: [''],
    grossTonage: [''],

    status: ['', Validators.required],
    homePort: [''],
    currentPort: [''],
    tradeRoute: [''],
    dryDockDate: [''],

    owner: ['', Validators.required],
    manager: ['', Validators.required],
    email: ['', Validators.required],
    phone: [,],
    captainName: [''],
    captainPhone: [,],
    captainEmail: [''],
  });

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
