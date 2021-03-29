import {Component} from '@angular/core';
import {Platform, PopoverController} from "@ionic/angular";
import {CategoryLinksPage} from "../category-links/category-links.page";
import {StorageService} from "../../services/storage.service";
import {PageService} from "../../services/page.service";
import {Router} from "@angular/router";
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public platform: Platform, private storage: StorageService, public pageService: PageService,
              private popoverCtrl: PopoverController, private router: Router,
              public authService: AuthenticationService) {
    console.log(platform.platforms());
  }

  public async goToCategory(ev: any, page, type) {
    // await this.changeView(event, page);
    let i, tablinks;
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    // document.getElementById(cityName).style.display = "block";
    ev.currentTarget.className += ' active';
    const popover = await this.popoverCtrl.create({
      component: CategoryLinksPage,
      componentProps: {
        type
      },
      cssClass: 'popover-custom',
      event: ev,
      translucent: true
    });
    popover.onDidDismiss()
      .then(async (data: any) => {
        if (data.data) {
          console.log(data.data.link);
          // this.pageService.view = page;
          this.pageService.view = page;
          await this.storage.setObject('tab', this.pageService.view);
          this.pageService.productCategory = data.data.link.link;
          if(this.pageService.view == 'hairBundles') {
            await this.router.navigateByUrl("/hair-bundles");
          } else if(this.pageService.view == 'bundleSet') {
            await this.router.navigateByUrl("/bundle-set-list");
          }
        }
      });
    await popover.present();
  }
}
