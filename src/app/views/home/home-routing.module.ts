import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {TabsPage} from "../tabs/tabs.page";

const routes: Routes = [
  {
    path: '',
    component: HomePage,
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
      }
      // ,
      // {
      //   path: 'mailing-list',
      //   loadChildren: () => import('../mailing-list/mailing-list.module').then( m => m.MailingListPageModule)
      // },
      // {
      //   path: 'profile',
      //   loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      // }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
