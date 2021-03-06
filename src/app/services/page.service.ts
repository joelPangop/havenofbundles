import {Injectable} from '@angular/core';
import {ProductCategories} from '../models/productCategories';
import {Styles} from '../models/styles';
import {AuthenticationService} from './authentication.service';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  public view;
  public parameter;
  public productCategory;
  public userInfoCategory: any = '';
  public mobileAccountPages: any[];
  public accountPages: any[];
  currentUser: any;

  constructor(public authSrv: AuthenticationService, private storageService: StorageService) {
    this.loadUser();
    this.getMobileAccountPages();
    // this.getAccountPages();
  }

  async loadUser() {
    this.currentUser = await this.storageService.getObject('user');
  }

  getPages() {
    return [
      {
        title: 'Home',
        url: '/home',
        icon: 'home'
      },
      {
        title: 'Shop Hair',
        children: [
          {
            title: 'Hair Bundles',
            url: '/mobile-hair-bundles/' + ProductCategories.BUNDLES,
          },
          {
            title: 'Closures',
            url: '/mobile-hair-bundles/' + ProductCategories.CLOSURE,
          },
          {
            title: 'Frontals',
            url: '/mobile-hair-bundles/' + ProductCategories.FRONTAL,
          }
        ]
      },
      {
        title: 'Shop Bundle Set',
        children: [
          {
            title: 'All Bundle Sets',
            url: '/mobile-bundle-set-list/all',
          },
          {
            title: 'Straight Bundle Sets',
            url: '/mobile-bundle-set-list/' + Styles.STRAIGHT,
          },
          {
            title: 'Wavy & Curly Bundle Sets',
            url: '/mobile-bundle-set-list/' + Styles.CURLY,
          }
        ]
      }
    ];
  }

  async getMobileAccountPages() {
    this.currentUser = await this.storageService.getObject('user');
    if (this.currentUser) {
      this.mobileAccountPages = [
        {
          name: 'Personal Info',
          features: 'Name, Email, Birth, Birthday',
          url: '/mobile-personal-info/userInfo/' + this.currentUser.id
        },
        {
          name: 'Orders',
          features: 'Paid, unpaid, Delivered',
          url: '/summary'
        },
        {
          name: 'Addresses',
          features: 'Manage addresses',
          url: '/mobile-personal-info/addressInfo/' + this.currentUser.id
        },
        {
          name: 'Security',
          features: 'Password, two factor',
          url: '/mobile-update-password/' + this.currentUser.id
        },
        {
          name: 'Payments Methods',
          features: 'Paypal, Credit Card',
          url: '/summary'
        },
        {
          name: 'Wish List',
          features: 'Favorites Products',
          url: '/mobile-wish-list'
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

  //  getAccountPages() {
  //   // this.currentUser = await this.storageService.getObject('user');
  //
  //   return [
  //
  //   ]
  // }
}
