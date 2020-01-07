import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterApiService } from '../service/master-api.service';
import { TransactionApiService } from '../service/transaction-api.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  item: any;
  customer: any;
  product: any;
  employee: any;

  constructor(private route: ActivatedRoute,
    private masterApiSrv: MasterApiService,
    private transactionApiSrv: TransactionApiService
  ) { }

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
        this.fetchCustomer(this.item.customer);
        this.fetchProduct(this.item.product);
        this.fetchEmployee(this.item.employee);
      })
  }

  fetchCustomer(id: string) {
    this.masterApiSrv.getItemById('customers', id)
      .subscribe((res) => {
        this.customer = res;
      });
  }

  fetchProduct(id: string) {
    this.masterApiSrv.getItemById('products', id)
      .subscribe((res) => {
        this.product = res;
      });
  }

  fetchEmployee(id: string) {
    this.masterApiSrv.getItemById('employees', id)
      .subscribe((res) => {
        this.employee = res;
      });
  }

}
