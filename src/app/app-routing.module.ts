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
  },  {
    path: 'dashboard-view',
    loadChildren: () => import('./views/dashboard-view/dashboard-view.module').then( m => m.DashboardViewPageModule)
  },

  // {
  //   path: 'home',
  //   loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
