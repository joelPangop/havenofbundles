import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, Platform} from '@ionic/angular';
import {StorageService} from '../../services/storage.service';
import {AuthenticationService} from '../../services/authentication.service';
import {CartService} from '../../services/cart.service';
import {environment} from '../../models/environments';
import {ItemCart} from '../../models/ItemCart';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  ip: string;
  quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  shippingPrice = 7.89;

  constructor(public platform: Platform,
              private storageService: StorageService,
              public authService: AuthenticationService,
              private loadCtrl: LoadingController,
              public cartService: CartService,
              private menuCtrl: MenuController,
              private pageService: PageService) {
  }

  async ngOnInit() {
    await this.menuCtrl.enable(false);
    this.ip = environment.api_url;
  }

  async changePriceByColor(item: ItemCart, option) {
    switch (option) {
      case 'color':
        if (item.color === 'gold' && item.can_extra) {
          item.amount += 20;
        }
        if (item.can_extra && item.color === 'black') {
          item.amount -= 20;
        }
        await this.storageService.setObject('cart', this.cartService.itemsInCart);
        break;
      case 'length':
        for (let rate of item.product.rates) {
          if (rate.length === item.length) {
            item.amount = rate.price;
          }
        }
        if (item.color === 'gold' && item.can_extra) {
          item.amount += 20;
        }
        if (item.can_extra && item.color === 'black') {
          item.amount -= 20;
        }
        await this.storageService.setObject('cart', this.cartService.itemsInCart);
        break;
    }
  }

  async removeProduct(item: ItemCart, index){
    await this.cartService.removeProduct(item, index);
  }

  getSubTotal(): number{
    let result = 0;
    for(let item of this.cartService.itemsInCart){
      result += item.amount;
    }
    return result;
  }

  getTotalWithTax(): number{
    return this.getSubTotal() * 0.15;
  }

  getTotal():number {
    return this.getSubTotal() + this.getTotalWithTax() + this.shippingPrice;
  }

  async changePriceQty(item: ItemCart) {
    let price = 0;

    for (let rate of item.product.rates) {
      if (rate.length === item.length) {
        price = rate.price;
      }
    }
    item.amount = item.qty * price;
    await this.storageService.setObject('cart', this.cartService.itemsInCart);
  }

  getLengths(item: ItemCart){
    let result = [];
    for(let rate of item.product.rates){
      result.push(rate.length);
    }
    return result;
  }

  getPriceForOne(item: ItemCart){
    let price = 0;

    for (let rate of item.product.rates) {
      if (rate.length === item.length) {
        price = rate.price;
      }
    }

    return price;
  }

  async goToDetail(id: string) {
    this.pageService.view = 'product-view';
    // await this.router.navigateByUrl("/product-view/"+id);
    this.pageService.parameter = id;
  }

  goToCheckout() {

  }

  payWithPaypal() {

  }
}
