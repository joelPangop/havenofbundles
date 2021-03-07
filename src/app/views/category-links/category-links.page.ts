import {Component, OnInit} from '@angular/core';
import {NavParams, ToastController} from '@ionic/angular';
import {ProductCategories} from '../../models/productCategories';
import {Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {PageService} from '../../services/page.service';
import {Styles} from '../../models/styles';
import {BundleSetService} from '../../services/bundle-set.service';

@Component({
  selector: 'app-category-links',
  templateUrl: './category-links.page.html',
  styleUrls: ['./category-links.page.scss'],
})
export class CategoryLinksPage implements OnInit {

  links;
  link = '';
  type = '';

  constructor(public navParams: NavParams, public productService: ProductsService, public pageService: PageService,
    public bundleSetService: BundleSetService) {
  }

  ngOnInit() {
    this.type = this.navParams.get('type');
    switch (this.type) {
      case 'hair':
        this.links = [
          {
            name: 'Hair Bundles',
            link: ProductCategories.BUNDLES
          },
          {
            name: 'Closures',
            link: ProductCategories.CLOSURE
          },
          {
            name: 'Frontals',
            link: ProductCategories.FRONTAL
          }
        ];
        break;

      case 'bundleSet':
        this.links = [
          {
            name: 'All Bundle Sets',
            link:'all'
          },
          {
            name: 'Straight Bundle Sets',
            link: Styles.STRAIGHT
          },
          {
            name: 'Wavy & Curly Bundle Sets',
            link: Styles.CURLY
          }
        ];
        break;
    }
  }

  setLink(l: any) {
    this.link = l;
    this.load(this.link);
    this.pageService.productCategory = this.link.link;
    const popover = this.navParams.get('popover');
    popover.dismiss({
      link: this.link,
    });
  }

  load(link) {
    switch (this.type) {
      case 'hair':
        this.productService.loadAll().subscribe((products) => {
          this.productService.products = products.filter(res => res.category === link.link);
        });
        break;

      case 'bundleSet':
        this.bundleSetService.getAllBundleSet().subscribe((bundleSets) => {
          if(link.link === 'all'){
            this.bundleSetService.bundleSets = bundleSets;
          } else if (link.link === Styles.STRAIGHT){
            this.bundleSetService.bundleSets = bundleSets.filter((res) => {
              return res.product.style === Styles.STRAIGHT
            })
          } else {
            this.bundleSetService.bundleSets = bundleSets.filter((res) => {
              return res.product.style === Styles.BODY_WAVE || res.product.style === Styles.CURLY;
            })
          }
        })
        break;
    }
  }
}
