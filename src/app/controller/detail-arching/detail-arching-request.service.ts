import { Injectable } from '@angular/core';
import { DetailArching } from '../../entities/detail-arching/detail-arching';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailArchingRequestService {

  //baseURL = 'http://34.95.208.112:8080/ControlStockBackendDeploy-0.0.1-SNAPSHOT/api';
  baseURL = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  newDetailArching(archingId: number, detailArching: DetailArching): Observable<HttpStatusCode>{
    return this.httpClient.post<HttpStatusCode>(this.baseURL + '/arching/' + archingId + '/detail-arching', detailArching);
  }

  getAllDetailArching(archingId: number): Observable<DetailArching>{
    return this.httpClient.get<DetailArching>(this.baseURL + '/detail-arching/all/' + archingId);
  }
}
