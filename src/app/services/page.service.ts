import {Injectable} from '@angular/core';
import {ProductCategories} from '../models/productCategories';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  public view;
  public parameter;
  public productCategory;

  constructor() {
  }

  getPages() {
    return [
      {
        title: 'Home',
        url: '/tabs/mobile-home',
        icon: 'home'
      },
      {
        title: 'Shop',
        children: [
          {
            title: 'Hair Bundles',
            url: '/tabs/mobile-hair-bundles/'+ProductCategories.BUNDLES,
          },
          {
            title: 'Closures',
            url: '/tabs/mobile-hair-bundles/'+ProductCategories.CLOSURE,
          },
          {
            title: 'Frontals',
            url: '/tabs/mobile-hair-bundles/'+ProductCategories.FRONTAL,
          }
        ]
      }
    ];
  }
}
