import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { FormFieldComponent } from '../../../../shared/components/form-input/form-field/form-field.component';
import { DatePickerModule } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-create-expense',
  standalone: true,
  imports: [
    ButtonModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    FormFieldComponent,
    DatePickerModule,
    MultiSelectModule,
    SelectModule,
  ],
  templateUrl: './create-expense.component.html',
  styleUrl: './create-expense.component.css',
})
export class CreateExpenseComponent implements OnInit {
  private fb = inject(FormBuilder);
  subCategoryOptions: { name: string; value: string }[] = [];

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      date: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      department: ['', Validators.required],
      relatedOrders: [[], Validators.required],
      total: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],

      customer: ['', Validators.required],
      paymentMethod: ['', Validators.required],
    });
    this.expenseForm
      .get('category')
      ?.valueChanges.subscribe((selectedCategory) => {
        if (selectedCategory) {
          this.subCategoryOptions = this.subCategoryMap[selectedCategory] || [];
        } else {
          this.subCategoryOptions = [];
        }

        this.expenseForm.get('subCategory')?.reset();
      });
  }
  items: MenuItem[] = [
    { label: 'Expenses', routerLink: '/expenses' },
    { label: 'Add New Expense' },
  ];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  categoryOptions = [
    { name: 'Utilities', value: 'Utilities' },
    {
      name: 'Rent & Property-Related Expenses',
      value: 'Rent & Property-Related Expenses',
    },
    { name: 'Salaries & Wages', value: 'Salaries & Wages' },
    { name: 'Logistics & Transportation', value: 'Logistics & Transportation' },
    {
      name: 'Office & Adminstrative Expenses',
      value: 'Office & Adminstrative Expenses',
    },
    { name: 'Insurance', value: 'Insurance' },
    { name: 'Taxes & Fees', value: 'Taxes & Fees' },
    { name: 'Repairs & Maintenance', value: 'Repairs & Maintenance' },
    { name: 'Professional Services', value: 'Professional Services' },
    { name: 'Marketing & Sales', value: 'Marketing & Sales' },
    { name: 'Training & Development', value: 'Training & Development' },
    { name: 'Travel Expenses', value: 'Travel Expenses' },
    {
      name: 'Compliance & Certifications',
      value: 'Compliance & Certifications',
    },
  ];
  subCategoryMap: { [key: string]: { name: string; value: string }[] } = {
    Utilities: [
      { name: 'Electricity Bill', value: 'Electricity Bill' },
      { name: 'Water Bill', value: 'Water Bill' },
      { name: 'Gas Bill', value: 'Gas Bill' },
      { name: 'Internet Bill', value: 'Internet Bill' },
    ],
    'Rent & Property-Related Expenses': [
      { name: 'Warehouse Rent', value: 'Warehouse Rent' },
      { name: 'Office Rent', value: 'Office Rent' },
      { name: 'Storage Facility Costs', value: 'Storage Facility Costs' },
      {
        name: 'Property Maintenance & Repairs',
        value: 'Property Maintenance & Repairs',
      },
      { name: 'Security Services', value: 'Security Services' },
    ],
    'Salaries & Wages': [
      { name: 'Employee Salaries', value: 'Employee Salaries' },
      { name: 'Overtime Pay', value: 'Overtime Pay' },
      { name: 'Payroll Taxes', value: 'Payroll Taxes' },
      {
        name: 'Benefits (Health Insurance)',
        value: 'Benefits (Health Insurance)',
      },
      {
        name: 'Benefits (Retirement Contributions)',
        value: 'Benefits (Retirement Contributions)',
      },
    ],
    'Logistics & Transportation': [
      { name: 'Vehicle Insurance', value: 'Vehicle Insurance' },
      { name: 'Shipping & Freight Costs', value: 'Shipping & Freight Costs' },
      {
        name: 'Rental of Transport Equipment or Containers',
        value: 'Rental of Transport Equipment or Containers',
      },
    ],
    'Office & Adminstrative Expenses': [
      { name: 'Office Supplies', value: 'Office Supplies' },
      { name: 'Software License', value: 'Software License' },
      {
        name: 'Office Equipment Maintenance',
        value: 'Office Equipment Maintenance',
      },
      { name: 'Adminstrative Costs', value: 'Adminstrative Costs' },
    ],
    Insurance: [
      {
        name: 'General Liability Insurance',
        value: 'General Liability Insurance',
      },
      { name: 'Marine & Cargo Insurance', value: 'Marine & Cargo Insurance' },
      {
        name: 'Property & Vehicle Insurance',
        value: 'Property & Vehicle Insurance',
      },
    ],
    'Taxes & Fees': [
      {
        name: 'Business Taxes ( Corporate Tax, VAT, etc )',
        value: 'Business Taxes ( Corporate Tax, VAT, etc )',
      },
      { name: 'Import / Export Duties', value: 'Import / Export Duties' },
      { name: 'Port Fees', value: 'Port Fees' },
      {
        name: 'Other Regulatory or Compilance Fees',
        value: 'Other Regulatory or Compilance Fees',
      },
    ],
    'Repairs & Maintenance': [
      { name: 'Equipment Repairs', value: 'Equipment Repairs' },
      { name: 'Vehicle Maintenance', value: 'Vehicle Maintenance' },
      {
        name: 'Routine Maintenance for Facilities',
        value: 'Routine Maintenance for Facilities',
      },
    ],
    'Professional Services': [
      {
        name: 'Accounting & Auditing Services',
        value: 'Accounting & Auditing Services',
      },
      { name: 'Legal Fees', value: 'Legal Fees' },
      { name: 'Consultancy Fees', value: 'Consultancy Fees' },
      { name: 'IT Services & Maintenance', value: 'IT Services & Maintenance' },
    ],
    'Marketing & Sales': [
      { name: 'Advertising', value: 'Advertising' },
      { name: 'Sales Promotion', value: 'Sales Promotion' },
    ],
    'Training & Development': [
      {
        name: 'Employee Training Programs',
        value: 'Employee Training Programs',
      },
      {
        name: 'Certifications & Professional Development',
        value: 'Certifications & Professional Development',
      },
    ],
    'Travel Expenses': [
      { name: 'Business Travel Costs', value: 'Business Travel Costs' },
      {
        name: 'Meals & Entertainment in Trips',
        value: 'Meals & Entertainment in Trips',
      },
    ],
    'Compliance & Certifications': [
      {
        name: 'Fees for Obtaining Certifications',
        value: 'Fees for Obtaining Certifications',
      },
      { name: 'Inspection & Audit Fees', value: 'Inspection & Audit Fees' },
    ],
    // ... etc
  };

  departmentsOptions = [
    { name: 'Operations', value: 'Operations' },
    { name: 'Logistics & Transportation', value: 'Logistics & Transportation' },
    { name: 'Procurement', value: 'Procurement' },
    { name: 'Finance & Accounting', value: 'Finance & Accounting' },
    { name: 'HR', value: 'HR' },
    { name: 'Adminstration', value: 'Adminstration' },
    { name: 'Marketing & Sales', value: 'Marketing & Sales' },
    { name: 'IT', value: 'IT' },
  ];

  paymentMethod = [
    { name: 'Bank transfer' },
    { name: 'Cheque' },
    { name: 'Cash' },
    { name: 'Stripe' },
  ];

  linkedOrders = [{ name: 'SO-2025-090-11' }];

  customers = [{ name: 'El-Tarek' }];

  expenseForm = this.fb.group({
    date: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    subCategory: ['', Validators.required],
    department: ['', Validators.required],
    relatedOrders: [[], Validators.required],
    total: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],

    customer: ['', Validators.required],
    paymentMethod: ['', Validators.required],
    // vendorInvoice: ['', Validators.required],
    // vendorAddress: ['', Validators.required],
    // vendorEmail: ['', Validators.required],
    // vendorPhone: ['', Validators.required],
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
