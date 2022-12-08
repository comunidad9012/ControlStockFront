import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileProductPage } from './file-product.page';

const routes: Routes = [
  {
    path: '',
    component: FileProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileProductPageRoutingModule {}
