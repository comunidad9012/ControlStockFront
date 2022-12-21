import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileProduct } from 'src/app/entities/file-product/file-product';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileProductRequestService {

  baseURL = environment.baseURL;

  constructor(private httpClient: HttpClient) { }

  //Post File Product
  public newFileProduct(fileProduct: FileProduct): Observable<FileProduct> {
    return this.httpClient.post<FileProduct>(this.baseURL + '/file-products/new', fileProduct);
  }

  public newFileProductsWithCode(data: any): Observable<any> {
    return this.httpClient.post<any>(this.baseURL + '/file-products/code/new', data);
  }

  public getAllFileProducts(): Observable<FileProduct[]> {
    return this.httpClient.get<FileProduct[]>(this.baseURL + '/file-products');
  }

  public deletelFileProduct(id: number): Observable<HttpStatusCode> {
    return this.httpClient.delete<HttpStatusCode>(this.baseURL + '/file-products/' + id);
  }

  public deletelFileAndScannedProduct(id: number): Observable<HttpStatusCode> {
    return this.httpClient.delete<HttpStatusCode>(this.baseURL + '/file-products/and-scanned/' + id);
  }

  public deleteAllFileProducts(): Observable<HttpStatusCode> {
    return this.httpClient.delete<HttpStatusCode>(this.baseURL + '/file-products');
  }

  public updateFileProduct(fileProductId: number, fileProduct: FileProduct): Observable<FileProduct> {
    return this.httpClient.put<FileProduct>(this.baseURL + '/file-products/' + fileProductId, fileProduct);
  }

}
