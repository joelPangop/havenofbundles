import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {BundleSetService} from "../../services/bundle-set.service";
import {Product} from "../../models/Product-interface";
import {BundleSet} from "../../models/BundleSet";
import {environment} from "../../models/environments";
import {Styles} from "../../models/styles";
import {ProductCategories} from "../../models/productCategories";
import {ActivatedRoute, Router} from "@angular/router";

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
  constructor(public productService: ProductsService, public bundleSetService: BundleSetService, private router: Router,
              private activatedRoute: ActivatedRoute) {
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

}
