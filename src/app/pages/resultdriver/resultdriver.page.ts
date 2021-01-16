import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/service/api.service";
import { AlertControllerService } from "src/app/service/alert-controller.service";
import { Chart } from "chart.js";

@Component({
  selector: "app-resultdriver",
  templateUrl: "./resultdriver.page.html",
  styleUrls: ["./resultdriver.page.scss"],
})
export class ResultdriverPage implements OnInit {
  userType: any;
  statusDriverId: any;

  trip: any;
  organizationName: any;
  driverName: any;
  tripFrom: any;
  tripTo: any;
  tripStartTime: any;
  tripEndTime: any;
  plateNumber: any;

  q1SD: any;
  q2SD: any;
  q3SD: any;
  q4SD: any;
  q5SD: any;
  q6SD: any;

  rQ1D: any;
  rQ2D: any;
  rQ3D: any;
  rQ4D: any;
  rQ5D: any;
  rQ6D: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private alertService: AlertControllerService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userType = this.router.getCurrentNavigation().extras.state.userType;
        this.statusDriverId = this.router.getCurrentNavigation().extras.state.statusDriverId;
        console.log("userType ", this.userType);
        console.log("statusDriverId ", this.statusDriverId);
      }
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.showChart();
  }

  showChart() {
    this.apiService
      .getResultDetailDriver(this.statusDriverId)
      .subscribe((data) => {
        if (data) {
          if (data["error"] == true) {
            this.alertService.presentToast(data["error_message"]);
          } else {
            this.trip = data["trip"];

            this.trip.map((value) => {
              this.organizationName = value.organizationName;
              this.driverName = value.driverName;
              this.tripFrom = value.tripFrom;
              this.tripTo = value.tripTo;
              this.tripStartTime = value.tripStartTime;
              this.tripEndTime = value.tripEndTime;
              this.plateNumber = value.plateNumber;
            });
            console.log("trip", this.trip);
            this.userType = data["userType"];
            this.q1SD = data["q1SD"];
            this.q2SD = data["q2SD"];
            this.q3SD = data["q3SD"];
            this.q4SD = data["q4SD"];
            this.q5SD = data["q5SD"];
            this.q6SD = data["q6SD"];

            var ao1 = data["rQ1D"];
            var ao2 = data["rQ2D"];
            var ao3 = data["rQ3D"];
            var ao4 = data["rQ4D"];
            var ao5 = data["rQ5D"];
            var ao6 = data["rQ6D"];

            var ctx = (<any>document.getElementById("result")).getContext("2d");
            var chart = new Chart(ctx, {
              type: "radar",
              data: {
                labels: [1, 2, 3, 4, 5, 6],
                datasets: [
                  {
                    label: "Value",
                    backgroundColor: "transparent",
                    borderColor: "rgba(200,0,0,0.6)",
                    fill: false,
                    radius: 6,
                    pointRadius: 6,
                    pointBorderWidth: 2,
                    pointBackgroundColor: "cornflowerblue",
                    pointBorderColor: "rgba(0,0,200,0.6)",
                    pointHoverRadius: 10,
                    data: [ao1, ao2, ao3, ao4, ao5, ao6],
                  },
                ],
              },
              options: {
                scale: {
                  angleLines: {
                    display: true,
                  },
                  ticks: {
                    suggestedMin: 0,
                    suggestedMax: 5,
                  },
                },
                legend: { display: false },
              },
            });
          }
        }
      });
  }
}
