import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { WjGridModule, WjFlexGrid } from "wijmo/wijmo.angular2.grid";
import { WjGridFilterModule } from "wijmo/wijmo.angular2.grid.filter";
import { WjInputModule } from "wijmo/wijmo.angular2.input";

import { PagedSearchGridComponent } from "./paged-search-grid.component";
import { PagedSearchFactory } from "../../../../test-helpers/paged-search-factory";

describe("PagedSearchGridComponent", () => {
  let component: PagedSearchGridComponent;
  let fixture: ComponentFixture<PagedSearchGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PagedSearchGridComponent],
      imports: [WjGridModule, WjGridFilterModule, WjInputModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagedSearchGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have a valid paged search result when it is assigned to the component", () => {
    // ARRANGE
    component.pagedSearchResult = PagedSearchFactory.getPagedSearchResult();

    // ACT
    fixture.detectChanges();

    // ASSERT
    expect(component.pagedSearchResult.columns.length).toEqual(10);
    expect(component.pagedSearchResult.searchResults.length).toEqual(50);
    expect(component.pagedSearchResult.page).toEqual(1);
    expect(component.pagedSearchResult.pageSize).toEqual(50);
    expect(component.pagedSearchResult.sortBy).toEqual("TableID");
    expect(component.pagedSearchResult.sortDirection).toEqual("ASC");
    expect(component.pagedSearchResult.totalResults).toEqual(1303);
    expect(component.pagedSearchResult.totalPages).toEqual(26);
  });

  it("should have gridData when the paged search result is assigned to the component", () => {
    // ARRANGE
    component.pagedSearchResult = PagedSearchFactory.getPagedSearchResult();

    // ACT
    fixture.detectChanges();
    component.ngOnChanges();

    // ASSERT
    expect(component.gridData.length).toEqual(50);
  });

  it("should have valid filterColumns when the paged search result is assigned to the component", () => {
    // ARRANGE
    component.pagedSearchResult = PagedSearchFactory.getPagedSearchResult();

    // ACT
    fixture.detectChanges();
    component.ngOnChanges();

    // ASSERT
    expect(component.filterColumns.length).toEqual(10);
  });

  it("should have valid gridColumns when the paged search result is assigned to the component", () => {
    // ARRANGE
    component.pagedSearchResult = PagedSearchFactory.getPagedSearchResult();

    // ACT
    fixture.detectChanges();
    component.ngOnChanges();

    // ASSERT
    expect(component.gridColumns.length).toEqual(10);
    expect(component.gridColumns[0].binding).toEqual("vendorId");
    expect(component.gridColumns[0].format).toBeNull();
    expect(component.gridColumns[0].header).toEqual("Vendor");
  });

  it("should have showGrid equal to true when the paged search result is assigned to the component", () => {
    // ARRANGE
    component.pagedSearchResult = PagedSearchFactory.getPagedSearchResult();

    // ACT
    fixture.detectChanges();
    component.ngOnChanges();

    // ASSERT
    expect(component.showGrid).toEqual(true);
  });

  describe("#WijmoGrid", () => {
    it(`should display the "Vendor" column header`, async(() => {
      
      component.pagedSearchResult = PagedSearchFactory.getPagedSearchResult();
      fixture.detectChanges();
      component.ngOnChanges();
      fixture.detectChanges();

      const debugElement: DebugElement = fixture.debugElement;
      const gridDebugElement: DebugElement = debugElement.query(By.directive(WjFlexGrid));
      const grid: WjFlexGrid = gridDebugElement.componentInstance;
      grid.refreshCells(true);
      const gridNativeElement: HTMLElement = gridDebugElement.nativeElement;

      fixture.detectChanges();

      const colHeaderCellElement: Element | null = gridNativeElement.querySelectorAll('.wj-colheaders .wj-cell.wj-header')[0];
      expect(colHeaderCellElement).not.toBeNull();
      if (colHeaderCellElement) {
          expect(colHeaderCellElement.textContent).toEqual('Vendor');
      }
    }));
    
    it(`should display the column headers`, async(() => {
      // TODO: Update this test to use the PagedSearchFactory.getPagedSearchResult() object to read out the columnHeaders from the columns collection for the assertions
      component.pagedSearchResult = PagedSearchFactory.getPagedSearchResult();
      fixture.detectChanges();
      component.ngOnChanges();
      fixture.detectChanges();

      const debugElement: DebugElement = fixture.debugElement;
      const gridDebugElement: DebugElement = debugElement.query(By.directive(WjFlexGrid));
      const grid: WjFlexGrid = gridDebugElement.componentInstance;
      grid.refreshCells(true);
      const gridNativeElement: HTMLElement = gridDebugElement.nativeElement;

      fixture.detectChanges();

      // TODO: The CSS structure of the grid does not match the example this test is based on..not sure why this works
      const columnHeaders = gridNativeElement.querySelectorAll('.wj-colheaders .wj-cell.wj-header');
      const colHeaderCellElement: Element | null = columnHeaders[0];
      expect(colHeaderCellElement).not.toBeNull();
      if (colHeaderCellElement) {
          expect(colHeaderCellElement.textContent).toEqual('Vendor');
          expect(columnHeaders[1].textContent).toEqual('Contract');
          expect(columnHeaders[2].textContent).toEqual('Business Name');
          expect(columnHeaders[3].textContent).toEqual('Court');
          expect(columnHeaders[4].textContent).toEqual('File Type');
          expect(columnHeaders[5].textContent).toEqual('Product');
          expect(columnHeaders[6].textContent).toEqual('Goal');
          expect(columnHeaders[7].textContent).toEqual('Threshold');
          expect(columnHeaders[8].textContent).toEqual('Start Date');
          expect(columnHeaders[9].textContent).toEqual('End Date');
      }
    }));

    it(`should render the first row of search results`, async(() => {
      // TODO: Update this test to read the first record from the PagedSearchFactory.getPagedSearchResult() object searchResults property for the assertions
      component.pagedSearchResult = PagedSearchFactory.getPagedSearchResult();
      fixture.detectChanges();
      component.ngOnChanges();
      fixture.detectChanges();

      const debugElement: DebugElement = fixture.debugElement;
      const gridDebugElement: DebugElement = debugElement.query(By.directive(WjFlexGrid));
      const grid: WjFlexGrid = gridDebugElement.componentInstance;
      grid.refreshCells(true);
      const gridNativeElement: HTMLElement = gridDebugElement.nativeElement;

      fixture.detectChanges();

      // TODO: The CSS structure of the grid does not match the example this test is based on...0 - 9 are the column headers
      const gridCells = gridNativeElement.querySelectorAll('.wj-cells .wj-cell');
      console.log(`should render the first row of search results`, gridCells);
      const vendorCellElement: Element | null = gridCells[10];
      expect(vendorCellElement).not.toBeNull();
      if (vendorCellElement) {
          expect(vendorCellElement.textContent).toEqual('55');
          expect(gridCells[11].textContent).toEqual('72');
          expect(gridCells[12].textContent).toEqual('IN-STATE INVESTIGATIONS, LLC');
          expect(gridCells[13].textContent).toEqual('AZAPAC1   ');
          expect(gridCells[14].textContent).toEqual('CF');
          expect(gridCells[15].textContent).toEqual('BPRC');
          expect(gridCells[16].textContent).toEqual('0');
          expect(gridCells[17].textContent).toEqual('0.95');
          expect(gridCells[18].textContent).toEqual('07/12/2017');
          expect(gridCells[19].textContent).toEqual('07/11/2018');
      }
  }));
  });
});
