import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Arching } from 'src/app/entities/arching/arching';
import { Observable } from 'rxjs';
import { DateRange } from 'src/app/entities/arching/date-range';

@Injectable({
  providedIn: 'root'
})
export class ArchingRequestService {

  //baseURL = 'http://34.95.208.112:8080/ControlStockBackendDeploy-0.0.1-SNAPSHOT/api';
  baseURL = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  newArching(arching: Arching): Observable<HttpStatusCode>{
    return this.httpClient.post<HttpStatusCode>(this.baseURL + '/arching', arching);
  }

  getAllArching(): Observable<Arching[]> {
    return this.httpClient.get<Arching[]>(this.baseURL + '/arching');
  }

  getArchingByDate(dateRange: DateRange): Observable<Arching[]> {
    return this.httpClient.post<Arching[]>(this.baseURL + '/arching/date', dateRange);
  }

  getArchingById(id: number): Observable<Arching> {
    return this.httpClient.get<Arching>(this.baseURL + '/arching/' + id);
  }

  getLastOneArching(): Observable<Arching> {
    return this.httpClient.get<Arching>(this.baseURL + '/arching/last-one');
  }

  setEndDate(archingEndDate: Arching , archingId: number): Observable<Arching>{
    return this.httpClient.put<Arching>(this.baseURL + '/arching/' + archingId, archingEndDate);
  }

}
