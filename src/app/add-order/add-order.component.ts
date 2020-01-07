import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MasterApiService } from '../service/master-api.service';
import { TransactionApiService } from '../service/transaction-api.service';
import { OrderModel } from '../model/ordermodel';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  item: OrderModel;
  customers: any;
  products: any;
  employees: any;

  constructor(
    private masterApiSrv: MasterApiService,
    private transactionApiSrv: TransactionApiService,
    private location: Location) {

  }

  ngOnInit() {
    this.item = new OrderModel;
    this.fetchMasters();
    this.item.orderNo = 1234;
    this.item.rma = 678;
    this.item.receivingDate = new Date().toISOString().substring(0, 10);
  }

  fetchMasters() {
    this.masterApiSrv.getItems('customers').subscribe((res) => {
      this.customers = res;
      this.item.customer = res[0]['id'];
    });

    this.masterApiSrv.getItems('products').subscribe((res) => {
      this.products = res;
      this.item.product = res[0]['id'];
    });

    this.masterApiSrv.getItems('employees').subscribe((res) => {
      this.employees = res;
      this.item.employee = res[0]['id'];
    })
  }

  saveItem() {
    this.transactionApiSrv.addItem('orders', this.item)
      .subscribe((res) => {
        // console.log("Add Response:" + res.toString());
        this.location.back();
      })
  }

}
