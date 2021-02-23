import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Router} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {environment} from "../../models/environments";

@Component({
  selector: 'app-profile-products',
  templateUrl: './profile-products.page.html',
  styleUrls: ['./profile-products.page.scss'],
})
export class ProfileProductsPage implements OnInit {

  isAdd: boolean = false;
  isList: boolean = true;
  action = "";
  ip = '';

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
    })
  }

}
