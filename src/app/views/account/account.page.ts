import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../models/user";
import {environment} from "../../models/environments";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  pages = [];
  view: string;
  user: User;
  ip: string;

  constructor(public authSrv: AuthenticationService, private storage: StorageService) {
  }

  ngOnInit() {
    this.ip = environment.api_url;
    this.storage.getObject('user').then((res: any) => {
      this.authSrv.currentUser = res;
      this.authSrv.getUserById(res.id).subscribe((rep) => {
        this.user = rep;
        this.pages = [
          {
            name: "Personal Info",
            url: '/personal-info/userInfo/' + res.id
          },
          {
            name: "Orders",
            url: ""
          },
          {
            name: "Addresses",
            url: '/personal-info/addressInfo/' + res.id
          },
          {
            name: "Security",
            url: '/update-password/' + res.id
          },
          {
            name: "Payments Methods",
            url: ""
          },
          {
            name: "Wish List",
            url: "/wish-list"
          },
          {
            name: "Message",
            url: ""
          },
          {
            name: 'Help',
            url: ''
          },
          {
            name: 'Privacy Policy',
            url: ''
          }]
      })
    })
  }

  async changeView(event, url) {
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
    this.view = url;
    await this.storage.setObject('dashboard_view', this.view);
    event.currentTarget.className += ' active';
  }
}
