import { Component, OnInit } from "@angular/core";
import { Columns, Config, DefaultConfig } from "ngx-easy-table";
import { SizingChart, SizingChartTableProps } from "src/app/interfaces/sizing";
import { SizingChartService } from "../../services/sizing-chart.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-sizing-fit",
  templateUrl: "./sizing-fit.component.html",
  styleUrls: ["./sizing-fit.component.scss"]
})
export class SizingFitComponent implements OnInit {
  public sizingChartData$: Subscription;
  public sizingCharts: SizingChartTableProps[] = [];
  public configuration: Config = {
    ...DefaultConfig,
    paginationEnabled: false
  };

  constructor(public sizingChartService: SizingChartService) {
    this.sizingChartData$ =
      this.sizingChartService.sizingChartDataObserver.subscribe(
        (sizingChartAfsData: SizingChart[]) => {
          this.sizingCharts = sizingChartAfsData.map(
            ({
              name,
              measurementKeys,
              measurements,
              materials
            }: SizingChart) => {
              measurementKeys;
              const sizingChart: SizingChartTableProps = {
                name,
                sizes: [],
                columns: [],
                materials
              };
              sizingChart.columns = measurementKeys
                .sort((keyA, keyB) => (keyA.order < keyB.order ? -1 : 1))
                .filter(({ order }) => order >= 0)
                .map(({ title, key, order }) => ({
                  title,
                  key
                }));
              sizingChart.columns[0].width = "10%";
              sizingChart.sizes = measurements.sort((mA, mb) =>
                mA.order < mb.order ? -1 : 1
              );
              return sizingChart;
            }
          );
        }
      );
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.sizingChartData$.unsubscribe();
  }
}
