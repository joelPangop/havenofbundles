import {Component, OnInit} from '@angular/core';
import {Rate} from '../../models/Product';
import {LoadingController, MenuController, Platform} from '@ionic/angular';
import {StorageService} from '../../services/storage.service';
import {AuthenticationService} from '../../services/authentication.service';
import {CartService} from '../../services/cart.service';
import {environment} from '../../models/environments';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.page.html',
  styleUrls: ['./cart-view.page.scss'],
})
export class CartViewPage implements OnInit {

  ip: string;
  quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  shippingPrice = 7.89;

  constructor(public platform: Platform,
              private storageService: StorageService,
              public authService: AuthenticationService,
              private loadCtrl: LoadingController,
              public cartService: CartService,
              private menuCtrl: MenuController) {
  }

  async ngOnInit() {
    await this.menuCtrl.enable(false);
    this.ip = environment.api_url;

  }

}
