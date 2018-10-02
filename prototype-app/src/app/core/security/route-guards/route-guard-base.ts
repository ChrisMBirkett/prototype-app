import { Observable } from "rxjs";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";

import { Application, Role } from "../../../shared/enumerations";
import { AuthorizationService } from "..";

export class RouteGuardBase implements CanActivate {
  constructor(
    protected _applicationId: Application,
    protected _appName: string,
    protected _role: Role,
    protected _authorizationService: AuthorizationService,
    protected _router: Router
  ) {}

  protected isUserAuthorized(): boolean {
    console.log(
      "RouteGuardBase-isUserAuthorized: user",
      this._authorizationService.user
    );
    var isAuthorized = this._authorizationService.user.checkRoleAuthorization(
      this._applicationId,
      this._role
    );

    return isAuthorized;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.hasRequiredRole();
  }

  protected hasRequiredRole(): Observable<boolean> {
    var isAuthorized: boolean;

    if (this._authorizationService.user) {
      console.log(
        "RouteGuardBase-hasRequiredRole: this._authorizationService.user",
        this._authorizationService.user
      );
      isAuthorized = this.isUserAuthorized();
      if (!isAuthorized) {
        this.routeToErrorPage();
      }

      return Observable.of(isAuthorized);
    } else {
      return this._authorizationService
        .initializeAuthorization()
        .map(user => {
          console.log(
            "RouteGuardBase-hasRequiredRole: initializeAuthorization",
            user
          );
          isAuthorized = this.isUserAuthorized();
          if (!isAuthorized) {
            this.routeToErrorPage();
          }

          return isAuthorized;
        })
        .first();
    }
  }

  protected routeToErrorPage() {
    this._router.navigate(["/error"], {
      queryParams: {
        errorMessage: `You do not have permissions to use the ${
          this._appName
        } application. Contact your system administrator for assistance.`
      }
    });
  }
}
