import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { AlertControllerService } from "src/app/service/alert-controller.service";
import { ApiService } from "src/app/service/api.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-result",
  templateUrl: "./result.page.html",
  styleUrls: ["./result.page.scss"],
})
export class ResultPage implements OnInit {
  userType: any;
  statusOrganizationId: any;

  trip: any;
  organizationName: any;
  driverName: any;
  tripFrom: any;
  tripTo: any;
  tripStartTime: any;
  tripEndTime: any;
  plateNumber: any;

  q1SO: any;
  q2SO: any;
  q3SO: any;
  q4SO: any;
  q5SO: any;
  q6SO: any;
  q7SO: any;
  q8SO: any;
  q9SO: any;
  q10SO: any;

  rQ1O: any;
  rQ2O: any;
  rQ3O: any;
  rQ4O: any;
  rQ5O: any;
  rQ6O: any;
  rQ7O: any;
  rQ8O: any;
  rQ9O: any;
  rQ10O: any;

  totalO: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private alertService: AlertControllerService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userType = this.router.getCurrentNavigation().extras.state.userType;
        this.statusOrganizationId = this.router.getCurrentNavigation().extras.state.statusOrganizationId;
        console.log("userType ", this.userType);
        console.log("statusOrganizationId ", this.statusOrganizationId);
      }
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.showChart();
  }

  showChart() {
    this.apiService
      .getResultDetailOrganization(this.statusOrganizationId)
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
            this.q1SO = data["q1SO"];
            this.q2SO = data["q2SO"];
            this.q3SO = data["q3SO"];
            this.q4SO = data["q4SO"];
            this.q5SO = data["q5SO"];
            this.q6SO = data["q6SO"];
            this.q7SO = data["q7SO"];
            this.q8SO = data["q8SO"];
            this.q9SO = data["q9SO"];
            this.q10SO = data["q10SO"];

            var ao1 = data["rQ1O"];
            var ao2 = data["rQ2O"];
            var ao3 = data["rQ3O"];
            var ao4 = data["rQ4O"];
            var ao5 = data["rQ5O"];
            var ao6 = data["rQ6O"];
            var ao7 = data["rQ7O"];
            var ao8 = data["rQ8O"];
            var ao9 = data["rQ9O"];
            var ao10 = data["rQ10O"];

            var ctx = (<any>document.getElementById("result")).getContext("2d");
            var chart = new Chart(ctx, {
              type: "radar",
              data: {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                datasets: [
                  {
                    label: "Value",
                    backgroundColor: "transparent",
                    borderColor: "rgba(200,0,0,0.6)",
                    fill: false,
                    radius: 6,
                    pointRadius: 6,
                    pointBorderWidth: 2,
                    pointBackgroundColor: "black",
                    pointBorderColor: "rgba(200,0,0,0.6)",
                    pointHoverRadius: 10,
                    data: [ao1, ao2, ao3, ao4, ao5, ao6, ao7, ao8, ao9, ao10],
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
