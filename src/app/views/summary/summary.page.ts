import { Component, OnInit } from '@angular/core';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  constructor(public platform: Platform) { }

  ngOnInit() {
  }

}
