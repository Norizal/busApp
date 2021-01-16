import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/service/api.service";
import { AlertControllerService } from "src/app/service/alert-controller.service";

@Component({
  selector: "app-surveyquestion",
  templateUrl: "./surveyquestion.page.html",
  styleUrls: ["./surveyquestion.page.scss"],
})
export class SurveyquestionPage implements OnInit {
  userType: any;
  tripId: any;
  questions: [];

  q1: any;
  q2: any;
  q3: any;
  q4: any;

  q5: any;
  q6: any;
  q7: any;
  q8: any;

  q9: any;
  q10: any;

  a1: any;
  a2: any;
  a3: any;
  a4: any;

  a5: any;
  a6: any;
  a7: any;
  a8: any;

  a9: any;
  a10: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private alertService: AlertControllerService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userType = this.router.getCurrentNavigation().extras.state.userType;
        this.tripId = this.router.getCurrentNavigation().extras.state.tripId;
        console.log("useType ", this.userType);
        console.log("tripId ", this.tripId);
      }
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.q1 = 0;
    this.q2 = 0;
    this.q3 = 0;
    this.q4 = 0;
    this.q5 = 0;
    this.q6 = 0;
    this.q7 = 0;
    this.q8 = 0;
    this.q9 = 0;
    this.q10 = 0;

    this.a1 = 0;
    this.a2 = 0;
    this.a3 = 0;
    this.a4 = 0;
    this.a5 = 0;
    this.a6 = 0;
    this.a7 = 0;
    this.a8 = 0;
    this.a9 = 0;
    this.a10 = 0;

    if (this.userType == 1) {
      this.apiService.getOrganizationQuestion().subscribe((data) => {
        if (data) {
          if (data["error"] == true) {
            this.alertService.presentToast(data["error_message"]);
          } else {
            this.questions = data["data"];
            console.log(this.questions);
          }
        }
      });
    } else if (this.userType == 2) {
      this.apiService.getDriverQuestion().subscribe((data) => {
        if (data) {
          if (data["error"] == true) {
            this.alertService.presentToast(data["error_message"]);
          } else {
            this.questions = data["data"];
            console.log(this.questions);
          }
        }
      });
    } else {
      this.apiService.getPassengerQuestion().subscribe((data) => {
        if (data) {
          if (data["error"] == true) {
            this.alertService.presentToast(data["error_message"]);
          } else {
            this.questions = data["data"];
            console.log(this.questions);
          }
        }
      });
    }
  }

  checkValue(event, i, id) {
    if (i == 0) {
      this.a1 = event.srcElement.value;
      this.q1 = id;
      console.log("q1", this.q1);
      console.log("a1", this.a1);
    } else if (i == 1) {
      this.a2 = event.srcElement.value;
      this.q2 = id;
      console.log("q2", this.q2);
      console.log("a2", this.a2);
    } else if (i == 2) {
      this.a3 = event.srcElement.value;
      this.q3 = id;
      console.log("q3", this.q3);
      console.log("a3", this.a3);
    } else if (i == 3) {
      this.a4 = event.srcElement.value;
      this.q4 = id;
      console.log("q4", this.q4);
      console.log("a4", this.a4);
    } else if (i == 4) {
      this.a5 = event.srcElement.value;
      this.q5 = id;
      console.log("q5", this.q5);
      console.log("a5", this.a5);
    } else if (i == 5) {
      this.a6 = event.srcElement.value;
      this.q6 = id;
      console.log("q6", this.q6);
      console.log("a6", this.a6);
    } else if (i == 6) {
      this.a7 = event.srcElement.value;
      this.q7 = id;
      console.log("q7", this.q7);
      console.log("a7", this.a7);
    } else if (i == 7) {
      this.a8 = event.srcElement.value;
      this.q8 = id;
      console.log("q8", this.q8);
      console.log("a8", this.a8);
    } else if (i == 8) {
      this.a9 = event.srcElement.value;
      this.q9 = id;
      console.log("q9", this.q9);
      console.log("a9", this.a9);
    } else if (i == 9) {
      this.a10 = event.srcElement.value;
      this.q10 = id;
      console.log("q10", this.q10);
      console.log("a10", this.a10);
    } else {
      console.log("No result");
    }
  }

  submitSurvey() {
    if (this.userType == 1) {
      if (
        this.q1 == 0 &&
        this.q2 == 0 &&
        this.q3 == 0 &&
        this.q4 == 0 &&
        this.q5 == 0 &&
        this.q6 == 0 &&
        this.q7 == 0 &&
        this.q8 == 0 &&
        this.q9 == 0 &&
        this.q10 == 0
      ) {
        this.alertService.presentToast("Sila jawab semua soalan");
      } else if (this.q1 == 0) {
        this.alertService.presentToast("Sila jawab soalan 1");
      } else if (this.q2 == 0) {
        this.alertService.presentToast("Sila jawab soalan 2");
      } else if (this.q3 == 0) {
        this.alertService.presentToast("Sila jawab soalan 3");
      } else if (this.q4 == 0) {
        this.alertService.presentToast("Sila jawab soalan 4");
      } else if (this.q5 == 0) {
        this.alertService.presentToast("Sila jawab soalan 5");
      } else if (this.q6 == 0) {
        this.alertService.presentToast("Sila jawab soalan 6");
      } else if (this.q7 == 0) {
        this.alertService.presentToast("Sila jawab soalan 7");
      } else if (this.q8 == 0) {
        this.alertService.presentToast("Sila jawab soalan 8");
      } else if (this.q9 == 0) {
        this.alertService.presentToast("Sila jawab soalan 9");
      } else if (this.q10 == 0) {
        this.alertService.presentToast("Sila jawab soalan 10");
      } else {
        this.apiService
          .sendresultOrganization(
            this.q1,
            this.q2,
            this.q3,
            this.q4,
            this.q5,
            this.q6,
            this.q7,
            this.q8,
            this.q9,
            this.q10,
            this.a1,
            this.a2,
            this.a3,
            this.a4,
            this.a5,
            this.a6,
            this.a7,
            this.a8,
            this.a9,
            this.a10,
            this.tripId
          )
          .subscribe((result) => {
            if (result["error"] == true) {
              this.alertService.presentToast(result["error_message"]);
            } else {
              this.alertService.presentToast(result["message"]);
              this.router.navigate([""]);

              this.q1 = "";
              this.q2 = "";
              this.q3 = "";
              this.q4 = "";
              this.q5 = "";
              this.q6 = "";
              this.q7 = "";
              this.q8 = "";
              this.q9 = "";
              this.q10 = "";

              this.a1 = "";
              this.a2 = "";
              this.a3 = "";
              this.a4 = "";
              this.a5 = "";
              this.a6 = "";
              this.a7 = "";
              this.a8 = "";
              this.a9 = "";
              this.a10 = "";

              this.tripId = "";
            }
          });
      }
    } else if (this.userType == 2) {
      if (
        this.q1 == 0 &&
        this.q2 == 0 &&
        this.q3 == 0 &&
        this.q4 == 0 &&
        this.q5 == 0 &&
        this.q6 == 0
      ) {
        this.alertService.presentToast("Sila jawab semua soalan");
      } else if (this.q1 == 0) {
        this.alertService.presentToast("Sila jawab soalan 1");
      } else if (this.q2 == 0) {
        this.alertService.presentToast("Sila jawab soalan 2");
      } else if (this.q3 == 0) {
        this.alertService.presentToast("Sila jawab soalan 3");
      } else if (this.q4 == 0) {
        this.alertService.presentToast("Sila jawab soalan 4");
      } else if (this.q5 == 0) {
        this.alertService.presentToast("Sila jawab soalan 5");
      } else if (this.q6 == 0) {
        this.alertService.presentToast("Sila jawab soalan 6");
      } else {
        this.apiService
          .sendresultDriver(
            this.q1,
            this.q2,
            this.q3,
            this.q4,
            this.q5,
            this.q6,
            this.a1,
            this.a2,
            this.a3,
            this.a4,
            this.a5,
            this.a6,
            this.tripId
          )
          .subscribe((result) => {
            if (result["error"] == true) {
              this.alertService.presentToast(result["error_message"]);
            } else {
              this.alertService.presentToast(result["message"]);
              this.router.navigate([""]);

              this.q1 = "";
              this.q2 = "";
              this.q3 = "";
              this.q4 = "";
              this.q5 = "";
              this.q6 = "";
              this.a1 = "";
              this.a2 = "";
              this.a3 = "";
              this.a4 = "";
              this.a5 = "";
              this.a6 = "";
              this.tripId = "";
            }
          });
      }
    } else {
      if (
        this.q1 == 0 &&
        this.q2 == 0 &&
        this.q3 == 0 &&
        this.q4 == 0 &&
        this.q5 == 0 &&
        this.q6 == 0
      ) {
        this.alertService.presentToast("Sila jawab semua soalan");
      } else if (this.q1 == 0) {
        this.alertService.presentToast("Sila jawab soalan 1");
      } else if (this.q2 == 0) {
        this.alertService.presentToast("Sila jawab soalan 2");
      } else if (this.q3 == 0) {
        this.alertService.presentToast("Sila jawab soalan 3");
      } else if (this.q4 == 0) {
        this.alertService.presentToast("Sila jawab soalan 4");
      } else if (this.q5 == 0) {
        this.alertService.presentToast("Sila jawab soalan 5");
      } else if (this.q6 == 0) {
        this.alertService.presentToast("Sila jawab soalan 6");
      } else {
        this.apiService
          .sendresultPassenger(
            this.q1,
            this.q2,
            this.q3,
            this.q4,
            this.q5,
            this.q6,
            this.a1,
            this.a2,
            this.a3,
            this.a4,
            this.a5,
            this.a6,
            this.tripId
          )
          .subscribe((result) => {
            if (result["error"] == true) {
              this.alertService.presentToast(result["error_message"]);
            } else {
              this.alertService.presentToast(result["message"]);
              this.router.navigate([""]);
              this.q1 = "";
              this.q2 = "";
              this.q3 = "";
              this.q4 = "";
              this.q5 = "";
              this.q6 = "";

              this.a1 = "";
              this.a2 = "";
              this.a3 = "";
              this.a4 = "";
              this.a5 = "";
              this.a6 = "";

              this.tripId = "";
            }
          });
      }
    }
  }
}
