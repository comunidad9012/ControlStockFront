import { Injectable } from '@angular/core';
import { DetailArching } from '../../entities/detail-arching/detail-arching';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailArchingRequestService {

  baseURL = environment.baseURL;

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

  deleteAllDetailArching(archingId: number): Observable<HttpStatusCode> {
    return this.httpClient.delete<HttpStatusCode>(this.baseURL + '/detailarching/deleteall/' + archingId);
  }

  getValence(detailArchingId: number): Observable<number>{
    return this.httpClient.get<number>(this.baseURL + '/detail-arching/' + detailArchingId + '/valance');
  }
}
