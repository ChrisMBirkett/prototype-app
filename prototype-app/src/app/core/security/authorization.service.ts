import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import "rxjs/add/operator/map";
import * as _ from "lodash";

import { environment } from "../../../environments/environment";
import { UserModel } from "../../shared/models";

@Injectable()
export class AuthorizationService {
  constructor(private httpClient: HttpClient) {}

  user: UserModel;

  public initializeAuthorization() {
    const apiUrl: string = environment.apiUrls.authorization;

    return this.httpClient.get<UserModel>(apiUrl).map(user => {
      this.user = new UserModel(user.userName, user.roles);
      return this.user;
    });
  }
}
