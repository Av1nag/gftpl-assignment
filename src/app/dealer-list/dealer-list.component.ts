import { Component, Inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Customer } from '../models';
import { DealerDataService } from '../dealer-data.service';
import { CommonModule } from '@angular/common';

export interface DealerIdForDialog {
  dealerId: number;
  name: string,
  email:string,
  gstin: string,
}

@Component({
  selector: 'app-dealer-list',
  standalone: true,
  imports: [
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './dealer-list.component.html',
  styleUrls: ['./dealer-list.component.css'],
})
export class DealerListComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'gstin',
    'edit-or-delete',
  ];
  dataSource: any;

  constructor(
    private dealerData: DealerDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.readData();
  }

  openEditDialog(id: any): void {
    // Find the customer object with the given ID
    const selectedCustomer = this.dataSource.find((customer: any) => customer.id === id);
  
    if (selectedCustomer) {
      this.dialog.open(DealerDataEditDialog, {
        height: '65%',
        data: {
          dealerId: selectedCustomer.id,
          name: selectedCustomer.name,
          email: selectedCustomer.email,
          gstin: selectedCustomer.gstin,
        },
      });
    } else {
      console.error('Customer not found');
    }
  }
  
  openDeleteDialog(id: any): void {
    this.dialog.open(DealerDataDeleteDialog, {
      width: '25%',
      data: { dealerId: id },
    });
  }

  openCreateDialog() {
    this.dialog.open(NewDealerCreateDialog, {
      height: '65%',
    });
  }

  readData() {
    this.dealerData.getCustomers<Customer[]>().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (error) => {
        console.error('Failed to fetch data:', error);
        // Optionally, handle error responses here
      },
    });
  }
}

@Component({
  selector: 'dealer-data-edit-dialog',
  templateUrl: 'dealer-data-edit-dialog.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DealerDataEditDialog {
  dealerId?: number;
  name?: string;
  email?: string;
  gstin?: string;

  constructor(
    public dialogRef: MatDialogRef<DealerDataEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DealerIdForDialog,
    private dealerDataService: DealerDataService
  ) {}

  ngOnInit() {
    this.dealerId = this.data.dealerId;
    this.name = this.data.name;
    this.email = this.data.email;
    this.gstin = this.data.gstin;
  }

  editDealer() {
    this.dealerDataService
      .updateUserDetails(this.dealerId, {
        name: this.name,
        email: this.email,
        gstin: this.gstin,
      })
      .subscribe({
        next: (data) => {
          console.log('success ' + JSON.stringify(data));
        },
        error: (error) => {
          console.error('Failed to update dealer:', error);
          // Optionally, handle error responses here
        },
      });
  }
}

@Component({
  selector: 'dealer-data-delete-dialog',
  templateUrl: 'dealer-data-delete-dialog.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
})
export class DealerDataDeleteDialog {
  dealerId?: number;

  constructor(
    public dialogRef: MatDialogRef<DealerDataDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DealerIdForDialog,
    private dealerDataService: DealerDataService
  ) {}

  ngOnInit() {
    this.dealerId = this.data.dealerId;
  }

  deleteDealer() {
    this.dealerDataService.deleteUser(this.dealerId).subscribe({
      next: (data) => {
        console.log('success ' + JSON.stringify(data));
      },
      error: (error) => {
        console.error('Failed to delete dealer:', error);
        // Optionally, handle error responses here
      },
    });
  }
}

@Component({
  selector: 'dealer-data-create-dialog',
  templateUrl: 'dealer-data-create-dialog.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class NewDealerCreateDialog {
  dealerId?: number;
  name: string = '';
  email: string = '';
  gstin: string = '';

  constructor(
    public dialogRef: MatDialogRef<NewDealerCreateDialog>,
    private dealerDataService: DealerDataService
  ) {}

  createUser() {
    this.dealerDataService
      .createUser({
        name: this.name,
        email: this.email,
        gstin: this.gstin,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error('Failed to create dealer:', error);
          // Optionally, handle error responses here
        },
      });
  }
}
