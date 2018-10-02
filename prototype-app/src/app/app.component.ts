import { Component, OnInit, ViewContainerRef, ViewChild } from "@angular/core";

import * as moment from "moment/moment";

import { UiHelpersService } from "./core/service/shared";
import { AuthorizationService } from "./core/security/index";
import { UserModel } from "./shared/models";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  userName = "";
  user: UserModel;

  constructor(
    private _authorizationService: AuthorizationService,
    private _uiHelpersService: UiHelpersService,
    private vcr: ViewContainerRef
  ) {
    // Override JS's default implementation of stringifying dates so that it returns correct local time.
    Date.prototype.toJSON = function () {
      return moment(this).format();
    };
    _uiHelpersService.setViewContainerRef(vcr);

    this._authorizationService.initializeAuthorization() 
        .subscribe(
          user => {
            console.log("Result returned", user);
            this.user = user;
            this.userName = this.user.userName;
            console.log('Current User: Name = ', user.userName, ' Roles = ', user.roles);
          },
          error => { console.log("Authentication failed", "User Authentication", error);  }
        );
  }

  ngOnInit() { } 
}
