import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
      },
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
        loadChildren: () => import('../auth/sign-in/sign-in.module').then( m => m.SignInPageModule)
      },
      {
        path: 'sign-up',
        loadChildren: () => import('../auth/sign-up/sign-up.module').then( m => m.SignUpPageModule)
      },
      {
        path: 'landing',
        loadChildren: () => import('../auth/landing/landing.module').then( m => m.LandingPageModule)
      },
      {
        path: 'verification',
        loadChildren: () => import('../auth/verification/verification.module').then( m => m.VerificationPageModule)
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('../auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
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
        path: 'tabs/mobile-products-management',
        loadChildren: () => import('../mobile-products-management/mobile-products-management.module').then( m => m.MobileProductsManagementPageModule)
      },
      {
        path: 'tabs/mobile-home',
        loadChildren: () => import('../mobile-home/mobile-home.module').then( m => m.MobileHomePageModule)
      },
      {
        path: 'tabs/mobile-hair-bundles/:category',
        loadChildren: () => import('../mobile-hair-bundles/mobile-hair-bundles.module').then( m => m.MobileHairBundlesPageModule)
      },
      {
        path: 'tabs/mobile-product-view/:id',
        loadChildren: () => import('../mobile-product-view/mobile-product-view.module').then( m => m.MobileProductViewPageModule)
      },
      {
        path: 'product-view',
        loadChildren: () => import('../product-view/product-view.module').then( m => m.ProductViewPageModule)
      },
      {
        path: 'bundle-set/:id',
        loadChildren: () => import('../bundle-set/bundle-set.module').then( m => m.BundleSetPageModule)
      },
      {
        path: 'bundle-set-list',
        loadChildren: () => import('../bundle-set-list/bundle-set-list.module').then( m => m.BundleSetListPageModule)
      },
      {
        path: 'tabs/mobile-bundle-set/:id',
        loadChildren: () => import('../mobile-bundle-set/mobile-bundle-set.module').then( m => m.MobileBundleSetPageModule)
      },
      {
        path: 'tabs/mobile-bundle-set-manager',
        loadChildren: () => import('../mobile-bundle-set-manager/mobile-bundle-set-manager.module').then( m => m.MobileBundleSetManagerPageModule)
      },
      {
        path: 'tabs/mobile-add-edit-bundle-set/:action/:id',
        loadChildren: () => import('../mobile-add-edit-bundle-set/mobile-add-edit-bundle-set.module').then( m => m.MobileAddEditBundleSetPageModule)
      },
      {
        path: 'bundle-set-manager',
        loadChildren: () => import('../bundle-set-manager/bundle-set-manager.module').then( m => m.BundleSetManagerPageModule)
      },
      {
        path: 'tabs/mobile-bundle-set-list/:category',
        loadChildren: () => import('../mobile-bundle-set-list/mobile-bundle-set-list.module').then( m => m.MobileBundleSetListPageModule)
      },
      {
        path: 'tabs/mobile-account',
        loadChildren: () => import('../mobile-account/mobile-account.module').then( m => m.MobileAccountPageModule)
      }, {
        path: 'tabs/mobile-personal-info/:category/:id',
        loadChildren: () => import('../mobile-personal-info/mobile-personal-info.module').then( m => m.MobilePersonalInfoPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then( m => m.AccountPageModule)
      },
      {
        path: 'products-management',
        loadChildren: () => import('../products-management/products-management.module').then( m => m.ProductsManagementPageModule)
      },
      {
        path: 'hair-bundles',
        loadChildren: () => import('../hair-bundles/hair-bundles.module').then( m => m.HairBundlesPageModule)
      },
      {
        path: 'product-view/:id',
        loadChildren: () => import('../product-view/product-view-routing.module').then( m => m.ProductViewPageRoutingModule)
      },
      {
        path: 'personal-info',
        loadChildren: () => import('../personal-info/personal-info.module').then( m => m.PersonalInfoPageModule)
      },
      {
        path: 'update-password',
        loadChildren: () => import('../update-password/update-password.module').then( m => m.UpdatePasswordPageModule)
      },
      {
        path: 'wish-list',
        loadChildren: () => import('../wish-list/wish-list.module').then( m => m.WishListPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../cart/cart.module').then( m => m.CartPageModule)
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
