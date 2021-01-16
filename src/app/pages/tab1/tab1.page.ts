import { Component, OnInit } from "@angular/core";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { AlertControllerService } from "src/app/service/alert-controller.service";
import { ApiService } from "src/app/service/api.service";
import { NgForm } from "@angular/forms";
import { NavigationExtras, Router } from "@angular/router";

@Component({
  selector: "app-tab1",
  templateUrl: "./tab1.page.html",
  styleUrls: ["./tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  trip: any;

  organizationName: any;
  driverName: any;
  tripFrom: any;
  tripTo: any;
  tripStartTime: any;
  tripEndTime: any;
  plateNumber: any;

  public isItemAvailable;

  items: any[] = [];

  qrform = {
    form: null,
  };

  constructor(
    private router: Router,
    private apiService: ApiService,
    private barcodeScanner: BarcodeScanner,
    private alertService: AlertControllerService
  ) {
    this.qrform.form = "";

    this.isItemAvailable = false;
  }

  ngOnInit() {}

  scanCode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.qrform.form = barcodeData["text"];
      this.enterQr(this.qrform.form);
      // this.alertService.presentToast(barcodeData['text']);
      //this.loginQrBar();
    });
  }

  enterQr(form: NgForm) {
    if (this.qrform.form == "" || this.qrform.form == null) {
      this.alertService.presentToast("Please enter QR code number");
    } else {
      this.apiService.loginQR(this.qrform.form).subscribe(
        (data) => {
          if (data["error"] == false) {
            this.alertService.presentToast(data["message"]);
            this.trip = data["tripInfo"];
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
          } else {
            this.alertService.presentToast(data["error_message"]);
          }
        },
        (error) => {
          this.alertService.presentToast("error");
          console.log(error);
        }
      );
    }
  }

  ionViewWillEnter() {
    this.trip = "";
    this.organizationName = "";
    this.driverName = "";
    this.tripFrom = "";
    this.tripTo = "";
    this.tripStartTime = "";
    this.tripEndTime = "";
    this.plateNumber = "";
    this.qrform.form = "";

    this.initializeItems();
    this.isItemAvailable = false;
  }

  loginQr() {
    this.apiService.loginQR(this.qrform.form).subscribe(
      (data) => {
        if (data["error"] == false) {
          this.alertService.presentToast(data["message"]);
          if (data["data"] == 1) {
            let navigationExtras: NavigationExtras = {
              state: {
                userType: 1,
                tripId: data["dataTrip"],
              },
            };
            this.router.navigate(["surveyquestion"], navigationExtras);
            this.trip = "";
            this.organizationName = "";
            this.driverName = "";
            this.tripFrom = "";
            this.tripTo = "";
            this.tripStartTime = "";
            this.tripEndTime = "";
            this.plateNumber = "";
            this.qrform.form = "";
          } else if (data["data"] == 2) {
            let navigationExtras: NavigationExtras = {
              state: {
                userType: 2,
                tripId: data["dataTrip"],
              },
            };
            this.router.navigate(["surveyquestion"], navigationExtras);
            this.trip = "";
            this.organizationName = "";
            this.driverName = "";
            this.tripFrom = "";
            this.tripTo = "";
            this.tripStartTime = "";
            this.tripEndTime = "";
            this.plateNumber = "";
            this.qrform.form = "";
          } else {
            let navigationExtras: NavigationExtras = {
              state: {
                userType: 3,
                tripId: data["dataTrip"],
              },
            };
            this.router.navigate(["surveyquestion"], navigationExtras);
            this.trip = "";
            this.organizationName = "";
            this.driverName = "";
            this.tripFrom = "";
            this.tripTo = "";
            this.tripStartTime = "";
            this.tripEndTime = "";
            this.plateNumber = "";
            this.qrform.form = "";
          }
        } else {
          this.alertService.presentToast(data["error_message"]);
        }
      },
      (error) => {
        this.alertService.presentToast("error");
        console.log(error);
      }
    );
  }

  initializeItems() {
    this.apiService.searchQR().subscribe((data) => {
      this.items = data["message"];
    });
  }

  getItems(ev) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != "") {
      this.isItemAvailable = true;
      this.items = this.items.filter((item) => {
        return item.qrCode.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.ionViewWillEnter();
    }
  }

  qrcode(qrCode) {
    this.qrform.form = qrCode;
    this.isItemAvailable = false;
    this.enterQr(this.qrform.form);
  }
}
