import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-mobile-account',
  templateUrl: './mobile-account.page.html',
  styleUrls: ['./mobile-account.page.scss'],
})
export class MobileAccountPage implements OnInit {
  pages = [];

  constructor(public authSrv: AuthenticationService, private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.getObject('user').then((res: any) => {
      this.authSrv.currentUser = res;

    this.pages = [
      {
        name: "Personal Info",
        features: 'Name, Email, Birth, Birthday',
        url: "/tabs/mobile-personal-info/userInfo/"+res.id
      },
      {
        name: "Orders",
        features: 'Paid, unpaid, Delivered',
        url: "/tabs/summary"
      },
      {
        name: "Addresses",
        features: 'Manage addresses',
        url: "/tabs/mobile-personal-info/addressInfo/"+res.id
      },
      {
        name: "Security",
        features: 'Password, two factor',
        url: "/tabs/mobile-update-password/"+res.id
      },
      {
        name: "Payments Methods",
        features: 'Paypal, Credit Card',
        url: "/tabs/summary"
      },
      {
        name: "Wish List",
        features: 'Favorites Products',
        url: ""
      },
      {
        name: "Message",
        features: 'Chat with us',
        url: ""
      },
      {
        name: "Help",
        features: 'Get help',
        url: ""
      },
      {
        name: "Privacy Policy",
        features: 'Our policy and terms & conditions',
        url: ""
      }

    ]
    });
  }

}
