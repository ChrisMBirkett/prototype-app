import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Application, ApplicationId, Role } from "../../../shared/enumerations";
import { RouteGuardBase } from "./route-guard-base";
import { AuthorizationService } from "../authorization.service";

@Injectable()
export class AssignmentsGuard extends RouteGuardBase {
  constructor(
    protected _authorizationService: AuthorizationService,
    protected _router: Router
  ) {
    super(
      Application.AssignmentEditor,
      ApplicationId.Assignments,
      Role.RegularUser,
      _authorizationService,
      _router
    );
  }
}
