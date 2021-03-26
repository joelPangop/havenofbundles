import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonSlides} from '@ionic/angular';
import {BundleSet} from '../../models/BundleSet';
import {BundleSetService} from '../../services/bundle-set.service';
import {environment} from '../../models/environments';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-bundle-set',
  templateUrl: './bundle-set.page.html',
  styleUrls: ['./bundle-set.page.scss'],
})
export class BundleSetPage implements OnInit {

  bundleSet: BundleSet;
  private id: string;

  @ViewChild('slideWithNav', {static: false}) slideWithNav: IonSlides;
  @Input() name: string;
  ip: string;

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

  constructor(private bundleSetService: BundleSetService, private activatedRoute: ActivatedRoute) {
    this.bundleSet = new BundleSet();
  }

  ngOnInit() {
    // this.id = this.name;
    this.ip = environment.api_url;
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.bundleSetService.getBundleSet(this.id).subscribe((res) => {
      this.bundleSet = res;
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


}
