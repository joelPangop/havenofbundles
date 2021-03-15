import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {addWarning} from '@angular-devkit/build-angular/src/utils/webpack-diagnostics';
import {StorageService} from '../../../services/storage.service';
import {AuthResponse} from '../../../models/auth-response';

@Component({
  selector: 'app-mobile-sign-in',
  templateUrl: './mobile-sign-in.page.html',
  styleUrls: ['./mobile-sign-in.page.scss'],
})
export class MobileSignInPage implements OnInit {

  credentials: FormGroup;
  private userAdded: AuthResponse = {} as AuthResponse;

  constructor(
    private fb: FormBuilder, private alertController: AlertController, private router: Router, private route: ActivatedRoute,
    private storageService: StorageService, private authService: AuthenticationService, private loadCtrl: LoadingController) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.userAdded = JSON.parse(params.special);
      }
    });
    this.credentials = this.fb.group({
      email: [this.userAdded.email ? this.userAdded.email : '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: [this.userAdded.email ? this.userAdded.email : '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required]
    });
  }

  async login() {
    const load = await this.loadCtrl.create();
    await load.present();
    this.authService.login(this.credentials.value).subscribe(
      async _ => {
        await load.dismiss();
        await this.router.navigateByUrl('/tabs/mobile-home', {replaceUrl: true});
      },
      async (res) => {
        await load.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: res.error.msg,
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

}
