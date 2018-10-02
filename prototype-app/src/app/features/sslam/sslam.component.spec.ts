import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  HttpClientTestingModule
} from "@angular/common/http/testing";
import { HttpClient } from '@angular/common/http';

import { SslamComponent } from './sslam.component';
import { UiHelpersService } from '../../core/service/shared';
import { SslamService } from './shared';
import { MockUiHelpersService } from '../../test-helpers';

describe('SslamComponent', () => {

  let component: SslamComponent;
  let fixture: ComponentFixture<SslamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SslamComponent],
      imports: [HttpClientTestingModule],
      providers: [
        SslamService, // TODO: Mock this
        { provide: UiHelpersService, useClass: MockUiHelpersService },
        HttpClient
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SslamComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
