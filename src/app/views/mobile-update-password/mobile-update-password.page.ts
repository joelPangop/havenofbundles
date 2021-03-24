import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {AuthenticationService} from '../../services/authentication.service';
import {ActivatedRoute} from '@angular/router';
import {LoadingController, ToastController} from '@ionic/angular';
import {MailService} from '../../services/mail.service';
import {PasswordValidatorDirective} from '../../services/password-validator.directive';
import {Device} from '@capacitor/core';

@Component({
  selector: 'app-mobile-update-password',
  templateUrl: './mobile-update-password.page.html',
  styleUrls: ['./mobile-update-password.page.scss'],
})
export class MobileUpdatePasswordPage implements OnInit {

  view: string = 'detail';
  userForm: FormGroup;
  user: User;
  id: string = '';
  passwordType = 'password';
  passwordConfirm;

  constructor(private activatedRoute: ActivatedRoute, public formBuilder: FormBuilder, public authSrv: AuthenticationService, private loadCtrl: LoadingController,
              private mailService: MailService, private toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6),
        Validators.maxLength(30)]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
      ])
    }, [PasswordValidatorDirective.validate]);

    this.load();
  }

  load() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authSrv.getUserById(this.id).subscribe((res) => {
      this.user = res;
    });
  }

  ionWillEnter() {
    this.view = 'detail'
  }

  async changeView() {
    const load = await this.loadCtrl.create();
    await load.present();
    if (this.view === 'detail') {
      this.view = 'edit';
      await load.dismiss();
    } else {
      this.view = 'detail';
      this.authSrv.getUserById(this.id).subscribe((res) => {
        this.user = res;
        load.dismiss();
      });
    }
  }

  async save() {
    const info = await Device.getInfo();
    this.user.userInfo.devices.push(info);
    this.authSrv.updatePassword(this.user).subscribe(async (res) => {
      this.user = res.user;
      if (res.result === 'success') {
        this.view = 'detail';
        await this.presentToast('user\'s password saved successfully');
      }
    });
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    await toast.present();
  }
}
