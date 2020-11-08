import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { EurisApiService } from 'src/app/core/services/euris-api.service';

@Component({
  selector: 'euris-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(private eurisAPiService: EurisApiService) {
  }

  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartType = 'polarArea';
  public lineChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#5e35b1'
    }
  ];

  ngOnInit(): void {
    this.eurisAPiService.getCategories().subscribe(result => {
      this.lineChartData = [{ data: result.map(cd => cd.numberOfProducts), label: 'Products per category ratio' }];
      this.lineChartLabels = result.map(cd => cd.category);
    });
  }


}
