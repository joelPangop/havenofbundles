import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {StorageService} from '../../services/storage.service';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public view;
  appPages: any[];

  constructor(public platform: Platform, private storage: StorageService, private pageService: PageService) {
    this.appPages = this.pageService.getPages();
  }

  ngOnInit() {
    this.storage.getObject('tab').then((res) => {
      if (res) {
        this.view = res;
        let tablinks = document.getElementsByClassName('tablinks');
        for (let i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(' active', '');
          if (tablinks[i].textContent.toUpperCase() === this.view.toUpperCase()) {
            tablinks[i].className = 'active';
          }
        }
      } else {
        this.view = 'tab1';
        let tablinks = document.getElementsByClassName('tablinks');
        for (let i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(' active', '');
        }
      }
    });
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
    this.view = page;
    await this.storage.setObject('tab', this.view);
    event.currentTarget.className += ' active';
  }

}
