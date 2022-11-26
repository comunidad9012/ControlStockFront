import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArchingPage } from './arching.page';

const routes: Routes = [
  {
    path: '',
    component: ArchingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArchingPageRoutingModule {}
