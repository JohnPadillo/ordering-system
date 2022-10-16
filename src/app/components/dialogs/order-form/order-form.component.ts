import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'src/app/interfaces/order.interface';
import { OrderService } from 'src/app/services/order.service';

enum OrderAction {
  ADD,
  UPDATE
}

const CREATE_MESSAGE = 'Order has been created successfully.'
const UPDATE_MESSAGE = 'Order has been updated successfully.'
const ERROR_MESSAGE = 'Something went wrong! Please try again.'

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  isProcessing = false;
  isUpdatingForm = false;
  action = OrderAction.ADD;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<OrderFormComponent>,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public order: Order
  ) {
    this.orderForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const { name } = this.order || {};
    if (name) {
      this.isUpdatingForm = true;
      this.action = OrderAction.UPDATE;
      this.orderForm.patchValue({ name });
    }
  }

  async onProcessOrder() {
    const { name } = this.orderForm.value;

    this.toggleProcessState();

    try {
      switch (this.action) {
        case OrderAction.UPDATE:
          this.order.name = name;
          await this.orderService.updateOrder(this.order)
          this.presentSnackbar(UPDATE_MESSAGE)
          break;
      
        default:
          await this.orderService.addOrder(name)
          this.presentSnackbar(CREATE_MESSAGE)
          break;
      }

    } catch (error) {
      this.presentSnackbar(ERROR_MESSAGE)
    } finally {
      this.toggleProcessState();
      this.closeDialog();
    }
  }

  presentSnackbar(message: string) {
    this.snackBar.open(message);
  }

  toggleProcessState() {
    this.isProcessing = !this.isProcessing;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
