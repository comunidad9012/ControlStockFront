import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArchingPageRoutingModule } from './arching-routing.module';

import { ArchingPage } from './arching.page';

import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArchingPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ArchingPage]
})
export class ArchingPageModule {}
