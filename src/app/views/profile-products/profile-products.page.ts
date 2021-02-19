import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Router} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {environment} from "../../models/environments";
import {Product} from "../../models/Product-interface";

@Component({
  selector: 'app-profile-products',
  templateUrl: './profile-products.page.html',
  styleUrls: ['./profile-products.page.scss'],
})
export class ProfileProductsPage implements OnInit {

  isDetail: boolean = false;
  isAdd: boolean = false;
  isList: boolean = true;
  action = "";
  ip = '';
  lastItem1: string = "";
  lastItem2: string = "";

  constructor(public platform: Platform, private router: Router, public productService: ProductsService) {

  }

  ngOnInit() {
    this.load();
    this.ip = environment.api_url;
  }

  async goToAdd() {
    this.isAdd = true;
    this.isList = false;
    this.action = "add";
    if (this.platform.is('ios') || this.platform.is('android')) {
      await this.router.navigateByUrl('tabs/add-edit-product/' + this.action + '/' + null);
    } else {

    }
  }

  async goToDetail(id) {
    this.action = "detail";
    if (this.platform.is('ios') || this.platform.is('android')) {
      await this.router.navigateByUrl('tabs/add-edit-product/' + this.action + '/' + id);
    } else {

    }
  }

  load() {
    this.productService.loadAll().subscribe((products) => {
      this.productService.profile_products = products;
      this.lastItem1 = this.productService.profile_products[this.productService.profile_products.length - 1].pictures[0];
      // this.lastItem2 = this.productService.profile_products[this.productService.profile_products.length - 2].pictures[0];
    })
  }

}
