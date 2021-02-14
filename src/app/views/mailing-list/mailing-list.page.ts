import {Component, OnInit} from '@angular/core';
import {LoadingController, Platform} from '@ionic/angular';
import {MailingService} from '../../services/mailing.service';
import {Mailing} from '../../models/Mailing-interface';

@Component({
  selector: 'app-mailing-list',
  templateUrl: './mailing-list.page.html',
  styleUrls: ['./mailing-list.page.scss'],
})
export class MailingListPage implements OnInit {

  page: number = 0;
  resultsCount = 3;
  totalPages: number = 10;

  data: Mailing[] = [];
  bulkEdit = false;
  sortDirection: number = 0;
  sortKey = null;
  nb: number[] = [];

  constructor(public platform: Platform, public mailingService: MailingService, private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.mailingService.getMailingList().subscribe((res) => {
      this.mailingService.mailingList = res.users;
      this.loadNumberPerPage();
      const start = parseInt(String(this.resultsCount)) * this.page;
      const end = parseInt(String(this.resultsCount)) + start;
      this.data = this.mailingService.mailingList.slice(start, end);
      this.totalPages = Math.ceil(this.mailingService.mailingList.length / this.resultsCount);
    });
  }

  loadNumberPerPage() {
    let i = 0;
    this.nb = [];
    while (this.mailingService.mailingList.length - i >= 3) {
      i += 3;
      this.nb.push(i);
    }

    const pair = i;
    if (this.mailingService.mailingList.length - i < 3 && this.mailingService.mailingList.length % i !== 0) {
      this.nb.push(pair + this.mailingService.mailingList.length - i)
    }

    console.log(this.nb);
  }

  sortBy(key) {
    this.sortKey = key;
    this.sortDirection++;
    this.sort();
  }

  sort() {
    if (this.sortDirection == 1) {
      this.data = this.data.sort((a, b) => {
        console.log('_a', a);
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valA.localeCompare(valB);
      });
    } else if (this.sortDirection == 2) {
      this.data = this.data.sort((a, b) => {
        console.log('_a', a);
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valB.localeCompare(valA);
      });
    } else {
      this.sortDirection = 0;
      this.sortKey = null;
    }
  }

  nextPage() {
    if(this.page < this.totalPages - 1) {
      this.page++;
      this.loadData();
    }
  }

  previousPage() {
    if(this.page >= 1){
      this.page--;
      this.loadData();
    }
  }

  goFirst() {
    this.page = 0;
    this.loadData();
  }

  goLast() {
    this.page = this.totalPages - 1;
    this.loadData();
  }

  async sendMail(index) {
    const loading = await this.loadingCtrl.create({
      message: 'Chargement...'
    });
    await loading.present();
    this.mailingService.sendMail(this.data[index].email).subscribe((res) => {
      this.data[index] = res.user;
      loading.dismiss();
    });
  }
}
