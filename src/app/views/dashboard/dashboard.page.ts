import {Component, Input, OnInit} from '@angular/core';
import {Platform} from "@ionic/angular";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @Input() platform_view: string;
  pages = [];

  constructor(public platform: Platform) {

  }

  ngOnInit() {
    if (this.platform_view === "browser") {
      this.pages = [
        {
          name: "Mailing List",
          url: "/home/mailing-list"
        },
        {
          name: "Profile",
          url: "/home/profile"
        }]
    } else if (this.platform.is('ios') || this.platform.is('android')){
      this.pages = [
        {
          name: "Mailing List",
          url: "/tabs/mailing-list"
        },
        {
          name: "Profile",
          url: "/tabs/profile"
        }]
    }
  }

}
