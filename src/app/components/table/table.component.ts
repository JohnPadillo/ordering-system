import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order, OrderStatus } from 'src/app/interfaces/order.interface';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ConfirmationComponent } from '../dialogs/confirmation/confirmation.component';
import { OrderFormComponent } from '../dialogs/order-form/order-form.component';

const DELETE_MESSAGE = 'Order has been deleted.';
const APPROVED_MESSAGE = 'Order has been approved.';
const REJECTED_MESSAGE = 'Order has been rejected.';
const ERROR_MESSAGE = 'Something went wrong! Please try again.';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  orders: Order[] = [];
  tableHeaders = ['item', 'name', 'status', 'action'];
  isAdmin: boolean | undefined;
  
  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public authService: AuthService
  ) {
    this.authService.user$.subscribe(user => {
      this.isAdmin = user?.isAdmin;
    })
    this.orderService.getOrders().subscribe(orders => this.orders = orders);
  }

  ngOnInit(): void {
  }

  onAddOrder() {
    this.dialog.open(OrderFormComponent, {
      width: '50%'
    });
  }

  onEditOrder(order: Order) {
    this.dialog.open(OrderFormComponent, {
      width: '50%',
      data: order
    });
  }

  onApproveOrder(order: Order) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Approve Order',
        message: 'Are you sure you want to reject this order?'
      }
    });

    dialogRef.afterClosed().subscribe(async (res) => {
      if (res) {
        try {
          order.status = OrderStatus.APPROVED;
          await this.orderService.updateOrder(order);
          this.presentSnackbar(APPROVED_MESSAGE);
        } catch (error) {
          this.presentSnackbar(ERROR_MESSAGE);
        }
      }
    });
  }

  onRejectOrder(order: Order) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Reject Order',
        message: 'Are you sure you want to reject this order?'
      }
    });

    dialogRef.afterClosed().subscribe(async (res) => {
      if (res) {
        try {
          order.status = OrderStatus.REJECTED;
          await this.orderService.updateOrder(order);
          this.presentSnackbar(REJECTED_MESSAGE);
        } catch (error) {
          this.presentSnackbar(ERROR_MESSAGE);
        }
      }
    });
  }

  onDeleteOrder(id: string) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Delete Order',
        message: 'Are you sure you want to delete this order?'
      }
    });

    dialogRef.afterClosed().subscribe(async (res) => {
      if (res) {
        try {
          await this.orderService.deleteOrder(id);
          this.presentSnackbar(DELETE_MESSAGE);
        } catch (error) {
          this.presentSnackbar(ERROR_MESSAGE);
        }
      }
    });
  }

  presentSnackbar(message = '') {
    this.snackBar.open(message);
  }

  isCTADisabled(order: Order): Boolean {
    if (order.status == OrderStatus.APPROVED || order.status == OrderStatus.REJECTED) {
      return true;
    }

    return false;
  }
}
