import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() data$: Observable<any>;
  chartData: any;

  chart: {
    title: string;
    type: string;
    columnNames: string[];
    options: any;
  };
  constructor() { }

  ngOnInit() {
    this.chart = {
      title: '',
      type: 'LineChart',
      columnNames: ['period', 'close'],
      options: { title: `Stock price`, width: '600', height: '400' }
    };
    this.data$.subscribe(newData => this.chartData = newData);
  }
}
