import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabsModule } from 'primeng/tabs';
import { DataTableComponent } from '../../../shared/components/data-table/data-table/data-table.component';
import { Router } from '@angular/router';
import { VesselsService } from '../vessels.service';
import { MenuItem } from 'primeng/api';
import { Status } from '../../../shared/models/menuItem.model';

@Component({
  selector: 'app-vessels',
  imports: [
    Breadcrumb,
    MultiSelectModule,
    ButtonModule,
    FormsModule,
    TabsModule,
    DataTableComponent,
  ],
  standalone: true,
  templateUrl: './vessels.component.html',
})
export class VesselsComponent implements OnInit {
  private router = inject(Router);
  private vesselsService = inject(VesselsService);

  items: MenuItem[] = [{ label: 'Customers', routerLink: '/customers' }];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  //Filtering properties
  vesselType!: Status[];
  selectedVesselType!: Status;

  vesselStatus!: Status[];
  selectedVesselStatus!: Status;

  hasOutstanding!: Status[];
  selectedHasOutstanding!: Status;

  vessels: any[] = [];
  filteredVessels: any[] = [];

  tabs: { title: string; value: string }[] = [];

  columns = [
    { field: 'ID', header: 'ID' },
    { field: 'name', header: 'Vessel' },
    { field: 'IMO', header: 'IMO' },
    { field: 'type', header: 'Type' },
    { field: 'customer', header: 'Owner/Operator' },
    { field: 'totalSOs', header: 'Total Orders' },
    { field: 'totalInvoices', header: 'Total Invoices' },
    { field: 'outstandingBalance', header: 'Outstanding Balance' },
    { field: 'status', header: 'Status' },
  ];

  ngOnInit(): void {
    this.vesselsService.getProducts().subscribe((data) => {
      this.vessels = data;
      this.filteredVessels = [...this.vessels];
    });
    this.vesselType = [
      { name: 'All', value: 'All' },
      { name: 'Cargo', value: 'Cargo' },
      { name: 'Container', value: 'Container' },
      { name: 'Tanker', value: 'Tanker' },
      { name: 'BulkCarrier', value: 'Bulk Carrier' },
      { name: 'Offshore', value: 'Offshore' },
      { name: 'Naval', value: 'Naval' },
      { name: 'Yacht', value: 'Yacht' },
    ];

    this.vesselStatus = [
      { name: 'Active', value: 'Active' },
      { name: 'In-Active', value: 'Inactive' },
    ];

    this.hasOutstanding = [
      { name: 'All', value: 'All' },
      { name: 'Unpaid', value: 'Unpaid' },
      { name: 'Paid', value: 'Paid' },
      { name: 'OverPaid', value: 'Overpaid' },
    ];

    this.tabs = [
      { title: 'All', value: 'All' },
      { title: 'Active', value: 'Active' },
      { title: 'Inactive', value: 'Inactive' },
    ];
  }
  openNew() {
    this.router.navigate(['vessels/create']);
  }

  onSearch() {
    console.log(this.selectedVesselType);
    console.log(this.selectedVesselStatus);
    console.log(this.selectedHasOutstanding);
  }

  onTabChange(status: string) {
    if (status === 'All') {
      this.filteredVessels = [...this.vessels];
    } else {
      this.filteredVessels = this.vessels.filter(
        (vessel) => vessel.status === status
      );
    }
  }

  handleEdit(vessel: any) {
    console.log('Edit vessel', vessel);
    // Open modal or navigate to edit screen
  }

  handleDelete(vessel: any) {
    console.log('Delete vessel', vessel);
    // Show confirmation dialog, then delete
  }

  handleBulkDelete(vessels: any[]) {
    console.log('Delete selected vessels', vessels);
  }

  onViewVessel(vessel: any) {
    console.log(vessel);
    this.router.navigate(['vessels/view', vessel.ID]);
  }
}
