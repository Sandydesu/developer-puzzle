import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;
  fromMinDate = new Date(2019, 0, 1);
  fromMaxDate = new Date();
  toMinDate = new Date(2019, 0, 1);
  toMaxDate = new Date();
  quotes$ = this.priceQuery.priceQueries$

  timePeriods = [
    { viewValue: 'All available data', value: 'max' },
    { viewValue: 'Five years', value: '5y' },
    { viewValue: 'Two years', value: '2y' },
    { viewValue: 'One year', value: '1y' },
    { viewValue: 'Year-to-date', value: 'ytd' },
    { viewValue: 'Six months', value: '6m' },
    { viewValue: 'Three months', value: '3m' },
    { viewValue: 'One month', value: '1m' }
  ];

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null],
      fromSelectedDate: [null],
      toSelectedDate: [null]
    });
  }

  ngOnInit() {
    this.stockPickerForm.get('fromSelectedDate').valueChanges.subscribe((value) => {
      if (value) {
        this.toMinDate = new Date(value);
        this.stockPickerForm.get('period').setValue(null);
      }
    });
    this.stockPickerForm.get('toSelectedDate').valueChanges.subscribe((value) => {
      if (value) {
        this.stockPickerForm.get('period').setValue(null);
      }
    });
    this.stockPickerForm.get('period').valueChanges.subscribe((value) => {
      if (value) {
        this.stockPickerForm.get('fromSelectedDate').setValue(null);
        this.stockPickerForm.get('toSelectedDate').setValue(null);
      }
    });
  }

  selectionChange() {
    this.fetchQuote();
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, period, toSelectedDate, fromSelectedDate } = this.stockPickerForm.value;
      if (fromSelectedDate && toSelectedDate) {
        this.priceQuery.fetchQuote(symbol, 'max');
      } else if (period) {
        this.priceQuery.fetchQuote(symbol, period);
      }
    }
  }
}
