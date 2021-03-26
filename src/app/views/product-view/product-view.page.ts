import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonSlides, LoadingController, Platform, PopoverController} from '@ionic/angular';
import {ProductsService} from '../../services/products.service';
import {ActivatedRoute} from '@angular/router';
import {Product, Rate} from '../../models/Product';
import {environment} from '../../models/environments';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.page.html',
  styleUrls: ['./product-view.page.scss'],
})
export class ProductViewPage implements OnInit {

  @Input() name: string;

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
  private id: string;
  public product: Product;
  public color: any;
  public length: any;
  public rate: Rate;
  public quantity = 1;
  public quantities = [];

  constructor(public platform: Platform, public productService: ProductsService, private activatedRoute: ActivatedRoute,
              private popoverController: PopoverController, private loadingCtrl: LoadingController) {
    this.product = new Product();
    // this.rate = {} as Rate;
    // this.color = "";
    this.ip = environment.api_url;
    this.quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.detailView = 'description';
  }

  ngOnInit() {
    // this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.product = new Product();
    this.load();
  }

  load() {
    this.productService.loadById(this.id).subscribe((product) => {
      this.product = product;
      this.rate = this.product.rates[0];
      this.price = this.product.rates[0].price;
      this.length = this.product.rates[0].length;
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

  public changePriceByColor(option) {
    switch (option) {
      case 'color':
        if (this.color === 'gold' && this.rate.can_extra) {
          this.price += 20;
        }
        if (this.rate.price < this.price && this.color === 'black') {
          this.price -= 20;
        }
        break;
      case 'length':
        for (let rate of this.product.rates) {
          if (rate.length === this.rate.length) {
            this.price = rate.price;
          }
        }
        if (this.color === 'gold' && this.rate.can_extra) {
          this.price += 20;
        }
        if (this.rate.price < this.price && this.color === 'black') {
          this.price -= 20;
        }
        break;
    }
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
