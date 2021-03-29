import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {LoadingController, ToastController} from "@ionic/angular";
import {MailService} from "../../services/mail.service";
import {ImageService} from "../../services/image.service";
import {User} from "../../models/user";
import {Genders} from "../../models/Genders";
import {CategorieTelephone} from "../../models/CategorieTelephone";
import * as moment from 'moment';
import {Address} from "../../models/address-interface";

@Component({
  selector: 'app-mobile-personal-info',
  templateUrl: './mobile-personal-info.page.html',
  styleUrls: ['./mobile-personal-info.page.scss'],
})
export class MobilePersonalInfoPage implements OnInit {

  category;
  userInfoForm: FormGroup;
  addressInfoForm: FormGroup;
  addressShipForm: FormGroup;
  user: User;
  view: string = 'detail';
  id: string = '';
  genders: string[];
  options: string[];
  addressType: any = 'user';
  shipping_addr: Address;
  addr_informations: any;

  constructor(private activatedRoute: ActivatedRoute, public formBuilder: FormBuilder, public authSrv: AuthenticationService, private router: Router,
              private loadCtrl: LoadingController, private mailService: MailService, public imgSrv: ImageService, private toastCtrl: ToastController) {
    this.user = new User();
    this.shipping_addr = new Address();
  }

  ngOnInit() {
    this.load();
    this.genders = Object.values(Genders);
    this.options = Object.values(CategorieTelephone);
    this.userInfoForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      firstName: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
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
    this.addressShipForm = this.formBuilder.group({
      addr_1: [''],
      addr_2: [''],
      appart_number: [''],
      ville: [''],
      region: [''],
      pays: [''],
      postalCode: ['']
    });
  }

  load() {
    this.category = this.activatedRoute.snapshot.paramMap.get('category');
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authSrv.getUserById(this.id).subscribe((res) => {
      this.user = res;
      if(res.shipping_addr) {
        this.shipping_addr = res.shipping_addr;
      }
    })
  }

  ionViewWillEnter() {
    this.load();
    this.view = 'detail';
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
      })
    }
  }

  save() {
    this.user.shipping_addr = this.shipping_addr;
    this.authSrv.update(this.user).subscribe(async (res) => {
      this.user = res.user;
      if(res.result === 'success'){
        this.view = 'detail';
       await this.presentToast('user\'s information saved successfully');
      }
    })
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    })
    await toast.present();
  }

  getDate(date){
    return moment(date).format('MMMM Do YYYY');
  }

  segmentChanged($event) {
    console.log('event detail',$event.detail.value);
  }

  use_information_toggle() {
    if (this.addr_informations) {
      this.shipping_addr = this.user.shipping_addr;
    }
  }
}
