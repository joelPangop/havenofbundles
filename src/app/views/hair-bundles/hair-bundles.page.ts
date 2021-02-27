import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {AlertController, LoadingController, ToastController} from "@ionic/angular";
import {FormBuilder} from "@angular/forms";
import {ImageService} from "../../services/image.service";
import {environment} from "../../models/environments";
import {Colors} from "../../models/colors";
import {ProductCategories} from "../../models/productCategories";
import {Product} from "../../models/Product-interface";
import {Origins} from "../../models/Origins";
import {Styles} from "../../models/styles";
import {BundleCategories} from "../../models/bundleCategories";

@Component({
  selector: 'app-hair-bundles',
  templateUrl: './hair-bundles.page.html',
  styleUrls: ['./hair-bundles.page.scss'],
})
export class HairBundlesPage implements OnInit {

  ip: string;
  typeImages: any[] = [];
  colors: any[] = [];
  hairInfos: any[] = [];
  hairCategories: any[] = [];
  choosenColors: string[] = [];
  choosenHairInfos: string[] = [];
  choosenCategories: string[] = [];
  public products: Product[];

  constructor(private router: Router, public productService: ProductsService, private activatedRoute: ActivatedRoute,
              private toastCtrl: ToastController, private formBuilder: FormBuilder, private imageService: ImageService,
              public loadingCtrl: LoadingController, private alertController: AlertController) {
    this.ip = environment.api_url;
    this.products = [];
    this.typeImages = [
      {
        name: 'Curly',
        src: 'assets/images/curly.png'
      },
      {
        name: 'Straight',
        src: 'assets/images/straight.png'
      },
      {
        name: 'Body Wave',
        src: 'assets/images/wave.png'
      }
    ];
    for (let color of Object.values(Colors)) {
      this.colors.push({
        color: color,
        isChecked: false
      });
    }
    for (let origin of Object.values(Origins)) {
      this.hairInfos.push({
        hairInfo: origin,
        isChecked: false
      });
    }
    for (let category of Object.values(BundleCategories)) {
      this.hairCategories.push({
        hairCategory: category,
        isChecked: false
      });
    }
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.productService.loadAll().subscribe((products) => {
      this.products = products.filter(res => res.category === ProductCategories.BUNDLES);
    });
  }

  goToDetail(_id: string) {

  }

  checkColors($event, color: any) {
    if (color.isChecked && !this.choosenColors.includes(color.color)) {
      this.choosenColors.push(color.color);
    } else if (!color.isChecked && this.choosenColors.includes(color.color)) {
      this.choosenColors.forEach((element, index) => {
        if (element === color.color) this.choosenColors.splice(index, 1);
      });
    }
    if (this.choosenColors.length > 0) {
      this.products = this.products.filter((prod) => {
        if (prod.colors.length >= this.choosenColors.length) {
          return this.arrayContainsArray(prod.colors, this.choosenColors);
        } else {
          return this.arrayContainsArray(this.choosenColors, prod.colors);
        }
      })
    } else {
      this.load();
    }
  }

  checkHairInfos($event: any, hairInfo: any) {
    if (hairInfo.isChecked && !this.choosenHairInfos.includes(hairInfo.hairInfo)) {
      this.choosenHairInfos.push(hairInfo.hairInfo);
    } else if (!hairInfo.isChecked && this.choosenHairInfos.includes(hairInfo.hairInfo)) {
      this.choosenHairInfos.forEach((element, index) => {
        if (element === hairInfo.hairInfo) this.choosenHairInfos.splice(index, 1);
      });
    }
    if (this.choosenHairInfos.length > 0) {
      this.products = this.products.filter((prod) => {
        return this.choosenHairInfos.includes(prod.origin);
      })
    } else {
      this.load();
    }
  }

  arrayContainsArray(superset, subset) {
    if (0 === subset.length) {
      return false;
    }
    return subset.every(function (value) {
      return (superset.indexOf(value) >= 0);
    });
  }

  checkHairCategories($event: any, item: any) {
    if (item.isChecked && !this.choosenCategories.includes(item.hairCategory)) {
      this.choosenCategories.push(item.hairCategory);
    } else if (!item.isChecked && this.choosenCategories.includes(item.hairCategory)) {
      this.choosenCategories.forEach((element, index) => {
        if (element === item.hairCategory) this.choosenCategories.splice(index, 1);
      });
    }
    if (this.choosenCategories.length > 0) {
      this.products = this.products.filter((prod) => {
        return this.choosenCategories.includes(prod.bundle_category)
      })
    } else {
      this.load();
    }
  }

  clear(){
    this.colors = [];
    this.hairInfos = [];
    this.hairCategories = [];
    for (let color of Object.values(Colors)) {
      this.colors.push({
        color: color,
        isChecked: false
      });
    }
    for (let origin of Object.values(Origins)) {
      this.hairInfos.push({
        hairInfo: origin,
        isChecked: false
      });
    }
    for (let category of Object.values(BundleCategories)) {
      this.hairCategories.push({
        hairCategory: category,
        isChecked: false
      });
    }
    this.load();
  }

  public async changeView(event, item: any): Promise<void> {
    let i, styleTabs;
    styleTabs = document.getElementsByClassName('styleTabs');
    for (i = 0; i < styleTabs.length; i++) {
      styleTabs[i].className = styleTabs[i].className.replace(' active', '');
    }
    event.currentTarget.className += ' active';
    if (item.name) {
      this.products = this.products.filter((prod) => {
        return prod.style === item.name;
      })
    } else {
      this.load();
    }
  }
}
