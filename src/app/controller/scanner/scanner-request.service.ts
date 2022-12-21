import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScannerProduct } from 'src/app/entities/scanner-product/scanner-product';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScannerRequestService {

  baseURL = environment.baseURL;

  constructor(private httpClient: HttpClient) { }

  //Post or Update
  public newOrUpdateScannedProduct(fileProdcutId: number, scannerProduct: ScannerProduct): Observable<ScannerProduct> {
    return this.httpClient.post<ScannerProduct>(this.baseURL + '/scanned-product/new-update/' + fileProdcutId, scannerProduct);
  }

  //Put
  public updateScannedProduct(scannedProductId: number, scannedProduct: ScannerProduct): Observable<ScannerProduct>{
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
