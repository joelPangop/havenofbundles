import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController, NavParams} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FileValidatorDirective} from '../../services/file-validator.directive';
import {File, FileInfo} from '../../models/file';
import {AuthenticationService} from '../../services/authentication.service';
import {MailService} from '../../services/mail.service';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-modify-profile-image',
  templateUrl: './modify-profile-image.page.html',
  styleUrls: ['./modify-profile-image.page.scss'],
})
export class ModifyProfileImagePage implements OnInit {

  uploadForm: FormGroup;
  imgURL: any;
  ip: string;
  newImg: any;
  private message: string;
  uploadedFile = {} as File;

  constructor(private modalController: ModalController, public formBuilder: FormBuilder, private navParams: NavParams,
              private authSrv: AuthenticationService, public imgSrv: ImageService, private loadCtrl: LoadingController) {
    this.uploadForm = new FormGroup({
      image: new FormControl({}, [FileValidatorDirective.validate])
    });
  }

  ngOnInit() {
    this.imgURL = this.navParams.get('imgURL');
    this.uploadForm = new FormGroup({
      image: new FormControl({}, [FileValidatorDirective.validate])
    });
  }

  onFileSelect(event) {
    this.imgURL = [];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.newImg = event.target.files[0];
      this.uploadedFile.fileInfo = new FileInfo();
      this.uploadedFile.fileInfo.name = this.newImg.name;
      this.uploadedFile.fileInfo.size = this.newImg.size;
      this.uploadedFile.fileInfo.file_type = this.newImg.type;
      this.uploadedFile.fileInfo.ownerId = this.authSrv.currentUser.email;
      this.preview(file);
    }
  }

  preview(files) {
    const mimeType = files.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    // tslint:disable-next-line:prefer-const
    const reader = new FileReader();
    // this.imagePath = files;
    reader.readAsDataURL(files);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  async apply() {
    const load = await this.loadCtrl.create();
    await load.present();
    if (this.newImg) {
      this.uploadForm.get('image').setValue(this.newImg);
      await this.imgSrv.uploadImage(this.uploadForm).subscribe(async res => {
        this.uploadedFile.path = res.filename;
        let user = {} as any;
        user.avatar = this.uploadedFile;
        this.authSrv.updateImage(user).subscribe((res) => {
          console.log('user saved:', res);
          load.dismiss();
          const modal = this.navParams.get('modal');
          modal.dismiss({
            newImg: this.newImg
          });
        });
      });
    }
  }

  async dismiss() {
    await this.modalController.dismiss({
      dismissed: true
    });
  }

}
