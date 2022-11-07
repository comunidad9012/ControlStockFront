import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScannerProduct } from 'src/app/entities/scanner-product/scanner-product';

@Injectable({
  providedIn: 'root'
})
export class ScannerRequestService {

  //baseURL = 'http://168.232.165.65:8888/api';
  baseURL = 'http://localhost:8888/api';

  constructor(private httpClient: HttpClient) { }

  //Post or Update
  public newOrUpdateScannedProduct(fileProdcutId: number, scannerProduct: ScannerProduct): Observable<ScannerProduct> {
    return this.httpClient.post<ScannerProduct>(this.baseURL + '/scanned-product/new-update/' + fileProdcutId, scannerProduct);
  }

  //Put
  public updateScannedProduct(scannedProductId: number, scannedProduct: ScannerProduct){
    return this.httpClient.put<ScannerProduct>(this.baseURL + '/scanned-product/' + scannedProductId, scannedProduct);
  }

  //Get of ScannedProducts
  public getAllScannedProduct(): Observable<ScannerProduct[]> {
    return this.httpClient.get<ScannerProduct[]>(this.baseURL + '/scanned-product');
  }

  //Delete ScannedProduct
  public deleteScannedProduct(id: number): Observable<HttpStatusCode> {
    return this.httpClient.delete<HttpStatusCode>(this.baseURL + '/scanned-product/' + id);
  }
}