import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {AlertController, LoadingController, Platform, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {environment} from '../../models/environments';
import {Care, Description, Extra, HairInfo, Product, Rate} from '../../models/Product';
import {BundleCategories} from '../../models/bundleCategories';
import {Colors} from '../../models/colors';
import {ProductCategories} from '../../models/productCategories';
import {Styles} from '../../models/styles';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ImageService} from '../../services/image.service';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {ItemCart} from '../../models/ItemCart';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.page.html',
  styleUrls: ['./products-management.page.scss'],
})
export class ProductsManagementPage implements OnInit {

  isDetail: boolean = false;
  isAdd: boolean = false;
  isList: boolean = true;
  action = '';
  ip = '';
  lastItem1: string = '';
  lastItem2: string = '';
  view = 'list';
  uploadForm: FormGroup;
  public imagePath;
  imgURL: Map<any, any> = new Map<any, any>();
  public message: string;
  myPictures: any[] = [];
  slideOpts = {
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

  bundlesCategories: string[];
  colors: string[];
  productCategories: string[];
  styles: string[];
  change_position_view: boolean = false;
  contentScrollActive = true;
  product: Product;
  file_disposition: string = 'slide';

  constructor(public platform: Platform, private router: Router, public productService: ProductsService, private activatedRoute: ActivatedRoute,
              private toastCtrl: ToastController, private formBuilder: FormBuilder, private imageService: ImageService,
              public loadingCtrl: LoadingController, private alertController: AlertController) {
    this.uploadForm = this.formBuilder.group({
      image: ['']
    });
    this.imgURL = new Map<any, any>();
    this.myPictures = [];
  }

  ngOnInit() {
    this.load();
    this.ip = environment.api_url;
  }

  async goToAdd() {
    this.view = 'add';
    this.productService.profile_product.rates = [];
    this.productService.profile_product.pictures = [];
    this.productService.profile_product.description = new Description();
    this.productService.profile_product.hairInfo = new HairInfo();
    this.productService.profile_product.care = new Care();
    // if (this.platform.is('ios') || this.platform.is('android')) {
    //   await this.router.navigateByUrl('tabs/add-edit-product/' + this.action + '/' + null);
    // }
  }

  async goToDetail(id) {
    console.log('ID non null');
    this.productService.loadById(id).subscribe(async (product) => {
      this.productService.profile_product = product;
      if (!this.productService.profile_product.rates) {
        this.productService.profile_product.rates = [];
      }
      if (!this.productService.profile_product.description) {
        this.productService.profile_product.description = new Description();
      }
      if (!this.productService.profile_product.hairInfo) {
        this.productService.profile_product.hairInfo = new HairInfo();
      }
      if (!this.productService.profile_product.care) {
        this.productService.profile_product.care = new Care();
      }
      this.view = 'detail';

    });
  }

  goToList() {
    this.view = 'list';
  }

  load() {
    this.productService.loadAll().subscribe((products) => {
      this.productService.profile_products = products;
    });

    this.myPictures = [];
    this.bundlesCategories = Object.values(BundleCategories);
    this.colors = Object.values(Colors);
    this.productCategories = Object.values(ProductCategories);
    this.styles = Object.values(Styles);
  }

  onFileSelect(event) {
    // this.imgURL = [];
    if (event.target.files.length > 0) {
      const files: [] = event.target.files;
      // this.myPictures = files;

      for (const file of files) {
        this.preview(file);
      }

    }
  }

  async preview(files) {
    const mimeType = files.type;
    if (mimeType.match(/image\/*/) == null && mimeType.match(/video\/*/) == null) {
      this.message = 'Only images or videos are supported.';
      console.log(this.message);
      this.presentToast(this.message, 2000);
      return;
    }

    // tslint:disable-next-line:prefer-const
    const reader = new FileReader();
    this.imagePath = files;
    await reader.readAsDataURL(files);
    // this.imgURL = [];
    // tslint:disable-next-line:variable-name

    if (mimeType.match(/image\/*/) !== null) {
      // reader.onload = async (_event) => {
      // tslint:disable-next-line:prefer-const
      const reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files);
      // this.imgURL = [];
      // tslint:disable-next-line:variable-name
      reader.onload = (_event) => {
        this.imgURL.set(reader.result, files);
      };
      console.log('test');
      // };
    }
    if (mimeType.match(/video\/*/) !== null) {
      const self = this;
      reader.onload = async (_event) => {
        const snapImage = function() {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
          const image = canvas.toDataURL();
          const success = image.length > 100000;
          if (success) {
            const img = document.createElement('img');
            img.src = image;
            // self.imgURL.push(img.src);
            self.imgURL.set(img.src, files);
            // self.myPictures.push(reader.result);
            // document.getElementById('videoId').appendChild(img);
            // document.getElementsByTagName('div')[0].appendChild(img);
            URL.revokeObjectURL(url);
          }
          return success;
        };
        const blob = new Blob([reader.result], {type: files.type});
        const url = URL.createObjectURL(files);
        const video: any = document.createElement('video');

        const timeupdate = function() {
          if (snapImage()) {
            video.removeEventListener('timeupdate', timeupdate);
            video.pause();
          }
        };
        video.addEventListener('loadeddata', function() {
          if (snapImage()) {
            video.removeEventListener('timeupdate', timeupdate);
          }
        });
        video.addEventListener('timeupdate', timeupdate);
        let source = document.createElement('source');
        source.src = URL.createObjectURL(files);
        video.appendChild(source);

        const controls = document.createAttribute('controls');
        video.preload = 'metadata';
        // source.src = url;
        video.src = url;

        video.setAttributeNode(controls);
        // Load video in Safari / IE11
        video.muted = true;
        video.playsInline = true;
        video.load();

        await video.play();
        // video.onClick(this.openModal(files));
        // @ts-ignore
        // document.getElementById('videoId').click(this.openModal(files));

      };
      reader.readAsArrayBuffer(files);
      this.imgURL.set(reader.result, files);
    }
    // this.myPictures.push(reader.result);
  }

  async presentToast(msg: string, duree: number) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: duree
    });
    await toast.present();
  }

  deleteImage(key: any) {
    this.imgURL.delete(key);
    // this.imgURL.splice(i, 1);
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

  addRate() {
    let rate = new Rate();
    if (this.productService.profile_product.rates.length > 0 && Object.keys(this.productService.profile_product.rates[this.productService.profile_product.rates.length - 1]).length === 0) {
      console.log('No properties');
    } else {
      if (this.productService.profile_product.colors && this.productService.profile_product.colors.includes('gold')) {
        let extra = new Extra();
        extra.motif = '$20 more for blonde';
        rate.extra = extra;
      } else {
        rate.extra = new Extra();
      }
      this.productService.profile_product.rates.push(rate);
    }
  }

  async save() {
    const loading = await this.loadingCtrl.create({
      message: 'Chargement...'
    });
    await loading.present();
    if (!this.productService.profile_product._id) {
      try {
        this.imgURL.forEach((key: any, value: any) => {
          this.myPictures.push(key);
        });
        this.uploadForm.get('image').setValue(this.myPictures);
        await (await this.imageService.uploadImages(this.uploadForm)).subscribe(
          async (res) => {
            console.log(res);
            this.productService.profile_product.pictures = res.files;
            this.productService.save().subscribe((res) => {
              console.log(res);
              this.productService.profile_product = new Product();
              this.myPictures = [];
              this.imgURL = new Map<any, any>();
              loading.dismiss();
              this.router.navigate(['tabs/profile-products']);
              this.presentToast('Product successfully created', 1500);
            });
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      this.imgURL.forEach((key: any, value: any) => {
        this.myPictures.push(key);
      });
      this.uploadForm.get('image').setValue(this.myPictures);
      await (await this.imageService.uploadImages(this.uploadForm)).subscribe(
        async (res) => {
          console.log(res);
          for (let img of res.files as []) {
            this.productService.profile_product.pictures.push(img);
          }
          // this.productService.profile_product.pictures = res.files;
          this.productService.update(this.productService.profile_product._id).subscribe((res) => {
            console.log(res);
            this.productService.profile_product = res;
            this.myPictures = [];
            this.view = 'detail';
            this.imgURL = new Map<any, any>();
            loading.dismiss();
            this.presentToast('Product successfully updated', 1500);
          });
        });
    }
  }

  array = [];

  enableChangeImagePosition() {
    this.change_position_view = !this.change_position_view;
    if (this.change_position_view) {
      this.array = Array.from(this.imgURL, ([key, value]) => ({key, value}));
    }
  }

  onRenderItems(event) {
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    // this.array = Array.from(this.imgURL, ([key, value]) => ({key, value}))
    const interm = this.array[event.detail.to];
    this.array[event.detail.to] = this.array[event.detail.from];
    this.array[event.detail.from] = interm;
    // let draggedItem = this.array.splice(event.detail.from, 1)[0];
    // this.array.splice(event.detail.to, 0, draggedItem);
    //this.listItems = reorderArray(this.listItems, event.detail.from, event.detail.to);
    event.detail.complete();
  }

  reorganizeFiles() {
    this.imgURL.clear();
    for (let arr of this.array) {
      this.imgURL.set(arr.key, arr.value);
    }
    for (let arr of this.imgURL.entries()) {
      console.log('key', arr);
    }
  }

  changeView() {
    if (this.view === 'edit') {
      this.view = 'detail';
      this.imgURL = new Map<any, any>();
      this.productService.loadById(this.productService.profile_product._id).subscribe((product) => {
        this.productService.profile_product = product;
      });
    } else {
      this.view = 'edit';
    }
  }

  onChange($event) {
    console.log($event.target.value);
    this.productService.profile_product.colors = $event.target.value;
    if (this.productService.profile_product.colors && this.productService.profile_product.colors.includes('gold')) {
      if (this.productService.profile_product.rates.length > 0) {
        for (let rate of this.productService.profile_product.rates) {
          let extra = new Extra();
          // extra.motif = '$20 more for blonde';
          rate.can_extra = false;
          rate.extra = extra;
        }
      }
    }
  }

  removeItem(index) {
    this.productService.profile_product.rates.splice(index, 1);
  }

  async presentAlertConfirm(file, index) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: '<strong>Confirm Delete</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.removeArticleImage(file, index);
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  async removeArticleImage(file, index) {
    this.productService.profile_product.pictures.splice(index, 1);
    const loading = await this.loadingCtrl.create({
      message: 'Chargement...'
    });
    await loading.present();
    this.imageService.deleteImage(file).subscribe((res: any) => {
      if (res.message === 'success') {
        this.productService.update(this.productService.profile_product._id).subscribe((res) => {
          console.log(res);
          this.productService.profile_product = res;
          loading.dismiss();
        });
      } else {
        this.productService.profile_product.pictures.splice(index, 0, file);
        loading.dismiss();
      }
    });
  }

  toggle_disposition() {
    if (this.file_disposition === 'slide') {
      this.file_disposition = 'grid';
    } else {
      this.file_disposition = 'slide';
    }
  }

}
