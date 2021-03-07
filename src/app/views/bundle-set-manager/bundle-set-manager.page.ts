import {Component, OnInit} from '@angular/core';
import {BundleSetService} from '../../services/bundle-set.service';
import {Product, Rate} from '../../models/Product-interface';
import {BundleSet} from '../../models/BundleSet';
import {environment} from '../../models/environments';
import {Styles} from '../../models/styles';
import {Origins} from '../../models/Origins';
import {LoadingController} from '@ionic/angular';
import {ProductCategories} from '../../models/productCategories';
import {ProductsService} from '../../services/products.service';
import {BundleSetCategories} from '../../models/BundleSetCategories';

@Component({
  selector: 'app-bundle-set-manager',
  templateUrl: './bundle-set-manager.page.html',
  styleUrls: ['./bundle-set-manager.page.scss'],
})
export class BundleSetManagerPage implements OnInit {

  isDetail: boolean = false;
  isAdd: boolean = false;
  isList: boolean = true;
  action = '';
  ip = '';
  view = 'list';
  products: Product[];
  productsTemp: Product[];
  product: Product;
  bundleSet: BundleSet;
  styles: string[];
  origins: string[];
  style: string;
  origin: string;
  category = '';

  constructor(public bundleSetService: BundleSetService, private toastCtrl: LoadingController, private productService: ProductsService) {
    this.products = [];
    this.productsTemp = [];
    this.product = new Product();
    this.bundleSet = new BundleSet();
  }

  ngOnInit() {
    this.ip = environment.api_url;
    this.styles = Object.values(Styles);
    this.origins = Object.values(Origins);
    this.load();
    this.loadProducts();
  }

  load() {
    this.bundleSetService.getAllBundleSet().subscribe((res) => {
      this.bundleSetService.bundleSets = res;
    })
  }

  loadProducts(){
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
    let test = true;
    if (this.bundleSetService.bundleSet.features) {
      if (this.bundleSet.features.length > 0) {
        for (let bundle of this.bundleSetService.bundleSet.features) {
          if (bundle.rate.length === rate.length) {
            bundle.quantity += 1;
            test = false;
          }
        }
      }
    }
    if (test) {
      this.bundleSetService.bundleSet.features.push({
        rate: rate,
        quantity: 1
      })
    }

  }

  remove(index) {
    this.bundleSetService.bundleSet.features.splice(index, 1);
  }

  goToAdd() {
    this.view = 'add';
    this.bundleSetService.bundleSet = new BundleSet();
  }

  changeView() {
    if (this.view === 'edit') {
      this.view = 'detail';
      this.bundleSetService.getBundleSet(this.bundleSetService.bundleSet._id).subscribe((res) => {
        console.log(res);
        this.bundleSetService.bundleSet = res;
        this.style = this.bundleSetService.bundleSet.product.style;
        this.origin = this.bundleSetService.bundleSet.product.origin;
        this.product = this.bundleSetService.bundleSet.product;

        this.products = this.productsTemp.filter((res) => {
          return res.style === this.style && res.origin === this.origin;
        })

      })
    } else {
      this.view = 'edit';
    }
  }

  save() {
    if (this.style === Styles.STRAIGHT) {
      this.bundleSetService.bundleSet.category = BundleSetCategories.STRAIGHT_BUNDLES_SET;
    }
    this.bundleSetService.bundleSet.product = this.product;
    this.bundleSetService.bundleSet.pictures = [this.product.pictures[0], this.product.pictures[1]];
    if (this.bundleSetService.bundleSet._id !== null) {
      this.bundleSetService.updateBundleSet(this.bundleSetService.bundleSet, this.bundleSetService.bundleSet._id).subscribe(async (res) => {
        this.bundleSetService.bundleSet = res;
        this.product = res.product;
        const msg = "Bundle Set updated"
        await this.presentToast(msg);
      })
    } else {
      this.bundleSetService.addBundleSet(this.bundleSetService.bundleSet).subscribe(async (res) => {
        this.product = new Product();
        const msg = res.msg
        this.bundleSetService.getAllBundleSet().subscribe(async (res) => {
          this.bundleSetService.bundleSets = res;
          this.view = 'list'
          await this.presentToast(msg);
        })
      });
    }
  }

  goToDetail(id: string) {
    this.bundleSetService.getBundleSet(id).subscribe(async (res) => {
      this.bundleSetService.bundleSet = res;
      this.style = this.bundleSetService.bundleSet.product.style;
      this.origin = this.bundleSetService.bundleSet.product.origin;
      this.product = this.bundleSetService.bundleSet.product;

      this.products = this.productsTemp.filter((res) => {
        return res.style === this.style && res.origin === this.origin;
      })

      this.view = 'detail';
    });
  }

  goToList() {
    this.view = 'list';
  }

}
