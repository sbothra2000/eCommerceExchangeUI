import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.css'],
})
export class CurrencySelectorComponent implements OnInit {
  selectedCurrency: string = 'GBP';

  currencies = [
    { name: 'GBP - British Pound', code: 'GBP' },
    { name: 'USD - United States of America', code: 'USD' },
    { name: 'EUR - Deutchland', code: 'EUR' },
    { name: 'AUD - Australian Dollar', code: 'AUD' },
  ];

  exchangeRates: any[] = [
    { exchangeRate: 1, currencyCode: 'GBP', validFromDate: '2023-01-01', validToDate: null },
    { exchangeRate: 1.35, currencyCode: 'USD', validFromDate: '2023-01-01', validToDate: null },
    { exchangeRate: 1.18, currencyCode: 'EUR', validFromDate: '2023-01-01', validToDate: null },
    { exchangeRate: 1.85, currencyCode: 'AUD', validFromDate: '2023-01-01', validToDate: null },
  ];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.currencySubject.next({
      currency: this.selectedCurrency,
      exchangeRates: this.exchangeRates,
    });
  }

  onCurrencyChange(): void {
    this.currencyService.currencySubject.next({
      currency: this.selectedCurrency,
      exchangeRates: this.exchangeRates,
    });
  }
}
