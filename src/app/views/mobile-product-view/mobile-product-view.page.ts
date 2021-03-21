import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides, LoadingController, NavParams, Platform, PopoverController} from "@ionic/angular";
import {ProductsService} from "../../services/products.service";
import {ActivatedRoute} from "@angular/router";
import {Product, Rate} from "../../models/Product";
import {environment} from "../../models/environments";
import {RateViewPage} from "../rate-view/rate-view.page";
import {ColorViewPage} from "../color-view/color-view.page";
import {PageService} from '../../services/page.service';

@Component({
  selector: 'app-mobile-product-view',
  templateUrl: './mobile-product-view.page.html',
  styleUrls: ['./mobile-product-view.page.scss'],
})
export class MobileProductViewPage implements OnInit {
  private id: string;
  public product: Product;
  public color: any;
  public rate: Rate;

  @ViewChild('slideWithNav', {static: false}) slideWithNav: IonSlides;

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
  imgURL: any;
  ip: string;
  price = 0;
  detailView: string = 'description';
  public quantity = 1;
  public quantities = [];

  constructor(public platform: Platform, public productService: ProductsService, private activatedRoute: ActivatedRoute,
              private popoverController: PopoverController, public pageService: PageService) {
    this.product = {} as Product;
    this.rate = {} as Rate;
    this.color = "";
    this.ip = environment.api_url;
    this.quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.detailView = 'description';
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.load();
  }

  load(){
    this.productService.loadById(this.id).subscribe((product) => {
      this.product = product;
      this.rate = this.product.rates[0];
      this.price = this.product.rates[0].price;
      this.color = this.product.colors[0];
      let tablinks = document.getElementsByClassName('sidetablinks');
      tablinks[0].className = tablinks[0].className += ' active';
    });
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

  getPrice() {
    for (let rate of this.product.rates) {
      if (rate.length === this.rate.length) {
        this.price += rate.price;
      }
    }
  }

  async showOptions(ev: MouseEvent) {
    const popover = await this.popoverController.create({
      component: RateViewPage,
      event: ev,
      translucent: true,
      // cssClass: 'my-custom-dialog',
      componentProps: {
        rates: this.product.rates,
        rate: this.rate,
        product: this.product,
        color: this.color
      }
    });
    popover.onDidDismiss()
      .then((data: any) => {
        if(data.data){
          console.log(data.data.price);
          this.price = data.data.price;
          this.rate = data.data.rate;
        }
      });
    return await popover.present();
  }

  async showColors(ev: MouseEvent) {
    const popover = await this.popoverController.create({
      component: ColorViewPage,
      event: ev,
      translucent: true,
      // cssClass: 'my-custom-dialog',
      componentProps: {
        color: this.color,
        colors: this.rate.can_extra ? this.product.colors : ["black"],
        price: this.price,
        rate: this.rate,
      }
    });
    popover.onDidDismiss()
      .then((data: any) => {
        if(data.data){
          console.log(data.data.price);
          this.price = data.data.price;
          this.color = data.data.color;
        }
      });
    return await popover.present();
  }

  public async changeView(event, page: string): Promise<void> {
    let i, tablinks;
    this.detailView = page;
    tablinks = document.getElementsByClassName('sidetablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    event.currentTarget.className += ' active';
  }

  addToCart() {

  }
}
