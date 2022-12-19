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
import { ActuallyArchingComponent } from './actually-arching/actually-arching.component';
import { HistoryArchingComponent } from './history-arching/history-arching.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FileProductUpdateComponent } from './file-product-update/file-product-update.component';
import { FileProductListComponent } from './file-product-list/file-product-list.component';
import { NewFileProductWithCodeComponent } from './new-file-product-with-code/new-file-product-with-code.component';
import { NewArchingComponent } from './new-arching/new-arching.component';


@NgModule({
  declarations: [
    SccanerComponent,
    ScannedProductListComponent,
    FileProductConfirmListComponent,
    NewFileProductComponent,
    ActuallyArchingComponent,
    HistoryArchingComponent,
    CalendarComponent,
    FileProductUpdateComponent,
    FileProductListComponent,
    NewFileProductWithCodeComponent,
    NewArchingComponent
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
    NewFileProductComponent,
    ActuallyArchingComponent,
    HistoryArchingComponent,
    CalendarComponent,
    FileProductUpdateComponent,
    FileProductListComponent,
    NewFileProductWithCodeComponent,
    NewArchingComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
