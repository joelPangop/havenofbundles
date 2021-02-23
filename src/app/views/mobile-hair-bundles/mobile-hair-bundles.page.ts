import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/Product-interface';
import {ProductsService} from '../../services/products.service';
import {ProductCategories} from '../../models/productCategories';
import {environment} from '../../models/environments';

@Component({
  selector: 'app-mobile-hair-bundles',
  templateUrl: './mobile-hair-bundles.page.html',
  styleUrls: ['./mobile-hair-bundles.page.scss'],
})
export class MobileHairBundlesPage implements OnInit {

  public products: Product[];
  url = '';
  typeImages: any[] = [];

  constructor(private productsService: ProductsService) {
    this.products = [];
    this.typeImages = [
      {
        name: 'curly',
        src: 'assets/images/curly.png'
      },
      {
        name: 'straight',
        src: 'assets/images/straight.png'
      },
      {
        name: 'wave',
        src: 'assets/images/wave.png'
      }

    ];
  }

  ngOnInit() {
    this.load();
    this.url = environment.api_url;
  }

  load() {
    this.productsService.loadAll().subscribe((products) => {
      this.products = products.filter(res => res.category === ProductCategories.BUNDLES);
    });
  }

  getContent() {
    return document.querySelector('ion-content');
  }

  scrollToBottom() {
    this.getContent().scrollToBottom(500);
  }

  scrollToTop() {
    this.getContent().scrollToTop(500);
  }

  doRefresh($event: any) {

  }
}
