import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SccanerComponent } from './sccaner/sccaner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScannedProductListComponent } from './scanned-product-list/scanned-product-list.component';
import { FileProductConfirmListComponent } from './file-product-confirm-list/file-product-confirm-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NewFileProductComponent } from './new-file-product/new-file-product.component';


@NgModule({
  declarations: [
    SccanerComponent,
    ScannedProductListComponent,
    FileProductConfirmListComponent,
    NewFileProductComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule

  ],
  exports: [
    SccanerComponent,
    ScannedProductListComponent,
    FileProductConfirmListComponent,
    NewFileProductComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
