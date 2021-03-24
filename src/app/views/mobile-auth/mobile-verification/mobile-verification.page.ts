import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication.service';
import {User} from '../../../models/user';

@Component({
  selector: 'app-mobile-verification',
  templateUrl: './mobile-verification.page.html',
  styleUrls: ['./mobile-verification.page.scss'],
})
export class MobileVerificationPage implements OnInit {

  userForm: FormGroup;
  verification_code: string;
  user: User;

  constructor(private activatedRoute: ActivatedRoute, public formBuilder: FormBuilder, private router: Router,
              private authSrv: AuthenticationService) {
    this.userForm = this.formBuilder.group({
      word1: [''],
      word2: [''],
      word3: [''],
      word4: [''],
      word5: ['']
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.special) {
        this.verification_code = params.special;
        this.user = JSON.parse(params.user);
      }
    });
  }

  async send() {
    const verification = this.userForm.value.word1 + this.userForm.value.word2 + this.userForm.value.word3 + this.userForm.value.word4 + this.userForm.value.word5;
    if (this.verification_code === verification) {
      this.user.verified = true;
      this.authSrv.verification_user(this.user).subscribe(async (res) =>{
        this.user = res.user;
        const navigationExtras: NavigationExtras = {
          queryParams: {
            special: this.user.email
          }
        };
        await this.router.navigate(['mobile-sign-in'], navigationExtras);
      })
    }
  }
}
