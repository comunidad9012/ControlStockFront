import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Codes } from 'src/app/entities/codes/codes';
import { FileProduct } from 'src/app/entities/file-product/file-product';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodesRequestService {

  baseURL = environment.baseURL;

  constructor(private httpClient: HttpClient) { }

  public getAllFileProductsByCodesId(codesId: string): Observable<FileProduct[]> {
    return this.httpClient.get<FileProduct[]>(this.baseURL + '/codes/' + codesId + '/file-products');
  }

  public getAllFileProducts(): Observable<FileProduct[]> {
    return this.httpClient.get<FileProduct[]>(this.baseURL + '/file-products');
  }

  public addCode(fileProductId: number, codesRequest: Codes): Observable<Codes> {
    return this.httpClient.post<Codes>(this.baseURL + '/file-products/' + fileProductId + '/codes', codesRequest);
  }

  public deleteAllFileCodes(): Observable<HttpStatusCode> {
    return this.httpClient.delete<HttpStatusCode>(this.baseURL + '/file-products/codes');
  }

  public deleteAllCodes(): Observable<HttpStatusCode> {
    return this.httpClient.delete<HttpStatusCode>(this.baseURL + '/codes');
  }


}
