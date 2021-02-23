import { Component, OnInit } from '@angular/core';
import {Platform} from '@ionic/angular';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-mobile-home',
  templateUrl: './mobile-home.page.html',
  styleUrls: ['./mobile-home.page.scss'],
})
export class MobileHomePage implements OnInit {

  constructor(public platform: Platform, private productService: ProductsService) {
    this.productService.loadAll().subscribe((res) => {
      this.productService.profile_products = res;
    });
  }

  ngOnInit() {

  }

}
