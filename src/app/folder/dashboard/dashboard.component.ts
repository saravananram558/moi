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
  analysisSvg: any
  chartData: any = []
  chartColor: any = []
  secondColors: any;
  processCount: number = 0;

  constructor(
    private apiService:ServiceService,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() { 
    this.getEventChartData()
    this.processPieChart()
  }

  showChartEventMembers() {
    this.selectedDataSet = 'eventMembers';
  }

  showChartEvents() {
    this.selectedDataSet = 'events';
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
    // this.apiService.getAllMembers(this.eventId).subscribe({
    //   next: (res: any) => {
    //     this.eventMembers = res
    //   },
    //   error: (err: HttpErrorResponse) => {
    //   },
    // });
  }

  processPieChart() {
    const margin1 = 10,
      width1 = 280,
      height1 = 280,
      radius1 = Math.min(width1, height1) / 2 - margin1;
    this.analysisSvg = d3
      .select("figure#eventChart")
      .append("svg")
      .attr("width", width1)
      .attr("height", height1)
      .append("g")
      .attr("transform", "translate(" + width1 / 2 + "," + height1 / 2 + ")");
 
    // Create a tooltip div
    const tooltip = d3
      .select("figure#eventChart")
      .append("span")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("background-color", "black")
      .style("color", "white")
      .style("padding", "5px")
      .style("border-radius", "1px")
      .style("pointer-events", "none")
      .style("transition", "opacity 0.3s ease")
      .style("position", "absolute")
      .style("top", "50px") // Adjust these values as needed
      .style("left", "50px"); // Adjust these values as needed
 
 
      this.apiService.getAllEventsChart().subscribe({
          next: (res: any) => {
          console.log(res, 'jjjjjjj');
          // this.processWiseData = res.data;
        this.chartData = res.topFive.map((process: any) => [process.eventName,process.itemCount,process.id]);
        this.chartData.push(["Others", res.othersTotalCount,0]);
        console.log(this.chartData, "thirdData checks");
        const processOrder = res.topFive.map((d: any) => d.eventName);
        console.log(processOrder, "processOrder checks");
        this.chartColor = []
        for (let e of this.chartData) {
          if (e[0] === res.topFive[0]?.eventName) {
            this.chartColor.push("#BF63C6");
          } else if (e[0] === res.topFive[1]?.eventName) {
            this.chartColor.push("#1E88E5");
          } else if (e[0] === res.topFive[2]?.eventName) {
            this.chartColor.push("#25C16F");
          } else if (e[0] === res.topFive[3]?.eventName) {
           this.chartColor.push("#FFBB00");
          } else if (e[0] === res.topFive[4]?.eventName) {
            this.chartColor.push("#003057");
          } else if ( e[0] === 'Others') {
           this.chartColor.push("#848484");
          }
        }
         console.log(this.chartData,this.chartColor,'color checsk')
         const secondColors = d3.scaleOrdinal().domain(processOrder).range(this.chartColor);
            const totalSecondStars = this.chartData.reduce((acc: any, d: any) => acc + Number(d[1]), 0);
          console.log(totalSecondStars,'totalSecondStars  checsk')
          if (totalSecondStars === 0) {
            d3.select(".findingShowData").style("display", "none");
            d3.select(".noFindingData").style("display", "flex");
            return;
          }
          d3.select(".findingShowData").style("display", "block");
          d3.select(".noFindingData").style("display", "none");
          this.analysisSvg.selectAll("*").remove();
          const secondPie = d3.pie<any>().value((d: any) => Number(d[1]));
          const arcs = this.analysisSvg
            .selectAll("pieces")
            .data(secondPie(this.chartData))
            .enter()
            .append("path")
            .attr(
              "d",
              d3
                .arc()
                .innerRadius(radius1 - 20)
                .outerRadius(radius1)
            )
            .attr("fill", (d: any, i: any) => secondColors(d.data[0]))
            .style("stroke-width", "1px")
           
            // Add tooltip functionality
            .on("mouseover", function (event: MouseEvent, d: any) {
  
              const [x, y] = d3.pointer(event); // Get mouse coordinates relative to the SVG element
              tooltip.transition()
                .duration(200)
                .style("opacity", .9);
              tooltip.html(d.data[0] + ": " + d.data[1]);
  
  
            })
            .on("mousemove", function (event: MouseEvent, d: any) {
              tooltip.style("top", event.pageY + "px").style("left", event.pageX + "px");
            })
            .on("mouseout", function (d: any) {
              tooltip.transition()
                .duration(500)
                .style("opacity", 0);
            });
        
          arcs
            .transition()
            .duration(1000)
            .attrTween("d", (d: any) => {
              const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
              return (t: any) => {
                return d3.arc().innerRadius(90 - 20).outerRadius(radius1)(interpolate(t));
              };
            });
  
          this.analysisSvg
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .style("font-size", "50px")
            .style("font-weight", "bold")
            // .text(this.processCount);
  
          this.analysisSvg
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            // .attr("y", 10)
            .style("font-size", "20px")
            .text("Events");
  
          const secondLabelLocation = d3.arc().innerRadius(radius1 - 40).outerRadius(radius1);
  
          this.analysisSvg
            .selectAll("pieces")
            .data(secondPie(this.chartData))
            .enter()
            .append("text")
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
