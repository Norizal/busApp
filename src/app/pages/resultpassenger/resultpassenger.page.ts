import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/service/api.service";
import { AlertControllerService } from "src/app/service/alert-controller.service";

@Component({
  selector: "app-resultpassenger",
  templateUrl: "./resultpassenger.page.html",
  styleUrls: ["./resultpassenger.page.scss"],
})
export class ResultpassengerPage implements OnInit {
  userType: any;
  statusPassengerId: any;

  trip: any;
  organizationName: any;
  driverName: any;
  tripFrom: any;
  tripTo: any;
  tripStartTime: any;
  tripEndTime: any;
  plateNumber: any;

  q1SP: any;
  q2SP: any;
  q3SP: any;
  q4SP: any;
  q5SP: any;
  q6SP: any;

  rQ1P: any;
  rQ2P: any;
  rQ3P: any;
  rQ4P: any;
  rQ5P: any;
  rQ6P: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private alertService: AlertControllerService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userType = this.router.getCurrentNavigation().extras.state.userType;
        this.statusPassengerId = this.router.getCurrentNavigation().extras.state.statusPassengerId;
        console.log("userType ", this.userType);
        console.log("statusPassengerId ", this.statusPassengerId);
      }
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.showChart();
  }

  showChart() {
    this.apiService
      .getResultDetailPassenger(this.statusPassengerId)
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
            this.q1SP = data["q1SP"];
            this.q2SP = data["q2SP"];
            this.q3SP = data["q3SP"];
            this.q4SP = data["q4SP"];
            this.q5SP = data["q5SP"];
            this.q6SP = data["q6SP"];

            var ao1 = data["rQ1P"];
            var ao2 = data["rQ2P"];
            var ao3 = data["rQ3P"];
            var ao4 = data["rQ4P"];
            var ao5 = data["rQ5P"];
            var ao6 = data["rQ6P"];

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
                    pointBackgroundColor: "orange",
                    pointBorderColor: "rgba(200,0,0,0.6)",
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
