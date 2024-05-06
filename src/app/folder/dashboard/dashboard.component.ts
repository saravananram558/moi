import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as d3 from 'd3';
import { ServiceService } from 'src/app/service/service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit {
  members!:any;
  events: any;
  users: any;
  eventMembers: any;
  selectedDataSet: string = 'events';
  eventsSvg: any
  chartData: any = []
  chartColor: any = []
  chartColors: any;

  constructor(
    private apiService:ServiceService,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() { 
    this.getEventChartData()
    this.eventDonutChart()
  }

  showChartEventMembers() {
    this.selectedDataSet = 'eventMembers';
  }

  showChartUsers() {
    this.selectedDataSet = 'users';
  }

  getEventChartData(){
    this.apiService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res
      },
      error: (err: HttpErrorResponse) => {
      },
    });
  }

  eventDonutChart() {
    const margin1 = 10,
      width1 = 280,
      height1 = 280,
      radius1 = Math.min(width1, height1) / 2 - margin1;
    this.eventsSvg = d3.select("figure#eventChart").append("svg").attr("width", width1).attr("height", height1).append("g")
      .attr("transform", "translate(" + width1 / 2 + "," + height1 / 2 + ")");

      this.apiService.getAllEventsChart().subscribe({
        next: (res: any) => {
          this.chartData = res.topFive.map((e: any) => [e.eventName,e.itemCount,e.id]);
          this.chartData.push(["Others", res.othersTotalCount,0]);
          const eventsOrder = res.topFive.map((d: any) => d.eventName);
          this.chartColor = []
          for (let e of this.chartData) {
            if (e[0] === res.topFive[0]?.eventName) {
              this.chartColor.push("#FFB72B");
            } else if (e[0] === res.topFive[1]?.eventName) {
              this.chartColor.push("#5BB318");
            } else if (e[0] === res.topFive[2]?.eventName) {
              this.chartColor.push("#F5DAD2");
            } else if (e[0] === res.topFive[3]?.eventName) {
             this.chartColor.push("#FFBB00");
            } else if (e[0] === res.topFive[4]?.eventName) {
              this.chartColor.push("#003057");
            } else if ( e[0] === 'Others') {
             this.chartColor.push("#848484");
            }
          }
          const chartColors = d3.scaleOrdinal().domain(eventsOrder).range(this.chartColor);
          this.eventsSvg.selectAll("*").remove();
          const eventDonutChart = d3.pie<any>().value((d: any) => Number(d[1]));
          const arcs = this.eventsSvg.selectAll("pieces").data(eventDonutChart(this.chartData)).enter().append("path").attr("d",d3.arc().innerRadius(radius1 - 20).outerRadius(radius1))
            .attr("fill", (d: any, i: any) => chartColors(d.data[0]))
            .style("stroke-width", "1px")
           
            arcs.on("mouseover", (event: MouseEvent, d: any) => {
              let eventName, itemCount;
              eventName = d.data[0]; 
              itemCount = d.data[1];
              tooltip.style("display", "block")
              .html(`Event Name: ${eventName}<br>Count: ${itemCount}`) // Adjust content as needed
              .style("left", event.pageX + "px")
              .style("top", event.pageY + "px")
              .style("background-color", "black")
              .style("color", "white") //donut chart
              .style("padding", "8px")
              .style("border-radius", "3px")
              .style("pointer-events", "none");
            })
            .on("mousemove", function (event: MouseEvent, d: any) {
              tooltip.style("top", event.pageY + "px").style("left", event.pageX + "px");
            })
      
            // Remove tooltips on mouseout
            arcs.on("mouseout", () => {
              tooltip.style("display", "none"); //donut chart
            });

            const tooltip = d3.select("figure#eventChart").append("div").attr("position", "absolute")
              .style("display", "none")
              .style("width", "auto");
 
        
            arcs.transition().duration(1000).attrTween("d", (d: any) => {
              const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
              return (t: any) => {
                return d3.arc().innerRadius(90 - 20).outerRadius(radius1)(interpolate(t));
              };
            });
  
            this.eventsSvg.append("text").attr("text-anchor", "middle").attr("dominant-baseline", "middle")
            .style("font-size", "50px")
            .style("font-weight", "bold")
  
            this.eventsSvg.append("text").attr("text-anchor", "middle").attr("dominant-baseline", "middle")
            // .attr("y", 10)
            .style("font-size", "20px")
            .text("Events");
  
          const secondLabelLocation = d3.arc().innerRadius(radius1 - 40).outerRadius(radius1);
  
          this.eventsSvg.selectAll("pieces").data(eventDonutChart(this.chartData)).enter().append("text")
            .attr("transform", (d: any) => "translate(" + secondLabelLocation.centroid(d) + ")")
            .style("text-anchor", "middle")
            .style("font-size", 15);
        },
        error: (err) => {
          console.log("error", err);
        },
      });
  }

  getEventColor(event: any, index: number): string {
    const colors = ['green-box', 'violet-box', 'orange-box'];
    // Use the index to determine the color based on the repeating pattern
    return colors[index % colors.length];
  }
}
