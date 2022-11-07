import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Codes } from 'src/app/entities/codes/codes';
import { FileProduct } from 'src/app/entities/file-product/file-product';

@Injectable({
  providedIn: 'root'
})
export class CodesRequestService {

  //baseURL = 'http://168.232.165.65:8888/api';
  baseURL = 'http://localhost:8888/api';

  constructor(private httpClient: HttpClient) { }

  public getAllFileProductsByCodesId(codesId: string): Observable<FileProduct[]> {
    return this.httpClient.get<FileProduct[]>(this.baseURL + '/codes/' + codesId + '/file-products');
  }

  public getAllFileProducts(): Observable<FileProduct[]> {
    return this.httpClient.get<FileProduct[]>(this.baseURL + '/file-products');
  }

  public addCode(fileProductId: number, codesRequest: Codes) {
    return this.httpClient.post<Codes>(this.baseURL + '/file-products/' + fileProductId + '/codes', codesRequest);
  }


}
