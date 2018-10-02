import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { AppComponent } from './app.component';
import { Logger } from './core/service/shared/';
import { VendorRatesModule } from './features/vendor-rates/vendor-rates.module';
import { FooterComponent } from './features/footer/footer.component';
import { AuthorizationService } from './core/security/index';
import { UserRole, UserModel } from './shared/models';
import { Application, Role } from './shared/enumerations';

const MOCK_ROLES: UserRole[] = [
    new UserRole(Application.SSLAM, Role.RegularUser),
    new UserRole(Application.AssignmentEditor, Role.RegularUser)
];

const MOCK_USER: UserModel = new UserModel("Biff Tannen", MOCK_ROLES);

const MockAuthorizationService = {
  initializeAuthorization(): Observable<UserModel> { return Observable.of(MOCK_USER) },
  user: MOCK_USER
};

describe('AppComponent', () => {
  let loggerStub = {};
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
     TestBed.configureTestingModule({
      declarations: [
          AppComponent,
          FooterComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        RouterModule.forRoot([], { useHash: true }),
        VendorRatesModule
      ],
      providers: [
        { provide: Logger, useValue: loggerStub },
        { provide: AuthorizationService, useValue: MockAuthorizationService }
        
      ]

    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    let app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  });

});
