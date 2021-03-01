import {Component, OnInit} from '@angular/core';
import {NavParams, ToastController} from '@ionic/angular';
import {ProductCategories} from '../../models/productCategories';
import {Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'app-category-links',
  templateUrl: './category-links.page.html',
  styleUrls: ['./category-links.page.scss'],
})
export class CategoryLinksPage implements OnInit {

  links;
  link = '';

  constructor(public navParams: NavParams, public productService: ProductsService, public pageService: PageService) {
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
  }

  ngOnInit() {
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
    this.productService.loadAll().subscribe((products) => {
      this.productService.products = products.filter(res => res.category === link.link);
    });
  }
}
