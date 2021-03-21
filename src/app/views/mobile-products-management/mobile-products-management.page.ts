import {Component, OnInit} from '@angular/core';
import {Platform, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {environment} from '../../models/environments';
import {Product} from '../../models/Product';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-mobile-products-management',
  templateUrl: './mobile-products-management.page.html',
  styleUrls: ['./mobile-products-management.page.scss'],
})
export class MobileProductsManagementPage implements OnInit {

  isDetail: boolean = false;
  isAdd: boolean = false;
  isList: boolean = true;
  action = '';
  ip = '';
  lastItem1: string = '';
  lastItem2: string = '';
  like: boolean = false;

  constructor(public platform: Platform, private router: Router, public productService: ProductsService,
              private authService: AuthenticationService, private toastCtrl: ToastController) {

  }

  ngOnInit() {
    this.load();
    this.ip = environment.api_url;
  }

  async goToAdd() {
    this.isAdd = true;
    this.isList = false;
    this.action = 'add';
    await this.router.navigate(['tabs/add-edit-product/' + this.action + '/' + null]);
  }

  async goToDetail(id) {
    this.action = 'detail';
    if (this.platform.is('ios') || this.platform.is('android')) {
      await this.router.navigateByUrl('tabs/add-edit-product/' + this.action + '/' + id);
    } else {

    }
  }

  load() {
    this.productService.loadAll().subscribe((products) => {
      this.productService.profile_products = products;
    });
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    })
    await toast.present();
  }

}
