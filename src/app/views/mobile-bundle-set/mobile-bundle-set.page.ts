import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/Product-interface";
import {BundleSet} from "../../models/BundleSet";
import {ProductsService} from "../../services/products.service";
import {BundleSetService} from "../../services/bundle-set.service";
import {Styles} from "../../models/styles";
import {ProductCategories} from "../../models/productCategories";

@Component({
  selector: 'app-mobile-bundle-set',
  templateUrl: './mobile-bundle-set.page.html',
  styleUrls: ['./mobile-bundle-set.page.scss'],
})
export class MobileBundleSetPage implements OnInit {

  products: Product[];
  product: Product;
  bundleSet: BundleSet;
  styles: string[];

  constructor(public productService: ProductsService, public bundleSetService: BundleSetService) {
    this.bundleSet = new BundleSet();
    this.products = [];
    this.product = new Product();
  }

  ngOnInit() {
    this.styles = Object.values(Styles);
  }

  loadBundles() {
    this.productService.loadAll().subscribe((products) => {
      this.products = products.filter((res) => {
        return res.bundle_category === ProductCategories.BUNDLES
      })
    })
  }
}
