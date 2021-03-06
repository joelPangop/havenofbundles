import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import {Tab1PageModule} from '../tab1/tab1.module';
import {Tab2PageModule} from '../tab2/tab2.module';
import {Tab3PageModule} from '../tab3/tab3.module';
import {DashboardPageModule} from '../dashboard/dashboard.module';
import {ProductsPageModule} from "../products/products.module";
import {HairBundlesPageModule} from "../hair-bundles/hair-bundles.module";
import {HomePageModule} from "../home/home.module";
import {ProductViewPageModule} from '../product-view/product-view.module';
import {BundleSetListPageModule} from '../bundle-set-list/bundle-set-list.module';
import {BundleSetPageModule} from '../bundle-set/bundle-set.module';
import {TabsPageModule} from "../tabs/tabs.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MenuPageRoutingModule,
        Tab1PageModule,
        Tab2PageModule,
        Tab3PageModule,
        DashboardPageModule,
        ProductsPageModule,
        HairBundlesPageModule,
        HomePageModule,
        ProductViewPageModule,
        BundleSetListPageModule,
        BundleSetPageModule,
        TabsPageModule
    ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
