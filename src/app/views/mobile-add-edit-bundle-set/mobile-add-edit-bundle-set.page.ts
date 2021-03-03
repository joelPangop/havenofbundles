import {Component, OnInit} from '@angular/core';
import {Product, Rate} from "../../models/Product-interface";
import {BundleSet} from "../../models/BundleSet";
import {ProductsService} from "../../services/products.service";
import {BundleSetService} from "../../services/bundle-set.service";
import {Styles} from "../../models/styles";
import {ProductCategories} from "../../models/productCategories";
import {Origins} from "../../models/Origins";
import {ToastController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../models/environments";

@Component({
  selector: 'app-mobile-add-edit-bundle-set',
  templateUrl: './mobile-add-edit-bundle-set.page.html',
  styleUrls: ['./mobile-add-edit-bundle-set.page.scss'],
})
export class MobileAddEditBundleSetPage implements OnInit {

  products: Product[];
  productsTemp: Product[];
  product: Product;
  bundleSet: BundleSet;
  styles: string[];
  origins: string[];
  style: string;
  origin: string;
  category = '';
  quantity: number;
  ip: string;

  constructor(public productService: ProductsService, public bundleSetService: BundleSetService,
              private toastCtrl: ToastController, private activatedRoute: ActivatedRoute) {
    this.products = [];
    this.productsTemp = [];
    this.product = new Product();
    this.bundleSet = new BundleSet();
  }

  ngOnInit() {
    this.ip = environment.api_url;
    this.styles = Object.values(Styles);
    this.origins = Object.values(Origins);
    this.loadBundles();
  }

  loadBundles() {
    this.productService.loadAll().subscribe((products) => {
      this.products = products.filter(res => res.category === ProductCategories.BUNDLES)
      this.productsTemp = Array.from(this.products);
    })
  }

  async loadByCategory() {
    if (!this.origin) {
      await this.presentToast('You must choose an origin');
    } else if (!this.style) {
      await this.presentToast('You must choose a style');
    } else if (this.origin && this.style) {
      this.products = this.productsTemp.filter((res) => {
        return res.style === this.style && res.origin === this.origin;
      })
    } else {
      this.products = this.productsTemp;
    }
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1500
    })
    await toast.present();
  }

  add(rate: Rate) {
    this.bundleSet.features.push({
      rate: rate,
      quantity: this.quantity
    })
  }
}
