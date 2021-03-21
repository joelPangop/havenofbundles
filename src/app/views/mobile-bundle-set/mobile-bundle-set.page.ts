import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../models/Product";
import {BundleSet} from "../../models/BundleSet";
import {ProductsService} from "../../services/products.service";
import {BundleSetService} from "../../services/bundle-set.service";
import {Styles} from "../../models/styles";
import {ProductCategories} from "../../models/productCategories";
import {environment} from "../../models/environments";
import {ActivatedRoute} from "@angular/router";
import {IonSlides} from "@ionic/angular";

@Component({
  selector: 'app-mobile-bundle-set',
  templateUrl: './mobile-bundle-set.page.html',
  styleUrls: ['./mobile-bundle-set.page.scss'],
})
export class MobileBundleSetPage implements OnInit {
  bundleSet: BundleSet;
  @ViewChild('slideWithNav', {static: false}) slideWithNav: IonSlides;
  ip: string;
  id:string;
  slideOpts = {
    isBeginningSlide: true,
    isEndSlide: false,
    speed: 1000,
    slidesPerView: 1,
    zoom: {
      maxRatio: 5,
    },
    spaceBetween: 25,
    autoplay: {
      delay: 4000
    }
  };

  constructor(public productService: ProductsService, public bundleSetService: BundleSetService, private activatedRoute: ActivatedRoute) {
    this.bundleSet = new BundleSet();
  }

  ngOnInit() {
    this.ip = environment.api_url;
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadBundleSet();
  }

  loadBundleSet() {
   this.bundleSetService.getBundleSet(this.id).subscribe((res) => {
     console.log(res);
     this.bundleSet = res;
   })
  }

  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }

  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }
}
