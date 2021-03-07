import {Component, OnInit} from '@angular/core';
import {Product, Rate} from "../../models/Product-interface";
import {BundleSet} from "../../models/BundleSet";
import {ProductsService} from "../../services/products.service";
import {BundleSetService} from "../../services/bundle-set.service";
import {Styles} from "../../models/styles";
import {ProductCategories} from "../../models/productCategories";
import {Origins} from "../../models/Origins";
import {LoadingController, ToastController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../models/environments";
import {BundleCategories} from "../../models/bundleCategories";
import {BundleSetCategories} from "../../models/BundleSetCategories";

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
  id: string;
  ip: string;
  public action: string;

  constructor(public productService: ProductsService, public bundleSetService: BundleSetService,
              private toastCtrl: ToastController, private activatedRoute: ActivatedRoute, private loadCtrl: LoadingController,
              private route: Router) {
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
    this.loadBundleSet();
  }

  ionViewWillEnter() {
    this.loadBundleSet();
  }

  loadBundles() {
    this.action = this.activatedRoute.snapshot.paramMap.get('action');
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.loadAll().subscribe((products) => {
      this.products = products.filter(res => res.category === ProductCategories.BUNDLES)
      this.productsTemp = Array.from(this.products);
    })
  }

  loadBundleSet() {
    if (this.id !== 'null') {
      this.bundleSetService.getBundleSet(this.id).subscribe((res) => {
        console.log(res);
        this.bundleSet = res;
        this.style = this.bundleSet.product.style;
        this.origin = this.bundleSet.product.origin;
        this.product = this.bundleSet.product;

        this.products = this.productsTemp.filter((res) => {
          return res.style === this.style && res.origin === this.origin;
        })

      })
    }
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
    let test = true;
    if (this.bundleSet.features) {
      if (this.bundleSet.features.length > 0) {
        for (let bundle of this.bundleSet.features) {
          if (bundle.rate.length === rate.length) {
            bundle.quantity += 1;
            test = false;
          }
        }
      }
    }
    if (test) {
      this.bundleSet.features.push({
        rate: rate,
        quantity: 1
      })
    }

  }

  remove(index) {
    this.bundleSet.features.splice(index, 1);
  }

  changeView() {
    if (this.action === 'edit') {
      this.action = 'detail';
      // this.productService.loadById(this.id).subscribe((product) => {
      //   this.productService.profile_product = product;
      // });
    } else {
      this.action = 'edit';
    }
  }

  createBundleSet() {
    if (this.style === Styles.STRAIGHT) {
      this.bundleSet.category = BundleSetCategories.STRAIGHT_BUNDLES_SET;
    }
    this.bundleSet.product = this.product;
    this.bundleSet.pictures = [this.product.pictures[0], this.product.pictures[1]];
    let price = this.bundleSet.supplement.price * this.bundleSet.supplement.quantity;
    for(let bundle of this.bundleSet.features){
      price += bundle.quantity * bundle.rate.price;
    }
    this.bundleSet.price = price;
    if (this.id !== null) {
      this.bundleSetService.updateBundleSet(this.bundleSet, this.id).subscribe(async (res) => {
        this.bundleSet = res;
        this.product = res.product;
        const msg = "Bundle Set updated"
        await this.presentToast(msg);
      })
    } else {
      this.bundleSetService.addBundleSet(this.bundleSet).subscribe(async (res) => {
        this.product = new Product();
        const msg = res.msg
        this.bundleSetService.getAllBundleSet().subscribe(async (res) => {
          this.bundleSetService.bundleSets = res;
          await this.route.navigate(['tabs/mobile-bundle-set-manager']);
          await this.presentToast(msg);
        })
      });
    }

  }
}
