import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor() {
  }

  getPages() {
    return [
      // {
      //   title: 'Home',
      //   url: '/menu/tabs/tab1',
      //   icon: 'home'
      // },
      {
        title: 'Hair Bundles',
        url: '/tabs/mobile-hair-bundles'
      }
    ];
  }
}
