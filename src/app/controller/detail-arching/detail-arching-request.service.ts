import { Injectable } from '@angular/core';
import { DetailArching } from '../../entities/detail-arching/detail-arching';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailArchingRequestService {

  baseURL = 'http://34.95.208.112:8080/ControlStockBackend-0.0.1-SNAPSHOT/api';
  //baseURL = 'http://34.95.208.112:8888/api';
  //baseURL = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  newDetailArching(archingId: number, detailArching: DetailArching): Observable<HttpStatusCode>{
    return this.httpClient.post<HttpStatusCode>(this.baseURL + '/arching/' + archingId + '/detail-arching', detailArching);
  }

  updateDetailArching(detailArching: DetailArching): Observable<HttpStatusCode>{
    return this.httpClient.put<HttpStatusCode>(this.baseURL + '/detail-arching', detailArching);
  }

  updateFileAmountDetailArching(detailArching: DetailArching): Observable<HttpStatusCode>{
    return this.httpClient.put<HttpStatusCode>(this.baseURL + '/detail-arching-file', detailArching);
  }

  getAllDetailArching(archingId: number): Observable<DetailArching[]>{
    return this.httpClient.get<DetailArching[]>(this.baseURL + '/detail-arching/all/' + archingId);
  }

  deleteDetailArching(detailArchingId: number): Observable<HttpStatusCode> {
    return this.httpClient.delete<HttpStatusCode>(this.baseURL + '/detail-arching/' + detailArchingId);
  }

  getValence(detailArchingId: number): Observable<number>{
    return this.httpClient.get<number>(this.baseURL + '/detail-arching/' + detailArchingId + '/valance');
  }
}
