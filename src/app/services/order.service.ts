import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Order } from 'src/app/interfaces/order.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firestore: Firestore, 
    private afs: AngularFirestore) { }

  getOrders() {
    // const orderRef = collection(this.firestore, 'orders');
    // return collectionData(orderRef) as Observable<Order[]> ;
    return this.afs.collection('orders', query => query
      .orderBy('createdAt', 'desc')
    ).valueChanges({idField: 'id'}) as Observable<Order[]>;
  }

  addOrder(name: string) {
    const orderRef = collection(this.firestore, 'orders');
    return addDoc(orderRef, {
      name,
      status: 'pending',
      createdAt: Timestamp.fromDate(new Date())
    });
  };

  updateOrder(order: Order) {
    const orderRef = doc(this.firestore, `orders/${order.id}`);
    return updateDoc(orderRef, {
      ...order
    });
  }

  deleteOrder(id: string) {
    const orderRef = doc(this.firestore, `orders/${id}`);
    return deleteDoc(orderRef);
  }
}
