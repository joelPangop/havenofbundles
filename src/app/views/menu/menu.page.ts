import {Component, OnInit} from '@angular/core';
import {LoadingController, Platform, PopoverController} from '@ionic/angular';
import {StorageService} from '../../services/storage.service';
import {PageService} from '../../services/page.service';
import {RateViewPage} from '../rate-view/rate-view.page';
import {CategoryLinksPage} from '../category-links/category-links.page';
import {AuthenticationService} from '../../services/authentication.service';

declare var jQuery: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  appPages: any[];

  constructor(public platform: Platform, private storage: StorageService, public pageService: PageService,
              private popoverCtrl: PopoverController,
              private loadCtrl: LoadingController,
              public authService: AuthenticationService) {
    this.appPages = this.pageService.getPages();
  }

  ngOnInit() {
    this.storage.getObject('tab').then((res) => {
      if (res) {
        this.pageService.view = res;
        let tablinks = document.getElementsByClassName('tablinks');
        for (let i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(' active', '');
          if (tablinks[i].textContent.toUpperCase() === this.pageService.view.toUpperCase()) {
            tablinks[i].className = 'active';
          }
        }
      } else {
        this.pageService.view = 'home';
        let tablinks = document.getElementsByClassName('tablinks');
        for (let i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(' active', '');
        }
      }
    });
  }

  public async goToCategory(event, page, type) {
    // await this.changeView(event, page);
    let i, tablinks;
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    // document.getElementById(cityName).style.display = "block";
    event.currentTarget.className += ' active';
    const popover = await this.popoverCtrl.create({
      component: CategoryLinksPage,
      event: event,
      componentProps: {
        type
      },
      translucent: true,
      cssClass: 'my-custom-dialog',
    });
    popover.onDidDismiss()
      .then(async (data: any) => {
        if (data.data) {
          console.log(data.data.link);
          // this.pageService.view = page;
          this.pageService.view = page;
          await this.storage.setObject('tab', this.pageService.view);
          this.pageService.productCategory = data.data.link.link;
        }
      });
    await popover.present();
  }

  public async changeView(event, page): Promise<void> {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    // document.getElementById(cityName).style.display = "block";
    // this.pageService.view = page;
    await this.storage.setObject('tab', this.pageService.view);
    event.currentTarget.className += ' active';
  }

  async logOut() {
    const load = await this.loadCtrl.create();
    await load.present();
    this.authService.logout(load);
  }
}
