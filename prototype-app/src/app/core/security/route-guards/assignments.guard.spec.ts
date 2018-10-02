import { TestBed, inject } from "@angular/core/testing";
import { Router } from "@angular/router";

import { Observable } from "rxjs";

import { AssignmentsGuard } from "./assignments.guard";
import { UserModel, UserRole } from "../../../shared/models";
import { AuthorizationService } from "..";
import { Application, Role } from "../../../shared/enumerations";

const MOCK_USER: UserModel = new UserModel("Biff Tannen", null); // Roles to be defined separately in each test.
const MockAuthorizationService = {
  initializeAuthorization(): Observable<UserModel> {
    return Observable.of(MOCK_USER);
  },
  user: MOCK_USER
};

describe("AssignmentsGuard", () => {
  const router = jasmine.createSpyObj("Router", ["navigate"]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AssignmentsGuard,
        { provide: AuthorizationService, useValue: MockAuthorizationService },
        { provide: Router, useValue: router }
      ]
    });
  });

  it("should be created", inject(
    [AssignmentsGuard],
    (guard: AssignmentsGuard) => {
      expect(guard).toBeTruthy();
    }
  ));

  it("canActivate() should return True when user is authorized", inject(
    [AssignmentsGuard],
    (guard: AssignmentsGuard) => {
      MOCK_USER.roles = [
        new UserRole(Application.AssignmentEditor, Role.RegularUser)
      ];

      guard.canActivate(null, null).subscribe(isAutorized => {
        expect(isAutorized).toBe(true);
      });
    }
  ));

  it("canActivate() should return False when user is not authorized", inject(
    [AssignmentsGuard],
    (guard: AssignmentsGuard) => {
      MOCK_USER.roles = [];

      guard.canActivate(null, null).subscribe(isAutorized => {
        expect(isAutorized).toBe(false);
      });
    }
  ));
});
