import {Component} from '@angular/core';
import {LoadingController, MenuController, Platform} from '@ionic/angular';
import {Plugins} from '@capacitor/core';
import {StorageService} from './services/storage.service';
import {AuthenticationService} from './services/authentication.service';
import {CartService} from './services/cart.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {environment} from './models/environments';
import {Rate} from './models/Product';
import {ItemCart} from './models/ItemCart';
import {Router} from '@angular/router';

const {Storage, Device} = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [
    trigger('cartBadge', [
      state('idle', style({
        opacity: '0.3',
        transform: 'scale(1)'
      })),
      state('adding', style({
        opacity: '1',
        transform: 'scale(1.3)'
      })),
      transition('idle <=> adding', animate('300ms linear')),
      transition('void => *', [
        style({transform: 'translateX(200%)'}),
        animate('300ms ease-in-out')
      ])
    ]),
    trigger('addButton', [
      state('idle', style({
        opacity: '0.3'
      })),
      state('adding', style({
        opacity: '1',
        fontWeight: 'bold'
      })),
      transition('idle <=> adding', animate('300ms linear')),
      transition('void => *', [
        style({transform: 'translateX(200%)'}),
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class AppComponent {
  ip: string;
  public color: any;
  public length: any;
  public rate: Rate;
  quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  shippingPrice = 7.89

  constructor(public platform: Platform,
              private storageService: StorageService,
              public authService: AuthenticationService,
              private loadCtrl: LoadingController,
              public cartService: CartService,
              private menuCtrl: MenuController,
              private router: Router) {
    this.storageService.getObject('user').then((res) => {
      console.log(res);
      this.authService.currentUser = res;
    });
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      this.ip = environment.api_url;
      const info = await Device.getInfo();
      await this.storageService.setObject('Device', info);
      const app = document.getElementsByClassName('app');
      if (!this.platform.is('ios') && !this.platform.is('android')) {
        app[0].setAttribute('style', ' background-color: #222222;\n' +
          '  display: block;\n' +
          '  margin-left: 10%;\n' +
          '  margin-right: 10%;\n' +
          '  width: 80%;');
      }
    });
  }

  async logOut() {
    const load = await this.loadCtrl.create();
    await load.present();
    this.authService.logout(load);
  }

  async openCart() {
    await this.menuCtrl.open("cart")
  }

  async closeCart(){
    await this.menuCtrl.close("cart");
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

  goToCart(){
    this.router.navigate(['/cart']);
  }
}
