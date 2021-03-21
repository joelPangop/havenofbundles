import {Component, OnInit} from '@angular/core';
import {NavParams} from "@ionic/angular";
import {Rate} from "../../models/Product";

@Component({
  selector: 'app-color-view',
  templateUrl: './color-view.page.html',
  styleUrls: ['./color-view.page.scss'],
})
export class ColorViewPage implements OnInit {

  colors: [];
  color: string;
  rate: Rate;
  price = 0;

  constructor(public navParams: NavParams) {
    this.colors = this.navParams.get('colors');
    this.color = this.navParams.get('color')
    this.price = this.navParams.get('price')
    this.rate = this.navParams.get('rate')
  }

  ngOnInit() {
  }

  getColor(c: string) {
    this.color = c;

    if (this.color === 'gold' && this.rate.can_extra) {
      this.price += 20;
    }
    if (this.rate.price < this.price && this.color === 'black') {
      this.price -= 20;
    }
    const popover = this.navParams.get('popover');
    popover.dismiss({
      price: this.price,
      color: this.color
    });
  }
}
