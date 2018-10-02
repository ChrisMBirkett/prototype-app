import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { IEnvironment } from '../../../environments/environment.interface';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  const testEnv: IEnvironment = {
    production: false,
    name: "DEV",
    version: "1.1",
    wijmoDistributionLicense: '',
    apiUrls: {
      auth: 'http://localhost:39481/api/auth/'
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the environment and version in the footer',
    () => {

      component.environment = testEnv;

      fixture.detectChanges();

      const welcomeEl: HTMLElement = fixture.nativeElement.querySelector('.footer-environment-version');
      expect(welcomeEl.textContent).toContain(testEnv.name);
      expect(welcomeEl.textContent).toContain(testEnv.version);

    });
});
