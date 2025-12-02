import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

@Component({
  selector: 'app-data-table',
  imports: [
    TableModule,
    Tag,
    RouterModule,
    ButtonModule,

    MultiSelectModule,

    SelectModule,
    ToastModule,
    ToolbarModule,

    InputTextModule,
    TextareaModule,
    CommonModule,

    RatingModule,
    FormsModule,

    IconFieldModule,
    InputIconModule,
  ],
  standalone: true,

  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent {
  columns = input<Column[]>([]);
  selected = signal<any[]>([]);

  globalFilterFields = input<string[]>([]);
  selectionMode = input<'single' | 'multiple'>('multiple');
  exportable = input<boolean>(true);
  value = input<any[]>([]); // main data source

  // ✅ Output events
  @Output() onView = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onDeleteSelected = new EventEmitter<any[]>();

  // ✅ Global filter as a signal
  globalFilter = signal('');

  @ViewChild('dt') table!: Table;

  filterGlobal(event: Event) {
    const input = event.target as HTMLInputElement;
    this.table.filterGlobal(input.value, 'contains');
  }

  // ✅ Computed filtered data based on globalFilter and globalFilterFields
  filteredData = computed(() => {
    const search = this.globalFilter().toLowerCase();
    const data = this.value();
    const fields = this.globalFilterFields();

    if (!search || !fields?.length) return data;

    return data.filter((row) =>
      fields.some((field) =>
        String(row[field] ?? '')
          .toLowerCase()
          .includes(search)
      )
    );
  });

  // ✅ Handlers
  handleView(row: any) {
    this.onView.emit(row);
  }
  handleEdit(row: any) {
    this.onEdit.emit(row);
  }

  handleDelete(row: any) {
    this.onDelete.emit(row);
  }

  handleDeleteSelected(rows: any[]) {
    this.onDeleteSelected.emit(rows);
  }

  getSeverity(status: string): string {
    switch (status.toUpperCase()) {
      case 'PAID':
      case 'DELIVERED':
      case 'CLOSED':
        return 'success';
      case 'PARTIAL':
      case 'IN-PROGRESS':
      case 'PENDING':
        return 'warn';
      case 'OUTOFSTOCK':
      case 'UNPAID':
      case 'UN-PAID':
        return 'danger';
      case 'INVOICED':
        return 'info';
      default:
        return 'secondary'; // fallback
    }
  }
}
