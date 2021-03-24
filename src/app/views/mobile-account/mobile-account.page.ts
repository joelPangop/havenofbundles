import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {HttpClient} from '@angular/common/http';
import {StorageService} from '../../services/storage.service';
import {User} from '../../models/user';
import {ModalController} from '@ionic/angular';
import {environment} from '../../models/environments';
import {ModifyProfileImagePage} from '../modify-profile-image/modify-profile-image.page';

@Component({
  selector: 'app-mobile-account',
  templateUrl: './mobile-account.page.html',
  styleUrls: ['./mobile-account.page.scss'],
})
export class MobileAccountPage implements OnInit {
  pages = [];
  user: User;
  imgURL: any;
  ip:string;

  constructor(public authSrv: AuthenticationService, private storageService: StorageService, private modalController: ModalController) {
    this.user = new User();
  }

  ngOnInit() {
    this.ip = environment.api_url;
    this.storageService.getObject('user').then((res: any) => {
      this.authSrv.currentUser = res;

      this.authSrv.getUserById(res.id).subscribe((rep) => {
        this.user = rep;
        this.imgURL = !this.user.avatar.path ? 'assets/images/no-profile.png' : this.ip+'/file/image/' + this.user.avatar.path;
        this.pages = [
          {
            name: 'Personal Info',
            features: 'Name, Email, Birth, Birthday',
            url: '/tabs/mobile-personal-info/userInfo/' + res.id
          },
          {
            name: 'Orders',
            features: 'Paid, unpaid, Delivered',
            url: '/tabs/summary'
          },
          {
            name: 'Addresses',
            features: 'Manage addresses',
            url: '/tabs/mobile-personal-info/addressInfo/' + res.id
          },
          {
            name: 'Security',
            features: 'Password, two factor',
            url: '/tabs/mobile-update-password/' + res.id
          },
          {
            name: 'Payments Methods',
            features: 'Paypal, Credit Card',
            url: '/tabs/summary'
          },
          {
            name: 'Wish List',
            features: 'Favorites Products',
            url: '/tabs/mobile-wish-list'
          },
          {
            name: 'Message',
            features: 'Chat with us',
            url: ''
          },
          {
            name: 'Help',
            features: 'Get help',
            url: ''
          },
          {
            name: 'Privacy Policy',
            features: 'Our policy and terms & conditions',
            url: ''
          }

        ];
      });
    });
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
}
