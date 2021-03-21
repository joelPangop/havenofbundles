import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/Product";
import {BundleSet} from "../../models/BundleSet";
import {ProductsService} from "../../services/products.service";
import {BundleSetService} from "../../services/bundle-set.service";
import {ProductCategories} from "../../models/productCategories";
import {Styles} from "../../models/styles";
import {Router} from "@angular/router";
import {environment} from "../../models/environments";

@Component({
  selector: 'app-mobile-bundle-set-manager',
  templateUrl: './mobile-bundle-set-manager.page.html',
  styleUrls: ['./mobile-bundle-set-manager.page.scss'],
})
export class MobileBundleSetManagerPage implements OnInit {

  product: Product;
  bundleSet: BundleSet;
  styles: string[];
  style: string;
  private action: string;
  ip: string;

  constructor(public bundleSetService: BundleSetService, private router: Router) {
    this.product = new Product();
  }

  ngOnInit() {
    this.ip = environment.api_url;
    this.styles = Object.values(Styles);
    this.loadBundles();
  }

  loadBundles() {
    this.bundleSetService.getAllBundleSet().subscribe((res) => {
      console.log(res);
      this.bundleSetService.bundleSets = res;
    })
  }

  async goToAdd() {
    this.action = 'add';
    await this.router.navigate(['tabs/mobile-add-edit-bundle-set/' + this.action + '/' + null]);
  }

  async goToDetail(id: string) {
    this.action = 'detail'
    await this.router.navigateByUrl('tabs/mobile-add-edit-bundle-set/' + this.action + '/' + id);
  }
}
