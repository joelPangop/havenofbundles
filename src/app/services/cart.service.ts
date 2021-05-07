import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/Product';
import {AuthenticationService} from './authentication.service';
import {StorageService} from './storage.service';
import {ItemCart} from '../models/ItemCart';
import {ItemStatus} from '../models/ItemStatus';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  itemsInCart: ItemCart[] = [];
  cartBadgeState: string = 'idle';

  constructor(private http: HttpClient, private authSrv: AuthenticationService, private storageService: StorageService) {
     this.loadCart();
  }

  async loadCart(){
    this.itemsInCart = await this.storageService.getObject('cart') as unknown as [];
    if(!this.itemsInCart) {
      this.itemsInCart = []
    }
    return this.itemsInCart;
  }

  async addToCart(item: ItemCart): Promise<boolean> {
    let added: boolean = false;
    item.addButtonState = 'adding';
    this.cartBadgeState = 'adding';

    if (this.itemsInCart.length === 0) {
      this.itemsInCart.push(item);
      await this.storageService.setObject('cart', this.itemsInCart);
      added = true;
    } else {
      let names: string[] = [];
      this.itemsInCart.forEach(d => {
        names.push(d.product.name);
      });
      item.amount += item.amount;
      if (!names.includes(item.product.name)) {
        item.status = ItemStatus.ORDERED;
        this.itemsInCart.push(item);
        added = true;
      } else {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.itemsInCart.length; i++) {
          const element: ItemCart = this.itemsInCart[i];
          if (item.product._id === element.product._id) {
            // le panier contient déjà cette article
            element.qty += 1;
            element.amount += item.amount;
            added = true;
          }
        }
      }
      await this.storageService.setObject('cart', this.itemsInCart);
    }
    // this.lengths = [];
    //
    // for(let item of this.itemsInCart){
    //   this.lengths.push(item.length);
    // }
    return added;
  }

  async removeProduct(item: ItemCart, index) {
    for (let it of this.itemsInCart) {
      if (it.product._id === item.product._id) {
        // this.cartItemCount.next(this.cartItemCount.value - 1);
        this.itemsInCart.splice(index, 1);
        // this.setCartItemCount(this.cartItems.length);
        // this.total = this.total - (item.qty * item.amount);
        // // this.event.publish('cartItemCount', this.cartItems.length);
        await this.storageService.setObject('cart', this.itemsInCart);
      }
    }
  }

  addToCartFinished(item: ItemCart){
    this.cartBadgeState = 'idle';
    item.addButtonState = 'idle';
  }

}
