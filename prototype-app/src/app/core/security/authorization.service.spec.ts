import { TestBed, inject, getTestBed } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { IEnvironment } from "../../../environments/environment.interface";
import { AuthorizationService } from "./index";
import { UserModel } from "../../shared/models";

describe("AuthorizationService", () => {
  let injector: TestBed;
  let service: AuthorizationService;

  let httpTestingController: HttpTestingController;

  const testEnv: IEnvironment = {
    production: false,
    name: "DEV",
    version: "1.1",
    wijmoDistributionLicense: "",
    apiUrls: { authorization: "http://localhost:39481/api/authorization" }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthorizationService, HttpClient]
    });

    injector = getTestBed();
    service = injector.get(AuthorizationService);

    httpTestingController = injector.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it("should be created", inject(
    [AuthorizationService],
    (service: AuthorizationService) => {
      expect(service).toBeTruthy();
    }
  ));

  describe("#GetAuthorization", () => {
    it("should set user to an instance UserModel", () => {
      const dummyUser: UserModel = new UserModel("bubba", []);

      service.initializeAuthorization().subscribe(userModel => {
        console.log("AuthorizationService spec", userModel);
        expect(userModel).toBeTruthy();
        expect(userModel).toEqual(dummyUser);
      });

      const req = httpTestingController.expectOne(
        testEnv.apiUrls.authorization
      );
      expect(req.request.method).toBe("GET");
      req.flush(dummyUser);
    });
  }); // #describe('#GetAuthorization')
});
