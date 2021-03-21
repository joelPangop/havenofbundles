import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/Product';
import {ProductsService} from '../../services/products.service';
import {ProductCategories} from '../../models/productCategories';
import {environment} from '../../models/environments';
import {ModalController, Platform} from '@ionic/angular';
import {FilterViewPage} from '../filter-view/filter-view.page';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../services/page.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-mobile-hair-bundles',
  templateUrl: './mobile-hair-bundles.page.html',
  styleUrls: ['./mobile-hair-bundles.page.scss'],
})
export class MobileHairBundlesPage implements OnInit {

  public products: Product[];
  url = '';
  category = '';
  typeImages: any[] = [];
  filterObject: BehaviorSubject<any>;
  public filterNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  grid: Boolean = true;
  list: Boolean = false;
  like: boolean = false;

  constructor(private productsService: ProductsService, private modalController: ModalController, private router: Router,
              private activatedRoute: ActivatedRoute, public pageService: PageService,
              private authService: AuthenticationService) {
    this.filterObject = new BehaviorSubject({});
    this.filterNumber = new BehaviorSubject(0);
    this.products = [];
    this.typeImages = [
      {
        name: 'curly',
        src: 'assets/images/curly.png'
      },
      {
        name: 'straight',
        src: 'assets/images/straight.png'
      },
      {
        name: 'wave',
        src: 'assets/images/wave.png'
      }
    ];
  }

  ngOnInit() {
    this.category = this.activatedRoute.snapshot.paramMap.get('category');
    this.pageService.productCategory = this.category;
    this.load();
    this.url = environment.api_url;
  }

  load() {
    this.productsService.loadAll().subscribe((products) => {
      this.products = products.filter(res => res.category === this.category);
    });
  }

  getContent() {
    return document.querySelector('ion-content');
  }

  scrollToBottom() {
    this.getContent().scrollToBottom(500);
  }

  scrollToTop() {
    this.getContent().scrollToTop(500);
  }

  doRefresh($event: any) {

  }

  // Go to cart page
  async gotoFilterPage() {
    const modal = await this.modalController.create({
      component: FilterViewPage,
      componentProps: {
        filterObject: this.filterObject,
        category: ProductCategories.BUNDLES,
        filterNumber: this.filterNumber
      }
    });
    modal.onDidDismiss()
      .then(async (data) => {
        console.log(data.data);
        console.log(this.filterObject);
        console.log(this.filterNumber);
        if (this.filterObject.value) {
          if (this.filterObject.value.choosenColors.length > 0) {
            this.products = this.products.filter((prod) => {
              if (prod.colors.length >= this.filterObject.value.choosenColors.length) {
                return this.arrayContainsArray(prod.colors, this.filterObject.value.choosenColors);
              } else {
                return this.arrayContainsArray(this.filterObject.value.choosenColors, prod.colors);
              }
            });
          } else {
            this.load();
          }
          if (this.filterObject.value.choosenOrigins.length > 0) {
            this.products = this.products.filter((prod) => {
              return this.filterObject.value.choosenOrigins.includes(prod.origin);
            });
          } else {
            this.load();
          }

          if (this.filterObject.value.choosenStyles.length > 0) {
            this.products = this.products.filter((prod) => {
              return this.filterObject.value.choosenStyles.includes(prod.origin);
            });
          } else {
            this.load();
          }

          if (this.filterObject.value.choosenCategories.length > 0) {
            this.products = this.products.filter((prod) => {
              return this.filterObject.value.choosenCategories.includes(prod.bundle_category);
            });
          } else {
            this.load();
          }
        }
      });
    return await modal.present();
  }

  arrayContainsArray(superset, subset) {
    if (0 === subset.length) {
      return false;
    }
    return subset.every(function(value) {
      return (superset.indexOf(value) >= 0);
    });
  }

  async goToDetail(product: Product) {
    this.pageService.productCategory = product.category;
    await this.router.navigateByUrl('tabs/mobile-product-view/' + product._id);
  }


  showGrid() {
    this.grid = true;
    this.list = false;
  }

  showList() {
    this.grid = false;
    this.list = true;
  }

  public isWishList(item: Product) {
    return item.likes.includes(this.authService.currentUser.id);
  }

  async checkLike(product: Product) {
    if (product.likes.includes(this.authService.currentUser.id)) {
      this.like = true;
    }
    if (this.authService.currentUser.id) {
      // if (product.userId === this.authService.currentUser.id) {
      //   await this.presentToast('Impossible de liker son propre article');
      // } else {
      if(this.like){
        this.like = false;
      } else {
        this.like = true;
      }
      if (this.like === false) {
        const index = product.likes.indexOf(this.authService.currentUser.id, 0);
        product.likes.splice(index, 1);
      } else {
        product.likes.push(this.authService.currentUser.id);
      }
      this.productsService.checkLike(product).subscribe((res) => {
        console.log(res);
        product = res;
      });
      // }
    }
  }
}
