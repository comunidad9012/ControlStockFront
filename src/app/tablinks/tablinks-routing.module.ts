import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablinksPage } from './tablinks.page';
import { ArchingOpenGuard } from '../arching-open.guard';

const routes: Routes = [
  {
    path: 'tablinks',
    component: TablinksPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule),
        canActivate: [ArchingOpenGuard]
      },
      {
        path: 'arching',
        loadChildren: () => import('../arching/arching.module').then( m => m.ArchingPageModule)
      },
      {
        path: 'file-product',
        loadChildren: () => import('../file-product/file-product.module').then( m => m.FileProductPageModule),
        canActivate: [ArchingOpenGuard]
      },
      {
        path: '',
        redirectTo: '/tablinks/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tablinks/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablinksPageRoutingModule {}
