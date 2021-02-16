import { Component, OnInit } from '@angular/core';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-available',
  templateUrl: './available.page.html',
  styleUrls: ['./available.page.scss'],
})
export class AvailablePage implements OnInit {

  constructor(public platform: Platform) { }

  ngOnInit() {
  }

}
