import {Component} from '@angular/core';
import {LoadingController, NavController, Platform} from '@ionic/angular';
import {Plugins} from '@capacitor/core';
import {Router} from '@angular/router';
import {StorageService} from './services/storage.service';
import {AuthenticationService} from './services/authentication.service';

const {Storage, Device} = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public platform: Platform,
              private storageService: StorageService,
              public authService: AuthenticationService,
              private loadCtrl: LoadingController) {
    this.storageService.getObject('user').then((res) => {
      console.log(res);
      this.authService.currentUser = res;
    });
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      const info = await Device.getInfo();
      await this.storageService.setObject('Device', info);
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

  async logOut() {
    const load = await this.loadCtrl.create();
    await load.present();
    this.authService.logout(load);
  }
}
