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
  processCount: number = 0;
  chartVisible: boolean = false;

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
 
    // Create a tooltip div
    const tooltip = d3.select("figure#eventChart").append("span").attr("class", "tooltip").style("opacity", 0)
      .style("background-color", "black")
      .style("color", "white")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("pointer-events", "none")
      .style("transition", "opacity 0.3s ease")
      .style("position", "absolute")
      .style("top", "50px") // Adjust these values as needed
      .style("left", "50px"); // Adjust these values as needed
 
 
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
           
            // Add tooltip functionality
            .on("mouseover", function (event: MouseEvent, d: any) {
              const [x, y] = d3.pointer(event); // Get mouse coordinates relative to the SVG element
              tooltip.transition().duration(200).style("opacity", .9);
              tooltip.html(d.data[0] + ": " + d.data[1]);  
            })
            .on("mousemove", function (event: MouseEvent, d: any) {
              tooltip.style("top", event.pageY + "px").style("left", event.pageX + "px");
            })
            .on("mouseout", function (d: any) {
              tooltip.transition().duration(500).style("opacity", 0);
            });
        
          arcs.transition().duration(1000).attrTween("d", (d: any) => {
              const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
              return (t: any) => {
                return d3.arc().innerRadius(90 - 20).outerRadius(radius1)(interpolate(t));
              };
            });
  
          this.eventsSvg.append("text").attr("text-anchor", "middle").attr("dominant-baseline", "middle")
            .style("font-size", "50px")
            .style("font-weight", "bold")
            // .text(this.processCount);
  
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
