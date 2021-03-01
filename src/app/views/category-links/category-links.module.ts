import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryLinksPageRoutingModule } from './category-links-routing.module';

import { CategoryLinksPage } from './category-links.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryLinksPageRoutingModule
  ],
  declarations: [CategoryLinksPage]
})
export class CategoryLinksPageModule {}
