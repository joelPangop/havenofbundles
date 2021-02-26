import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {ModalController, NavParams} from "@ionic/angular";
import {BehaviorSubject} from "rxjs";
import {Colors} from "../../models/colors";
import {Styles} from "../../models/styles";
import {BundleCategories} from "../../models/bundleCategories";
import {Origins} from "../../models/Origins";
import {ProductCategories} from "../../models/productCategories";

@Component({
  selector: 'app-filter-view',
  templateUrl: './filter-view.page.html',
  styleUrls: ['./filter-view.page.scss'],
})
export class FilterViewPage implements OnInit {

  filterObject: BehaviorSubject<any>;
  filterNumber: BehaviorSubject<number>;
  number: number;
  category: string;
  colors: string[];
  bundle_categories: string[];
  origins: string[];
  styles: string[];
  choosenColors: string[] = [];
  choosenOrigins: string[] = [];
  choosenCategories: string[] = [];
  choosenStyles: string[] = [];

  constructor(private modalController: ModalController, private navParams: NavParams) {
  }

  ngOnInit() {
    this.filterObject = this.navParams.get('filterObject');
    this.filterNumber = this.navParams.get('filterNumber');
    this.number = 0;
    this.category = this.navParams.get('category');

    if (this.filterObject.value.choosenColors) {
      this.choosenColors = this.filterObject.value.choosenColors;
    }

    if (this.filterObject.value.choosenOrigins) {
      this.choosenOrigins = this.filterObject.value.choosenOrigins;
    }

    if (this.filterObject.value.choosenCategories) {
      this.choosenCategories = this.filterObject.value.choosenCategories;
    }

    if (this.filterObject.value.choosenStyles) {
      this.choosenStyles = this.filterObject.value.choosenStyles;
    }

    this.colors = Object.values(Colors);
    this.styles = Object.values(Styles);
    this.origins = Object.values(Origins);
    if (this.category === ProductCategories.BUNDLES)
      this.bundle_categories = Object.values(BundleCategories);
  }

  apply() {
    this.number += this.choosenStyles.length;
    this.number += this.choosenCategories.length;
    this.number += this.choosenOrigins.length;
    this.number += this.choosenColors.length;
    this.filterNumber.next(this.number);
    this.submitFilter();
    this.dismiss();
  }

  submitFilter() {
    this.filterObject.next({
      choosenColors: this.choosenColors,
      choosenOrigins: this.choosenOrigins,
      choosenCategories: this.category === ProductCategories.BUNDLES ? this.choosenCategories : null,
      choosenStyles: this.choosenStyles,
    })
  }

  // Back to previous page options
  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  clear() {
    this.number = 0;
    this.choosenColors = [];
    this.choosenOrigins = [];
    this.choosenCategories = [];
    this.choosenStyles = [];
  }
}
