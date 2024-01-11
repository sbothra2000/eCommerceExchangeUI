
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CurrencyService } from '../services/currency.service';

interface ExchangeRate {
  exchangeRate: number;
  currencyCode: string;
  validFromDate: string;
  validToDate: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  selectedCurrency: string = 'USD';
  exchangeRates: ExchangeRate[] = [];

  constructor(
    private productService: ProductService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.currencyService.getSelectedCurrency().subscribe(({ currency, exchangeRates }) => {
      this.selectedCurrency = currency;
      this.exchangeRates = Array.isArray(exchangeRates) ? exchangeRates : [];

      this.fetchProducts();
    });

    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
  calculatePriceInSelectedCurrency(product: any): number {
    const priceInGBP = product.price;
  
    const currentDate = new Date();
    const exchangeRateObj = this.exchangeRates.find(
      (rate) =>
        rate.currencyCode === this.selectedCurrency &&
        new Date(rate.validFromDate) <= currentDate &&
        (rate.validToDate === null || new Date(rate.validToDate) >= currentDate)
    );
  
    console.log('Exchange Rate Object:', exchangeRateObj);
    const exchangeRate = exchangeRateObj ? exchangeRateObj.exchangeRate : 1;
    console.log('Final Exchange Rate:', exchangeRate);
    const priceInSelectedCurrency = priceInGBP * exchangeRate;
    console.log('Price in Selected Currency:', priceInSelectedCurrency);
  
    return priceInSelectedCurrency;
  }
}
