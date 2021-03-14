import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user";
import {Genders} from "../../../models/Genders";

@Component({
  selector: 'app-mobile-sign-up',
  templateUrl: './mobile-sign-up.page.html',
  styleUrls: ['./mobile-sign-up.page.scss'],
})
export class MobileSignUpPage implements OnInit {

  user: User
  userInfo: boolean
  addressInfo: boolean
  genders: string[];

  constructor() {
    this.user = new User();
  }

  ngOnInit() {
    this.userInfo = true;
    this.addressInfo = false;
    this.genders = Object.values(Genders);
  }

}
