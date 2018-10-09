import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PagerComponent } from './pager.component';

describe('PagerComponent', () => {
  let component: PagerComponent;
  let fixture: ComponentFixture<PagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagerComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the Total Results, Total Pages, and current Page when initialized', () => {
    const page = 1, totalPages = 10, totalResults = 498;
    const simpleChanges = {
      page: new SimpleChange(null, page, false),
      totalPages: new SimpleChange(null, totalPages, false),
      totalResults: new SimpleChange(null, totalResults, false)
    };
    component.page = page;
    component.totalPages = totalPages;
    component.totalResults = totalResults;
    component.pageStart = 1;
    component.pageEnd = 50;

    component.ngOnChanges(simpleChanges);
    fixture.detectChanges();

    const debugElement: DebugElement = fixture.debugElement;
    const pagingDisplayDebugElement: DebugElement = debugElement.query(By.css('#pagingDisplay'));
    const pagingDisplayElement: HTMLElement = pagingDisplayDebugElement.nativeElement;
    const totalResultsDisplayDebugElement: DebugElement = debugElement.query(By.css('#totalResultsDisplay'));
    const totalResultsDisplayElement: HTMLElement = totalResultsDisplayDebugElement.nativeElement;

    expect(component.page).toBe(page);
    expect(component.totalPages).toBe(totalPages);
    expect(component.totalResults).toBe(totalResults);

    expect(pagingDisplayElement.innerText).toBe(`Page ${page} of ${totalPages}`);
    expect(totalResultsDisplayElement.innerText).toBe(`Showing 1 - 50 of ${totalResults} search results.`);
  });

  describe('#disableMoveToPreviousPage', () => {
    it('should return true when page is less than or equal to one', () => {
      component.page = 1;
      const actual = component.disableMoveToPreviousPage();
      expect(actual).toBe(true);
    });

    it('should return false when page is greater than one', () => {
      component.page = 2;
      const actual = component.disableMoveToPreviousPage();
      expect(actual).toBe(false);
    });
  });

  describe('#disableMoveToNextPage', () => {
    it('should return true when page is greater than or equal to Total Pages', () => {
      component.page = 1;
      component.totalPages = 1;
      const actual = component.disableMoveToNextPage();
      expect(actual).toBe(true);
    });

    it('should return false when page is less than Total Pages', () => {
      component.page = 1;
      component.totalPages = 2;
      const actual = component.disableMoveToNextPage();
      expect(actual).toBe(false);
    });
  });

  describe('#pageRequest', () => {

    it('#moveToFirstPage should emit a paging request when called', () => {
      component.pageRequest.subscribe((value) => { 
        let pageRequested = value; 
        expect(pageRequested).toBeTruthy();
        expect(pageRequested).toBe(1);
      });

      component.moveToFirstPage();
    });

    it('#moveToPreviousPage should emit a paging request when called', () => {
      component.pageRequest.subscribe((value) => { 
        let pageRequested = value; 
        expect(pageRequested).toBeTruthy();
        expect(pageRequested).toBe(1);
      });

      component.page = 2;
      component.moveToPreviousPage();
    });

    it('#moveToPreviousPage should not emit a paging request when page is one', () => {
      component.pageRequest.subscribe((value) => { 
        let pageRequested = value; 
        expect(pageRequested).toBeTruthy();
        expect(pageRequested).toBe(1);
      });

      component.page = 1;
      component.moveToPreviousPage();
    });

    it('#moveToNextPage should emit a paging request when called', () => {
      component.pageRequest.subscribe((value) => { 
        let pageRequested = value; 
        expect(pageRequested).toBeTruthy();
        expect(pageRequested).toBe(2);
      });

      component.page = 1;
      component.totalPages = 2;
      component.moveToNextPage();
    });

    it('#moveToNextPage should not emit a paging request when page is greater than Total Pages', () => {
      component.pageRequest.subscribe((value) => { 
        let pageRequested = value; 
        expect(pageRequested).toBeTruthy();
        expect(pageRequested).toBe(1);
      });

      component.page = 1;
      component.totalPages = 1;
      component.moveToNextPage();
    });

    it('#moveToLastPage should emit a paging request when called', () => {
      component.pageRequest.subscribe((value) => { 
        let pageRequested = value; 
        expect(pageRequested).toBeTruthy();
        expect(pageRequested).toBe(2);
      });

      component.page = 1;
      component.totalPages = 2;
      component.moveToLastPage();
    });
    
  });
});
