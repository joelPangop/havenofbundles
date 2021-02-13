import { Component } from '@angular/core';
import {NavController, Platform} from "@ionic/angular";
import {SplashScreen} from "@capacitor/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(  private platform: Platform,
                private router: Router,
                private navCtrl: NavController) {
    this.initializeApp();
  }

  async initializeApp() {
    // this.utilisateur = await this.userStorageUtils.getUser();
    this.platform.ready().then(async () => {
      if(this.platform.is('ios') || this.platform.is('android')) {
        this.router.navigateByUrl('mobile/tabs/tab1');
      } else {
        this.router.navigateByUrl('home');
      }
    })
  }
}