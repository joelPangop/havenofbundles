import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/Product-interface';
import {BundleSet} from '../../models/BundleSet';
import {ProductsService} from '../../services/products.service';
import {BundleSetService} from '../../services/bundle-set.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../services/page.service';
import {Styles} from '../../models/styles';
import {environment} from '../../models/environments';

@Component({
  selector: 'app-bundle-set-list',
  templateUrl: './bundle-set-list.page.html',
  styleUrls: ['./bundle-set-list.page.scss'],
})
export class BundleSetListPage implements OnInit {
  products: Product[];
  product: Product;
  bundleSets: BundleSet[];
  styles: string[];
  ip: string;
  category: string;
  constructor(public productService: ProductsService, public bundleSetService: BundleSetService, private router: Router,
              private activatedRoute: ActivatedRoute, private pageService: PageService) {
    this.bundleSets = [];
    this.products = [];
    this.product = new Product();
  }

  ngOnInit() {
    this.ip = environment.api_url;
    this.category = this.pageService.productCategory;
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

  goToDetail(id: string) {
    this.pageService.view = 'bundleSet-view';
    this.pageService.parameter = id;
  }
}
