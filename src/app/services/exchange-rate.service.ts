
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private apiUrl = 'https://localhost:5001/api/currencyexchangerates';

  constructor(private http: HttpClient) {}

  getExchangeRates(): Observable<any> {
     return this.http.get<any>(this.apiUrl);
  }
}
