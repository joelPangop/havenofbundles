import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./views/tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  // { path: '', redirectTo: 'mobile', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./views/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'products-management',
    loadChildren: () => import('./views/products-management/products-management.module').then( m => m.ProductsManagementPageModule)
  },
  {
    path: 'hair-bundles',
    loadChildren: () => import('./views/hair-bundles/hair-bundles.module').then( m => m.HairBundlesPageModule)
  },
  {
    path: 'filter-view',
    loadChildren: () => import('./views/filter-view/filter-view.module').then( m => m.FilterViewPageModule)
  },
  {
    path: 'rate-view',
    loadChildren: () => import('./views/rate-view/rate-view.module').then( m => m.RateViewPageModule)
  },
  {
    path: 'color-view',
    loadChildren: () => import('./views/color-view/color-view.module').then( m => m.ColorViewPageModule)
  },
  {
    path: 'category-links',
    loadChildren: () => import('./views/category-links/category-links.module').then( m => m.CategoryLinksPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
