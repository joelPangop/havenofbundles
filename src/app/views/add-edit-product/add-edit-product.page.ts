import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonSlides, LoadingController, Platform, ToastController} from '@ionic/angular';
import {ProductsService} from '../../services/products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ImageService} from '../../services/image.service';
import {BundleCategories} from '../../models/bundleCategories';
import {Colors} from '../../models/colors';
import {ProductCategories} from '../../models/productCategories';
import {Styles} from '../../models/styles';
import {Care, Description, Extra, HairInfo, Product, Rate} from '../../models/Product-interface';
import {environment} from '../../models/environments';
import {Origins} from '../../models/Origins';


@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.page.html',
  styleUrls: ['./add-edit-product.page.scss'],
})
export class AddEditProductPage implements OnInit {

  @ViewChild('slideWithNav', {static: false}) slideWithNav: IonSlides;
  action = '';
  id = '';
  ip = '';
  view = 'details';
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
  origins: string[];
  change_position_view: boolean = false;
  contentScrollActive = true;
  product: Product;

  constructor(public platform: Platform, public productService: ProductsService, private activatedRoute: ActivatedRoute,
              private toastCtrl: ToastController, private formBuilder: FormBuilder, private imageService: ImageService,
              private router: Router, public loadingCtrl: LoadingController, private alertController: AlertController,
              private toastCtr: ToastController) {
    this.uploadForm = this.formBuilder.group({
      image: ['']
    });
    this.imgURL = new Map<any, any>();
    this.myPictures = [];
    this.product = {} as Product;
  }

  ngOnInit() {
    this.ip = environment.api_url;
    this.load();
  }

  ionViewDidEnter() {
    this.load();
  }

  ionViewWillLeave() {
    this.productService.profile_product = {} as Product;
  }

  load() {
    this.action = this.activatedRoute.snapshot.paramMap.get('action');
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.myPictures = [];
    if (this.id !== 'null') {
      console.log('ID non null');
      this.productService.loadById(this.id).subscribe((product) => {
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
      });
    } else {
      this.productService.profile_product = new Product();
      this.productService.profile_product.rates = [];
      this.productService.profile_product.description = new Description();
      this.productService.profile_product.hairInfo = new HairInfo();
      this.productService.profile_product.care = new Care();
    }
    this.bundlesCategories = Object.values(BundleCategories);
    this.colors = Object.values(Colors);
    this.productCategories = Object.values(ProductCategories);
    this.styles = Object.values(Styles);
    this.origins = Object.values(Origins);
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const files: [] = event.target.files;
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
    const reader = new FileReader();
    this.imagePath = files;
    await reader.readAsDataURL(files);

    if (mimeType.match(/image\/*/) !== null) {
      const reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files);
      reader.onload = (_event) => {
        this.imgURL.set(reader.result, files);
      };
      console.log('test');
    }
    if (mimeType.match(/video\/*/) !== null) {
      const self = this;
      reader.onload = async (_event) => {
        const snapImage = function () {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
          const image = canvas.toDataURL();
          const success = image.length > 100000;
          if (success) {
            const img = document.createElement('img');
            img.src = image;
            self.imgURL.set(img.src, files);
            URL.revokeObjectURL(url);
          }
          return success;
        };
        const blob = new Blob([reader.result], {type: files.type});
        const url = URL.createObjectURL(files);
        const video: any = document.createElement('video');

        const timeupdate = function () {
          if (snapImage()) {
            video.removeEventListener('timeupdate', timeupdate);
            video.pause();
          }
        };
        video.addEventListener('loadeddata', function () {
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
    if (this.id === 'null') {
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
              this.productService.profile_product = {} as Product;
              this.myPictures = [];
              this.imgURL = new Map<any, any>();
              this.productService.loadAll().subscribe((res) => {
                this.productService.profile_products = res;
                loading.dismiss();
                this.router.navigate(['tabs/mobile-products-management']);
                this.presentToast('Product successfully created', 1500);
              });
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
          this.productService.update(this.id).subscribe((res) => {
            console.log(res);
            this.productService.profile_product = res;
            this.productService.loadAll().subscribe((res) => {
              this.productService.profile_products = res;
              this.myPictures = [];
              this.action = 'detail';
              this.imgURL = new Map<any, any>();
              loading.dismiss();
              this.presentToast('Product successfully updated', 1500);
            });
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
    if (this.action === 'edit') {
      this.action = 'detail';
      this.productService.loadById(this.id).subscribe((product) => {
        this.productService.profile_product = product;
      });
    } else {
      this.action = 'edit';
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
        this.productService.update(this.id).subscribe((res) => {
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

}
