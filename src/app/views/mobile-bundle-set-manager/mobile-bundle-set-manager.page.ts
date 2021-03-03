import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/Product-interface";
import {BundleSet} from "../../models/BundleSet";
import {ProductsService} from "../../services/products.service";
import {BundleSetService} from "../../services/bundle-set.service";
import {ProductCategories} from "../../models/productCategories";
import {Styles} from "../../models/styles";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mobile-bundle-set-manager',
  templateUrl: './mobile-bundle-set-manager.page.html',
  styleUrls: ['./mobile-bundle-set-manager.page.scss'],
})
export class MobileBundleSetManagerPage implements OnInit {

  products: Product[];
  product: Product;
  bundleSet: BundleSet;
  styles: string[];
  style: string;
  private action: string;

  constructor(public bundleSetService: BundleSetService, private router: Router) {
    this.products = [];
  }

  ngOnInit() {
    this.styles = Object.values(Styles);
    this.loadBundles();
  }

  loadBundles() {

  }

  getByStyle(){

  }

  async goToAdd() {
    this.action = 'add';
    await this.router.navigate(['tabs/mobile-add-edit-bundle-set/' + this.action + '/' + null]);
  }
}
