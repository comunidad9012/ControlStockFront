import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileProduct } from 'src/app/entities/file-product/file-product';

@Injectable({
  providedIn: 'root'
})
export class FileProductRequestService {

  baseURL = 'http://34.95.208.112:8080/ControlStockBackendDeploy-0.0.1-SNAPSHOT/api';

  constructor(private httpClient: HttpClient) { }

  //Post File Product
  public newFileProduct(fileProduct: FileProduct): Observable<FileProduct> {
    return this.httpClient.post<FileProduct>(this.baseURL + '/file-products/new', fileProduct);
  }

}
