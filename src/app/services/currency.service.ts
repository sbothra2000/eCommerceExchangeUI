// currency.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExchangeRateService } from './exchange-rate.service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  currencySubject: BehaviorSubject<{ currency: string; exchangeRates: any }> = new BehaviorSubject<{ currency: string; exchangeRates: any }>({ currency: 'USD', exchangeRates: {} });

  constructor(private exchangeRateService: ExchangeRateService) {
    this.initExchangeRates();
  }

  private initExchangeRates(): void {
    this.exchangeRateService.getExchangeRates().subscribe((exchangeRates) => {
      this.currencySubject.next({ currency: 'GBP', exchangeRates });
      alert(JSON.stringify(exchangeRates, null, 2)); 
    });
  }

  getSelectedCurrency(): BehaviorSubject<{ currency: string; exchangeRates: any }> {
    return this.currencySubject;
  }
}
