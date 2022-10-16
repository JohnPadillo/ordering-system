import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderFormComponent } from 'src/app/components/dialogs/order-form/order-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isAdmin: boolean | undefined;

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  onAddOrder() {
    this.dialog.open(OrderFormComponent, {
      width: '50%'
    });
  }

}
