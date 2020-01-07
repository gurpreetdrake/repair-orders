import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MasterApiService } from '../service/master-api.service';
import { TransactionApiService } from '../service/transaction-api.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  item: any;
  customers: any;
  products: any;
  employees: any;

  constructor(private masterApiSrv: MasterApiService,
    private transactionApiSrv: TransactionApiService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(param => {
        this.fetchOrder(param['id'])
      });
  }

  fetchOrder(id: string) {
    this.transactionApiSrv.getItemById('orders', id)
      .subscribe((res) => {
        this.item = res;
        this.fetchMasters();
      })
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

  updateItem(data: any) {
    this.transactionApiSrv.updateItem('orders', data)
      .subscribe((res) => {
        console.log("Update Response:" + res.toString());
        this.location.back();
      })
  }

}
