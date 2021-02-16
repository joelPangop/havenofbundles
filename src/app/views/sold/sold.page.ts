import { Component, OnInit } from '@angular/core';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-sold',
  templateUrl: './sold.page.html',
  styleUrls: ['./sold.page.scss'],
})
export class SoldPage implements OnInit {

  constructor(public platform: Platform) { }

  ngOnInit() {
  }

}
