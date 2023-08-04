import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from '../checkout.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IOrder, IOrderToCreate } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  submitOrder() {
    // get basket value
    const basket = this.basketService.getCurrentBasketValue();
    // create order from basket
    const orderToCreate = this.getOrderToCreate(basket);
    // create order via service
    this.checkoutService.createOrder(orderToCreate).subscribe((order: IOrder) => {
      this.toastr.success('Order successfully created.')
    }, error => {
      this.toastr.error(error.message);
      console.log(error);
    })
  }
  
  getOrderToCreate(basket: IBasket): IOrderToCreate {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm
        .get('deliveryForm')
        .get('deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('addressForm').value,
    };
  }
}
