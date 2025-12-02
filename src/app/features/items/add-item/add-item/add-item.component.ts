import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { value } from '@primeuix/themes/aura/knob';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { FormFieldComponent } from '../../../../shared/components/form-input/form-field/form-field.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-add-item',
  imports: [
    Breadcrumb,
    ButtonModule,
    ReactiveFormsModule,
    FormFieldComponent,
    MultiSelectModule,
    SelectModule,
  ],
  standalone: true,
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css',
})
export class AddItemComponent {
  private fb = inject(FormBuilder);

  items: MenuItem[] = [
    { label: 'Items', routerLink: '/items' },
    { label: 'Add New Item' },
  ];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  category = [
    { name: 'Provision', value: 'Provision' },
    { name: 'Bonded', value: 'Bonded' },
    { name: 'Cabin', value: 'Cabin' },
    { name: 'Deck & Engine', value: 'Deck & Engine' },
    { name: 'Gas & Chemicals', value: 'Gas & Chemicals' },
    { name: 'Catering Services', value: 'Catering Services' },
  ];

  unit = [
    { name: 'Kg', value: 'Kg' },
    { name: 'Piece', value: 'Piece' },
    { name: 'Box', value: 'Box' },
    { name: 'Ml', value: 'Ml' },
    { name: 'Lt', value: 'Lt' },
  ];

  suppliers = [
    { name: 'B.tech', value: 'B.tech' },
    { name: 'Juhayna', value: 'Juhayna' },
    { name: 'El-Tarek', value: 'El-Tarek' },
  ];
  itemForm = this.fb.group({
    name: ['', Validators.required],
    IMBA: [0, Validators.required],
    description: ['', Validators.required],
    category: [Validators.required],
    unit: ['', Validators.required],
    lastPrice: [0],
    defaultSupplier: ['', Validators.required],
  });

  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    // Allow only digits (0–9)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  onSubmit(form: FormGroup) {}
}
