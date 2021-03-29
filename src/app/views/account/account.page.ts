import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../models/user';
import {environment} from '../../models/environments';
import {ModalController} from '@ionic/angular';
import {ModifyProfileImagePage} from '../modify-profile-image/modify-profile-image.page';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  pages = [];
  view: any;
  user: User;
  ip: string;
  imgURL: any;
  category: any;
  currentUser: any;

  constructor(public authSrv: AuthenticationService, private storage: StorageService,
              private modalController: ModalController, public pageService: PageService) {
    this.user = new User();
    // this.pages = this.pageService.getAccountPages();
  }

  async ngOnInit() {
    this.ip = environment.api_url;

    this.pages = [
      {
        name: 'Personal Info',
        url: 'Personal Info',
        category: 'userInfo'
      },
      {
        name: 'Orders',
        url: 'Orders'
      },
      {
        name: 'Addresses',
        url: 'Personal Info',
        category: 'addressInfo'
      },
      {
        name: 'Security',
        url: 'Security'
      },
      {
        name: 'Payments Methods',
        url: 'Payments Methods'
      },
      {
        name: 'Wish List',
        url: 'Wish List'
      },
      {
        name: 'Message',
        url: 'Message'
      },
      {
        name: 'Help',
        url: 'Help'
      },
      {
        name: 'Privacy Policy',
        url: 'Privacy Policy'
      }];
    await this.load();
  }

  async load() {
    let tablinks = document.getElementsByClassName('sidetablinks');
    this.view = await this.storage.getObject('account_page');
    this.pageService.userInfoCategory = await this.storage.getObject('account_page_category');
    this.currentUser = await this.storage.getObject('user');
    this.authSrv.getUserById(this.currentUser.id).subscribe((rep) => {
      this.user = rep;
      this.authSrv.setCurrentUser(this.user);
      this.imgURL = !this.user.avatar.path ? 'assets/images/no-profile.png' : this.ip + '/file/image/' + this.user.avatar.path;
      console.log(tablinks);
      for(let i = 0; i < tablinks.length; i++){
        if (tablinks[i].textContent != null && this.view != null && tablinks[i].textContent.trim().toLowerCase() === (this.view.trim().toLowerCase())){
          tablinks[i].className += ' active';
        }
      }
    });
  }

  async changeView(event, page) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('sidetablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    // document.getElementById(cityName).style.display = "block";
    this.view = page.url;
    page.category ? this.category = page.category : '';
    page.category ? this.pageService.userInfoCategory = page.category : '';
    await this.storage.setObject('account_page', this.view);
    await this.storage.setObject('account_page_category', this.pageService.userInfoCategory);
    event.currentTarget.className += ' active';
  }

}
