import {Injectable} from '@angular/core';
import {ProductCategories} from '../models/productCategories';
import {Styles} from "../models/styles";

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
        title: 'Shop Hair',
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
      },
      {
        title: 'Shop Bundle Set',
        children: [
          {
            title: 'All Bundle Sets',
            url: '/tabs/mobile-bundle-set-list/all',
          },
          {
            title: 'Straight Bundle Sets',
            url: '/tabs/mobile-bundle-set-list/'+Styles.STRAIGHT,
          },
          {
            title: 'Wavy & Curly Bundle Sets',
            url: '/tabs/mobile-bundle-set-list/'+Styles.CURLY,
          }
        ]
      }
    ];
  }
}
