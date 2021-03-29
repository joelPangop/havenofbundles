import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {AuthenticationService} from '../../services/authentication.service';
import {StorageService} from '../../services/storage.service';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import {environment} from '../../models/environments';
import {ModifyProfileImagePage} from '../modify-profile-image/modify-profile-image.page';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Address} from '../../models/address-interface';
import {ActivatedRoute, Router} from '@angular/router';
import {MailService} from '../../services/mail.service';
import {ImageService} from '../../services/image.service';
import {Genders} from '../../models/Genders';
import {CategorieTelephone} from '../../models/CategorieTelephone';
import * as moment from 'moment';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {

  @Input() name: string;
  user: User;
  ip: string;
  imgURL: any;
  category;
  userInfoForm: FormGroup;
  addressInfoForm: FormGroup;
  addressShipForm: FormGroup;
  view: string = 'detail';
  id: string = '';
  genders: string[];
  options: string[];
  addressType: any = 'user';
  shipping_addr: Address;
  addr_informations: any;

  constructor(public authSrv: AuthenticationService, private storage: StorageService, private modalController: ModalController,
              private activatedRoute: ActivatedRoute, public formBuilder: FormBuilder, private router: Router,
              private loadCtrl: LoadingController, private mailService: MailService, public imgSrv: ImageService, private toastCtrl: ToastController,
              public pageService: PageService) {
    this.user = new User();
    this.shipping_addr = new Address();
  }

  ngOnInit() {
    this.ip = environment.api_url;
    this.category = this.pageService.userInfoCategory;
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

  ionViewWillEnter() {
    this.load();
    this.view = 'detail';
    this.category = this.name;
  }

  ionViewDidEnter() {
    this.load();
    this.view = 'detail';
    this.category = this.name;
  }

  load() {
  //   this.category = this.activatedRoute.snapshot.paramMap.get('category');
    this.id = this.authSrv.currentUser.id;
    this.authSrv.getUserById(this.id).subscribe((res) => {
      this.user = res;
      this.imgURL = !this.user.avatar.path ? 'assets/images/no-profile.png' : this.ip + '/file/image/' + this.user.avatar.path;
      if(res.shipping_addr) {
        this.shipping_addr = res.shipping_addr;
      }
    })
  }

  async updateImage() {
    const modal = await this.modalController.create({
      component: ModifyProfileImagePage,
      cssClass: 'cart-modal',
      componentProps: {
        imgURL: this.imgURL
      }
    });
    modal.onDidDismiss()
      .then(async (data) => {
        console.log(data.data);
        if(data.data.newImg){
          this.preview(data.data.newImg);
        }
      });
    return await modal.present();
  }

  preview(files) {
    const mimeType = files.type;
    // if (mimeType.match(/image\/*/) == null) {
    //   this.message = 'Only images are supported.';
    //   return;
    // }
    // tslint:disable-next-line:prefer-const
    const reader = new FileReader();
    // this.imagePath = files;
    reader.readAsDataURL(files);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
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
