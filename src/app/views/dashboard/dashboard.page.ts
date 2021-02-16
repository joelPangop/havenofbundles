import {Component, Input, OnInit} from '@angular/core';
import {Platform} from "@ionic/angular";
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @Input() platform_view: string;
  pages = [];

  public view;

  constructor(public platform: Platform, private storage: StorageService) {}

  ngOnInit() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.pages = [
        {
          name: "Summary",
          url: "/tabs/summary"
        },
        {
          name: "Sold",
          url: "/tabs/sold"
        },
        {
          name: "Products",
          url: "/tabs/profile-products"
        },
        {
          name: "Profile",
          url: "/tabs/profile"
        },
        {
          name: "Available",
          url: "/tabs/available"
        },
        {
          name: "Mailing List",
          url: "/tabs/mailing-list"
        }]

    } else {
      this.pages = [
        {
          name: "Summary",
          url: "summary"
        },
        {
          name: "Sold",
          url: "sold"
        },
        {
          name: "Products",
          url: "profile products"
        },
        {
          name: "Profile",
          url: "profile"
        },
        {
          name: "Available",
          url: "available"
        },
        {
          name: "Mailing List",
          url: "mailing List"
        }]
    }
    this.storage.getObject('dashboard_view').then((res) => {
      if(res){
        this.view = res;
        let tablinks = document.getElementsByClassName('sidetablinks');
        for (let i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(' active', '');

          if(tablinks[i].textContent.toUpperCase().trim() === this.view.toUpperCase().trim()){
            tablinks[i].className += ' active'
          }
        }
      } else {
        this.view = 'mailing List';
        let tablinks = document.getElementsByClassName('sidetablinks');
        for (let i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(' active', '');
          if(tablinks[i].textContent.toUpperCase().trim() === this.view.toUpperCase().trim()){
            tablinks[i].className += ' active'
          }
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
    tablinks = document.getElementsByClassName('sidetablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    // document.getElementById(cityName).style.display = "block";
    this.view = page;
    await this.storage.setObject('dashboard_view', this.view);
    event.currentTarget.className += ' active';
  }

}
