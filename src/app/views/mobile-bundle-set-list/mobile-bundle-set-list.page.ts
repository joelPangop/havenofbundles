import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {BundleSetService} from "../../services/bundle-set.service";
import {Product} from "../../models/Product";
import {BundleSet} from "../../models/BundleSet";
import {environment} from "../../models/environments";
import {Styles} from "../../models/styles";
import {ProductCategories} from "../../models/productCategories";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-mobile-bundle-set-list',
  templateUrl: './mobile-bundle-set-list.page.html',
  styleUrls: ['./mobile-bundle-set-list.page.scss'],
})
export class MobileBundleSetListPage implements OnInit {
  products: Product[];
  product: Product;
  bundleSets: BundleSet[];
  styles: string[];
  ip: string;
  category: string;
  like: boolean = false;

  constructor(public productService: ProductsService, public bundleSetService: BundleSetService, private router: Router,
              private activatedRoute: ActivatedRoute, private authService: AuthenticationService) {
    this.bundleSets = [];
    this.products = [];
    this.product = new Product();
  }

  ngOnInit() {
    this.ip = environment.api_url;
    this.category = this.activatedRoute.snapshot.paramMap.get('category');
    this.styles = Object.values(Styles);
    this.loadBundles();
  }

  loadBundles() {
    this.bundleSetService.getAllBundleSet().subscribe((bundleSets) => {
      if(this.category === 'all'){
        this.bundleSets = bundleSets;
      } else if (this.category === Styles.STRAIGHT){
        this.bundleSets = bundleSets.filter((res) => {
          return res.product.style === Styles.STRAIGHT
        })
      } else {
        this.bundleSets = bundleSets.filter((res) => {
          return res.product.style === Styles.BODY_WAVE || res.product.style === Styles.CURLY;
        })
      }
    })
  }

  async goToDetail(_id: string) {
     await this.router.navigateByUrl('/tabs/mobile-bundle-set/'+_id);
  }

  isWishList(item: BundleSet) {
    return item.likes.includes(this.authService.currentUser.id);
  }

  checkLike(item: BundleSet) {
    if (item.likes.includes(this.authService.currentUser.id)) {
      this.like = true;
    }
    if (this.authService.currentUser.id) {
      // if (product.userId === this.authService.currentUser.id) {
      //   await this.presentToast('Impossible de liker son propre article');
      // } else {
      if(this.like){
        this.like = false;
      } else {
        this.like = true;
      }
      if (this.like === false) {
        const index = item.likes.indexOf(this.authService.currentUser.id, 0);
        item.likes.splice(index, 1);
      } else {
        item.likes.push(this.authService.currentUser.id);
      }
      this.productService.checkBundleSetLike(item).subscribe((res) => {
        console.log(res);
        item = res;
      })
      // }
    }
  }
}
