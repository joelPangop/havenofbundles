import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {Genders} from '../../../models/Genders';
import {CategorieTelephone} from '../../../models/CategorieTelephone';
import {Telephone} from '../../../models/telephone';
import {Address} from '../../../models/address-interface';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';
import {Utils} from '../../../Utils';
import {Mail} from '../../../models/mail-interface';
import {MailService} from '../../../services/mail.service';
import {ImageService} from "../../../services/image.service";
import {File, FileInfo} from "../../../models/file";
import {FileValidatorDirective} from "../../../services/file-validator.directive";
import {PasswordValidatorDirective} from "../../../services/password-validator.directive";

@Component({
  selector: 'app-mobile-sign-up',
  templateUrl: './mobile-sign-up.page.html',
  styleUrls: ['./mobile-sign-up.page.scss'],
})
export class MobileSignUpPage implements OnInit {

  user: User;
  userStep: boolean;
  userInfoStep: boolean;
  addressStep: boolean;
  genders: string[];
  options: any;
  address: Address;
  userForm: FormGroup;
  userInfoForm: FormGroup;
  addressInfoForm: FormGroup;
  uploadForm: FormGroup;
  imgURL: any;
  private message: string;
  passwordType = 'password';
  passwordConfirm;
  private confirmation_code: string;
  private newImg: any;
  uploadedFile = {} as File;

  constructor(public formBuilder: FormBuilder, public authSrv: AuthenticationService, private router: Router,
              private loadCtrl: LoadingController, private mailService: MailService, public imgSrv: ImageService) {
    this.user = new User();
    this.address = new Address();
    this.uploadForm = new FormGroup({
      image: new FormControl({}, [FileValidatorDirective.validate])
    });
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6),
        Validators.maxLength(30)]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
      ])
    }, [PasswordValidatorDirective.validate]);
    this.userInfoForm = new FormGroup({
      gender: new FormControl("", [Validators.required]),
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      phone_category: new FormControl("", [Validators.required]),
      birthday: new FormControl("", [Validators.required])
    });

    this.addressInfoForm = this.formBuilder.group({
      addr_1: [''],
      addr_2: [''],
      appart_number: [''],
      ville: [''],
      region: [''],
      pays: [''],
      postalCode: ['']
    });

    this.userInfoStep = false;
    this.userStep = true;
    this.addressStep = false;
    this.genders = Object.values(Genders);
    this.options = Object.values(CategorieTelephone);
    this.user = new User();

  }

  changeView() {
    console.log(this.user);
    if (this.userInfoStep === true) {
      this.userInfoStep = false;
      this.userStep = false;
      this.addressStep = true;
    } else if (this.userStep === true) {
      this.userInfoStep = true;
      this.addressStep = false;
      this.userStep = false;
    } else if (this.addressStep === true) {
      this.userInfoStep = true;
      this.addressStep = false;
      this.userStep = false;
    }
  }

  backView() {
    if (this.userInfoStep === true) {
      this.userInfoStep = false;
      this.userStep = true;
      this.addressStep = false;
    } else if (this.addressStep === true) {
      this.userInfoStep = true;
      this.addressStep = false;
      this.userStep = false;
    }
  }

  removeControl(i: number) {
    this.user.userInfo.telephones.splice(i, 1);
  }

  addTelephone() {
    if (this.user.userInfo.telephones.length > 0) {
      if (this.user.userInfo.telephones[this.user.userInfo.telephones.length - 1].numeroTelephone !== '') {
        this.user.userInfo.telephones.push(new Telephone());
      }
    } else {
      this.user.userInfo.telephones = [];
      this.user.userInfo.telephones.push(new Telephone());
    }
  }

  onFileSelect(event) {
    this.imgURL = [];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.newImg = event.target.files[0];
      // this.uploadForm.get('image').setValue(this.newImg);
      // this.newImg = event.target.files[0];
      this.uploadedFile.fileInfo = new FileInfo();
      this.uploadedFile.fileInfo.name = this.newImg.name;
      this.uploadedFile.fileInfo.size = this.newImg.size;
      this.uploadedFile.fileInfo.file_type = this.newImg.type;
      this.uploadedFile.fileInfo.ownerId = this.userForm.get('email').value;
      this.preview(file);
    }
  }

  preview(files) {
    const mimeType = files.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    // tslint:disable-next-line:prefer-const
    const reader = new FileReader();
    // this.imagePath = files;
    reader.readAsDataURL(files);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  async register() {
    const load = await this.loadCtrl.create();
    await load.present();

    if (this.newImg) {
      this.uploadForm.get('image').setValue(this.newImg);
      await this.imgSrv.uploadImage(this.uploadForm).subscribe(async res => {
        this.uploadedFile.path = res.filename;
        this.user.avatar = this.uploadedFile;
        this.authSrv.register(this.user).subscribe((res) => {
          console.log('user saved:', res);
          load.dismiss();
          this.confirmation_code = Utils.makeString(10);
          let body = 'The confirmation code is ' + this.confirmation_code;
          const content: Mail = {
            to: res.email,
            subject: 'Registration confirmation',
            text: body
          };
          if (res) {
            this.mailService.sendMail(content).subscribe(res1 => {
              console.log(res1);
            });
          }
          // load.dismiss();
          let navigationExtras: NavigationExtras = {
            queryParams: {
              special: JSON.stringify(res)
            }
          };
          this.router.navigate(['mobile-sign-in'], navigationExtras);
        });
      })
    } else {
      this.authSrv.register(this.user).subscribe((res) => {
        console.log('user saved:', res);
        load.dismiss();
        this.confirmation_code = Utils.makeString(10);
        let body = 'The confirmation code is ' + this.confirmation_code;
        const content: Mail = {
          to: res.email,
          subject: 'Registration confirmation',
          text: body
        };
        if (res) {
          this.mailService.sendMail(content).subscribe(res1 => {
            console.log(res1);
            let navigationExtras: NavigationExtras = {
              queryParams: {
                special: JSON.stringify(this.confirmation_code),
                user: res
              }
            };
            this.router.navigate(['mobile-verification'], navigationExtras);
          });
        }
        // load.dismiss();

      });
    }
  }
}
