import { Component, OnInit } from '@angular/core';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-profile-products',
  templateUrl: './profile-products.page.html',
  styleUrls: ['./profile-products.page.scss'],
})
export class ProfileProductsPage implements OnInit {

  isDetail: boolean = false;
  isAdd: boolean = false;
  isList: boolean = true;
  action = "";

  constructor(public platform: Platform) { }

  ngOnInit() {
  }

  goToAdd(){
    this.isAdd = true;
    this.isList = false;
    this.action = "add";
  }

}
