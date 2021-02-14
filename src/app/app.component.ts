import { Component } from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@capacitor/core';
import {Router} from '@angular/router';

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
    this.platform.ready().then(async () => {
      const app = document.getElementsByClassName('app');
      if (!this.platform.is('ios') && !this.platform.is('android')) {
        app[0].setAttribute('style', ' background-color: #222222;\n' +
          '  display: block;\n' +
          '  margin-left: 10%;\n' +
          '  margin-right: 10%;\n' +
          '  width: 80%;');
      }
    });
  }
}
