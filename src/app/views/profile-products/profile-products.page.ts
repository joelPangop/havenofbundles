import { Component, OnInit } from '@angular/core';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-profile-products',
  templateUrl: './profile-products.page.html',
  styleUrls: ['./profile-products.page.scss'],
})
export class ProfileProductsPage implements OnInit {

  constructor(public platform: Platform) { }

  ngOnInit() {
  }

}
