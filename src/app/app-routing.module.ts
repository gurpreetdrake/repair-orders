import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';


const routes: Routes = [{path:'', component: OrdersComponent},
                        {path:'orders', component: OrdersComponent},
                        {path:'order-detail', component: OrderDetailComponent},
                        {path:'receive-order', component: AddOrderComponent},
                        {path:'edit-order', component: EditOrderComponent},
                        {path:'', redirectTo: '', pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
