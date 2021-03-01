import {Component, OnInit} from '@angular/core';
import {Product, Rate} from "../../models/Product-interface";
import {LoadingController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-rate-view',
  templateUrl: './rate-view.page.html',
  styleUrls: ['./rate-view.page.scss'],
})
export class RateViewPage implements OnInit {

  rates: Rate[];
  rate: Rate;
  color = '';
  public product: Product;
  price = 0;

  constructor(public navParams: NavParams, private loadingCtrl: LoadingController) {
    this.rates = this.navParams.get('rates');
    this.color = this.navParams.get('color');
    this.product = this.navParams.get('product');
  }

  ngOnInit() {
    this.price = 0;
  }

  async getPrice(r: Rate) {
    this.rate = r;
    for (let rate of this.rates) {
      if (rate.length === this.rate.length) {
        this.price += rate.price;
      }
    }
    if (this.color === 'gold' && this.rate.can_extra) {
      this.price += 20;
    }
    if (this.rate.price < this.price && this.color === 'black') {
      this.price -= 20;
    }
    const popover = this.navParams.get('popover');
    popover.dismiss({
      price: this.price,
      rate: this.rate,
    });
  }
}
