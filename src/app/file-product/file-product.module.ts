import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FileProductPageRoutingModule } from './file-product-routing.module';

import { FileProductPage } from './file-product.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FileProductPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FileProductPage]
})
export class FileProductPageModule {}
