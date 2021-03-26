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
  },
  {
    path: 'bundle-set-list',
    loadChildren: () => import('./views/bundle-set-list/bundle-set-list.module').then( m => m.BundleSetListPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./views/auth/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./views/auth/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./views/auth/verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./views/auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'mobile-landing',
    loadChildren: () => import('./views/mobile-auth/mobile-landing/mobile-landing.module').then( m => m.MobileLandingPageModule)
  },
  {
    path: 'mobile-sign-in',
    loadChildren: () => import('./views/mobile-auth/mobile-sign-in/mobile-sign-in.module').then( m => m.MobileSignInPageModule)
  },
  {
    path: 'mobile-verification',
    loadChildren: () => import('./views/mobile-auth/mobile-verification/mobile-verification.module').then( m => m.MobileVerificationPageModule)
  },
  {
    path: 'mobile-forgot-password',
    loadChildren: () => import('./views/mobile-auth/mobile-forgot-password/mobile-forgot-password.module').then( m => m.MobileForgotPasswordPageModule)
  },
  {
    path: 'mobile-sign-up',
    loadChildren: () => import('./views/mobile-auth/mobile-sign-up/mobile-sign-up.module').then( m => m.MobileSignUpPageModule)
  },
  {
    path: 'modify-profile-image',
    loadChildren: () => import('./views/modify-profile-image/modify-profile-image.module').then( m => m.ModifyProfileImagePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
