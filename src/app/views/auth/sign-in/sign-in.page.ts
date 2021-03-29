import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthResponse} from '../../../models/auth-response';
import {AlertController, LoadingController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../../../services/storage.service';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

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
        await this.router.navigateByUrl('/home', {replaceUrl: true});
      },
      async (res) => {
        await load.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: res.error.message,
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

}
