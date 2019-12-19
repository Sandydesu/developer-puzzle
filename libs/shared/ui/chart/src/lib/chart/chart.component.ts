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
  @Input() fromDate: Date;
  @Input() toDate: Date;
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
    this.data$.subscribe(newData => {
      if (this.fromDate && this.toDate) {
        let fromDate = null;
        let toDate = null;
        fromDate = `${this.fromDate.getFullYear()}-${this.fromDate.getMonth() + 1}-${this.fromDate.getDate()}`;
        toDate = `${this.toDate.getFullYear()}-${this.toDate.getMonth() + 1}-${this.toDate.getDate()}`;
        this.chartData = newData.filter((value) => {
          if (fromDate <= value[0] && value[0] <= toDate) {
            return true;
          }
          return false;
        });
      } else {
        this.chartData = newData;
      }
    });
  }
}
