import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PageTitleComponent } from './page-title.component';
import { PageTitleService } from '../../../core/service/page-title.service';
import { TestRoutes } from '../../../test-helpers/test-routes';
import { AssignmentsModule } from '../../../features/assignments/assignments.module';
import { SslamModule } from '../../../features/sslam/sslam.module';

describe('PageTitleComponent', () => {
  let component: PageTitleComponent;
  let fixture: ComponentFixture<PageTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTitleComponent ],
      imports: [
        AssignmentsModule,
        SslamModule,
        RouterTestingModule.withRoutes(TestRoutes)
      ],
      providers: [
        PageTitleService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should display the page title 'SSLAM Search'", () => {
    // ARRANGE
    component.pageTitle = "SSLAM Search";
    const debugElement: DebugElement = fixture.debugElement;
    const h1DebugElement: DebugElement = debugElement.query(By.css("H1"));
    const h1NativeElement: HTMLElement = h1DebugElement.nativeElement;

    // ACT
    fixture.detectChanges();

    // ASSERT
    expect(h1NativeElement.innerText).toContain("SSLAM Search");
  });

  it("should display the page title 'Assignments'", () => {
    // ARRANGE
    component.pageTitle = "Assignments";
    const debugElement: DebugElement = fixture.debugElement;
    const h1DebugElement: DebugElement = debugElement.query(By.css("H1"));
    const h1NativeElement: HTMLElement = h1DebugElement.nativeElement;

    // ACT
    fixture.detectChanges();

    // ASSERT
    expect(h1NativeElement.innerText).toContain("Assignments");
  });
});
