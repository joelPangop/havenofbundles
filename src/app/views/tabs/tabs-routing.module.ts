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
        path: 'products',
        loadChildren: () => import('../products/products.module').then( m => m.ProductsPageModule)
      },
      {
        path: 'product/:id',
        loadChildren: () => import('../product/product.module').then( m => m.ProductPageModule)
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
        path: 'mobile-hair-bundles/:category',
        loadChildren: () => import('../mobile-hair-bundles/mobile-hair-bundles.module').then( m => m.MobileHairBundlesPageModule)
      },
      {
        path: 'mobile-product-view/:id',
        loadChildren: () => import('../mobile-product-view/mobile-product-view.module').then( m => m.MobileProductViewPageModule)
      },
      {
        path: 'product-view',
        loadChildren: () => import('../product-view/product-view.module').then( m => m.ProductViewPageModule)
      },
      {
        path: 'bundle-set',
        loadChildren: () => import('../bundle-set/bundle-set.module').then( m => m.BundleSetPageModule)
      },
      {
        path: 'mobile-bundle-set',
        loadChildren: () => import('../mobile-bundle-set/mobile-bundle-set.module').then( m => m.MobileBundleSetPageModule)
      },
      {
        path: 'mobile-bundle-set-manager',
        loadChildren: () => import('../mobile-bundle-set-manager/mobile-bundle-set-manager.module').then( m => m.MobileBundleSetManagerPageModule)
      },
      {
        path: 'mobile-add-edit-bundle-set/:action/:id',
        loadChildren: () => import('../mobile-add-edit-bundle-set/mobile-add-edit-bundle-set.module').then( m => m.MobileAddEditBundleSetPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
