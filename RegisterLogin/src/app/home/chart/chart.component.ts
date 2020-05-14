import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/shared/chart.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styles: []
})
export class ChartComponent implements OnInit {
  public chartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }

  public chartLabels: string[] = ['Real time data for the chart'];
  public chartType: string = 'bar';
  public chartLegend: boolean = true;
  public colors: any[] = [
    { backgroundColor: '#5491DA' },
    { backgroundColor: '#E74C3C' },
    { backgroundColor: '#82E0AA' },
    { backgroundColor: '#E5E7E9' },
  ]


  constructor(public service: ChartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.service.startConnection();
    this.service.adddTransferChartDataListener();
    this.startHttpequest();
  }

  private startHttpequest = () => {
    this.http.get('http://localhost:57097/api/Chart').subscribe(res => {
      console.log(res);
    })
  }

}
