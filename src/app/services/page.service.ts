import {Injectable} from '@angular/core';
import {ProductCategories} from '../models/productCategories';
import {Styles} from "../models/styles";
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  public view;
  public parameter;
  public productCategory;
  accountPages: any[];

  constructor(public authSrv: AuthenticationService) {
    this.getAccountPages();
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

  getAccountPages(){
    this.accountPages = [
      {
        name: 'Personal Info',
        features: 'Name, Email, Birth, Birthday',
        url: '/tabs/mobile-personal-info/userInfo/' + this.authSrv.currentUser.id
      },
      {
        name: 'Orders',
        features: 'Paid, unpaid, Delivered',
        url: '/tabs/summary'
      },
      {
        name: 'Addresses',
        features: 'Manage addresses',
        url: '/tabs/mobile-personal-info/addressInfo/' + this.authSrv.currentUser.id
      },
      {
        name: 'Security',
        features: 'Password, two factor',
        url: '/tabs/mobile-update-password/' + this.authSrv.currentUser.id
      },
      {
        name: 'Payments Methods',
        features: 'Paypal, Credit Card',
        url: '/tabs/summary'
      },
      {
        name: 'Wish List',
        features: 'Favorites Products',
        url: '/tabs/mobile-wish-list'
      },
      {
        name: 'Message',
        features: 'Chat with us',
        url: ''
      },
      {
        name: 'Help',
        features: 'Get help',
        url: ''
      },
      {
        name: 'Privacy Policy',
        features: 'Our policy and terms & conditions',
        url: ''
      }

    ];
  }
}
