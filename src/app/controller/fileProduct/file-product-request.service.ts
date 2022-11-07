import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileProduct } from 'src/app/entities/file-product/file-product';

@Injectable({
  providedIn: 'root'
})
export class FileProductRequestService {

  //baseURL = 'http://168.232.165.65:8888/api';
  baseURL = 'http://localhost:8888/api';

  constructor(private httpClient: HttpClient) { }

  //Post File Product
  public newFileProduct(fileProduct: FileProduct): Observable<FileProduct> {
    return this.httpClient.post<FileProduct>(this.baseURL + '/file-products/new', fileProduct);
  }

}
