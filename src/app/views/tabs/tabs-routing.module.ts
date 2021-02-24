import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'mailing-list',
        loadChildren: () => import('../mailing-list/mailing-list.module').then( m => m.MailingListPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'sign-in',
        loadChildren: () => import('../sign-in/sign-in.module').then( m => m.SignInPageModule)
      },
      {
        path: 'sign-up',
        loadChildren: () => import('../sign-up/sign-up.module').then( m => m.SignUpPageModule)
      },
      {
        path: 'landing',
        loadChildren: () => import('../landing/landing.module').then( m => m.LandingPageModule)
      },
      {
        path: 'summary',
        loadChildren: () => import('../summary/summary.module').then( m => m.SummaryPageModule)
      },
      {
        path: 'sold',
        loadChildren: () => import('../sold/sold.module').then( m => m.SoldPageModule)
      },
      {
        path: 'profile-products',
        loadChildren: () => import('../profile-products/profile-products.module').then( m => m.ProfileProductsPageModule)
      },
      {
        path: 'add-edit-product/:action/:id',
        loadChildren: () => import('../add-edit-product/add-edit-product.module').then( m => m.AddEditProductPageModule)
      },
      {
        path: 'available',
        loadChildren: () => import('../available/available.module').then( m => m.AvailablePageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'mobile-products-management',
        loadChildren: () => import('../mobile-products-management/mobile-products-management.module').then( m => m.MobileProductsManagementPageModule)
      },
      {
        path: 'mobile-home',
        loadChildren: () => import('../mobile-home/mobile-home.module').then( m => m.MobileHomePageModule)
      },
      {
        path: 'mobile-hair-bundles',
        loadChildren: () => import('../mobile-hair-bundles/mobile-hair-bundles.module').then( m => m.MobileHairBundlesPageModule)
      },
      {
        path: 'mobile-product-view',
        loadChildren: () => import('../mobile-product-view/mobile-product-view.module').then( m => m.MobileProductViewPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
