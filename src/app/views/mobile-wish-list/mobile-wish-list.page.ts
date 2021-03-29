import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/Product';
import {ProductsService} from '../../services/products.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {environment} from '../../models/environments';
import {PageService} from '../../services/page.service';
import {ProductCategories} from '../../models/productCategories';
import {BundleSet} from '../../models/BundleSet';
import {BundleSetService} from '../../services/bundle-set.service';
import {from} from 'rxjs';

@Component({
  selector: 'app-mobile-wish-list',
  templateUrl: './mobile-wish-list.page.html',
  styleUrls: ['./mobile-wish-list.page.scss'],
})
export class MobileWishListPage implements OnInit {

  bundleProducts: Product[];
  closureProducts: Product[];
  frontalProducts: Product[];
  bundleSets: BundleSet[];
  ip: string;

  constructor(private productsService: ProductsService, public authService: AuthenticationService, private bundleService: BundleSetService,
              private router: Router, private pageService: PageService) {
    this.bundleProducts = [];
    this.closureProducts = [];
    this.frontalProducts = [];
    this.bundleSets = [];
  }

  ngOnInit() {
    this.ip = environment.api_url;
    from(Promise.all([this.getProductList(), this.getBundleSetList()]));
  }

  ionViewWillEnter(){
    from(Promise.all([this.getProductList(), this.getBundleSetList()]));
  }

  // Get Products
  getProductList() {
    this.productsService.loadAll().subscribe((res) => {
      this.bundleProducts = res.filter(r => r.likes.includes(this.authService.currentUser.id) && r.category === ProductCategories.BUNDLES);
      this.closureProducts = res.filter(r => r.likes.includes(this.authService.currentUser.id) && r.category === ProductCategories.CLOSURE);
      this.frontalProducts = res.filter(r => r.likes.includes(this.authService.currentUser.id) && r.category === ProductCategories.FRONTAL);
      console.log(this.bundleProducts);
    });
  }

  getBundleSetList() {
    this.bundleService.getAllBundleSet().subscribe((res) => {
      this.bundleSets = res.filter(r => r.likes.includes(this.authService.currentUser.id));
      console.log(this.bundleSets);

    })
  }

  async goToDetail(product: Product){
    this.pageService.productCategory = product.category;
    await this.router.navigate(['tabs/mobile-product-view/'+product._id]);
  }

  async goToBundleSetDetail(product: BundleSet){
    await this.router.navigate(['tabs/mobile-bundle-set/'+product._id]);
  }

}
