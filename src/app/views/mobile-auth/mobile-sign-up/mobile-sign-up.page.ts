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
    imgURL: any;
    private message: string;
    passwordType = 'password';
    passwordConfirm;
    private confirmation_code: string;

    constructor(public formBuilder: FormBuilder, public authSrv: AuthenticationService, private router: Router,
                private loadCtrl: LoadingController, private mailService: MailService) {
        this.user = new User();
        this.address = new Address();

    }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            password: ['', [Validators.required, Validators.minLength(6),
                Validators.maxLength(30)]],
            passwordConfirm: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30),
            ])
        }, {validator: this.password});
        this.userInfoForm = this.formBuilder.group({
            image: ['', [Validators.required]],
            firstName: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            birthday: ['', [Validators.required]]
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
            // this.newImg = event.target.files[0];
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

    password(formGroup: FormGroup): { [err: string]: any } {
        console.log('password', formGroup.get('password').value);
        console.log('confirm password', formGroup.get('passwordConfirm').value);
        return formGroup.get('password').value === formGroup.get('passwordConfirm').value ? null : {passwordMismatch: true};
    }

    async register() {
        const load = await this.loadCtrl.create();
        await load.present();
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
    }
}
