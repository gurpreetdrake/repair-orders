import { Component, OnInit } from '@angular/core';
import { TransactionApiService } from '../service/transaction-api.service';
import { MasterApiService } from '../service/master-api.service';
import { OrderModel } from '../model/ordermodel';

import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'filter'
})

@Injectable()
export class FilterPipe implements PipeTransform {
    transform(items: any[], field: string, value: string): any {
        if (!items) {
            return [];
        }
        if (!field || !value) {
            return items;
        }
        return items.filter(singleItem => singleItem[field].includes(value));
    }
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any = [];
  customers: any = [];
  products: any = [];
  employees: any = [];
  loadingData: Boolean = false;
  displayedColumns: string[] = ["orderNo", "customer", "modelNo", "serialNo", "rma", "employee", "receiveingDate", "deliveryDate", 'action1', 'action2', 'action3'];


  constructor(private transactionApiSrv: TransactionApiService,
    private masterApiSrv: MasterApiService) { }

  ngOnInit() {
    this.fetchMasters();
    this.fetchItems();
  }

  fetchItems() {
    this.loadingData = true;
    this.transactionApiSrv.getItems('orders')
      .subscribe(
        (data) => {
          this.loadingData = false;
          this.orders = data;
        },
        (error) => {
          console.log("Error; get orders: ", error);
          this.loadingData = false;
        }
      );
  }

  fetchMasters() {
    this.masterApiSrv.getItems('customers').subscribe((res) => {
      this.customers = res;
    });

    this.masterApiSrv.getItems('products').subscribe((res) => {
      this.products = res;
    });

    this.masterApiSrv.getItems('employees').subscribe((res) => {
      this.employees = res;
    })
  }

  deleteItem(id: number) {
    this.transactionApiSrv.deleteItem('orders', id)
      .subscribe((res) => {
        console.log("Delete Response:" + res.toString());
        this.fetchItems();
      })
  }

}
