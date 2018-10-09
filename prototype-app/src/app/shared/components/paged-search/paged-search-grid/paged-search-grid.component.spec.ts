import { async, ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { DebugElement, SimpleChange } from "@angular/core";
import { By } from "@angular/platform-browser";

import { WjGridModule, WjFlexGrid } from "wijmo/wijmo.angular2.grid";
import { WjGridFilterModule } from "wijmo/wijmo.angular2.grid.filter";
import { WjInputModule } from "wijmo/wijmo.angular2.input";
import * as wjcGrid from "wijmo/wijmo.grid";
import * as wjcGridFilter from "wijmo/wijmo.angular2.grid.filter";

import * as _ from "lodash";

import { PagedSearchGridComponent } from "./paged-search-grid.component";
import { PagedSearchFactory } from "../../../../test-helpers/paged-search-factory";
import { GridSelectionMode } from "../../../enumerations";
import { GridColumnsComponent } from "../grid-columns/grid-columns.component";
import { PagerComponent } from "../pager/pager.component";
import { ColumnSearchFilter } from "../../../models";
import { PagedSearchDefaults } from "../../../config/paged-search-defaults";
import { nextTick } from "q";

describe("PagedSearchGridComponent", () => {
  let component: PagedSearchGridComponent;
  let fixture: ComponentFixture<PagedSearchGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PagedSearchGridComponent,
        GridColumnsComponent,
        PagerComponent
      ],
      imports: [
        WjGridModule, 
        WjGridFilterModule, 
        WjInputModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagedSearchGridComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have gridSectionHeight set to 0 on initialization", () => {
    expect(component.gridSectionHeight).toBe("0");
  });

  it("should have a valid paged search result when it is assigned to the component", () => {
    // ARRANGE
    component.pagedSearchResult = PagedSearchFactory.getPagedSearchResult();

    // ACT

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

  it("should have gridData when the paged search result is assigned to the component", async(() => {
    // ARRANGE
    component.pagedSearchResult = PagedSearchFactory.getPagedSearchResult();
    const simpleChanges = {
      pagedSearchResult: new SimpleChange(null,PagedSearchFactory.getPagedSearchResult(), false),
      resetGrid: new SimpleChange(null,false, false),
      showEditButton: new SimpleChange(null,false, false),
      enableBulkEdit: new SimpleChange(null,false, false),
      selectionMode: new SimpleChange(null, GridSelectionMode.Row, false)
    };

    // ACT
    fixture.detectChanges();
    component.ngOnChanges(simpleChanges);

    // ASSERT
    fixture.whenStable().then(() => { 
      fixture.detectChanges();

      expect(component.gridData.length).toEqual(50);
      expect(component.gridSectionHeight).not.toBe("0");
    });
  }));

  it("should have showGrid equal to true when the paged search result is assigned to the component", async(() => {
    // ARRANGE
    component.pagedSearchResult = PagedSearchFactory.getPagedSearchResult();
    const simpleChanges = {
      pagedSearchResult: new SimpleChange(null,PagedSearchFactory.getPagedSearchResult(), false),
      resetGrid: new SimpleChange(null,false, false),
      showEditButton: new SimpleChange(null,false, false),
      enableBulkEdit: new SimpleChange(null,false, false),
      selectionMode: new SimpleChange(null, GridSelectionMode.Row, false)
    };

    // ACT
    fixture.detectChanges();
    component.ngOnChanges(simpleChanges);

    // ASSERT
    fixture.whenStable().then(() => { 
      fixture.detectChanges();

      expect(component.showGrid).toEqual(true);
    });
  }));

  describe("#onPageRequest", () => {
    it("should have a new page number in the search request when called", () => {
      component.gridSearchRequest.subscribe((value) => { 
        let searchRequest = value; 
        expect(searchRequest.page).not.toBe(1);
      });

      component.onPageRequest(2);
    });
  });

  describe("#onFilterChanged", () => {
    it('should emit a valid search request when filter event issued', () => {

      // TODO: Manually set up a filter and issue the filter request from the DOM

      const mockEventArgs: wjcGrid.CellRangeEventArgs = {
        cancel: false,
        col: 1, // index of second column name in the filterColumns array member
        data: {},
        panel: null,
        range: null,
        row: 1,
        _p: null,
        _rng: null,
        _data: null
      };

      component.gridSearchRequest.subscribe((value) => { 
        let searchRequest = value; 
        expect(searchRequest.filters).toBeTruthy();
      });

      component.onFilterChanged(mockEventArgs);
    });
  });

  describe("#onSortedColumn", () => {
    it('should emit a valid search request when sort event issued', async(() => {

      const mockEventArgs: wjcGrid.CellRangeEventArgs = {
        cancel: true,
        col: 1, // index of second column name in the filterColumns array member
        data: {},
        panel: null,
        range: null,
        row: 1,
        _p: null,
        _rng: null,
        _data: null
      };
      
      component.pagedSearchResult = PagedSearchFactory.getPagedSearchResult();
      fixture.detectChanges();

      component.gridSearchRequest.subscribe((value) => { 
        let searchRequest = value; 
        expect(searchRequest.sortBy).not.toBe(PagedSearchDefaults.sortColumn);
        expect(searchRequest.sortDirection).toBe("ASC");
      });

      fixture.whenStable().then(() => { 
        component.onSortedColumn(mockEventArgs);
      });
    }));
  });

  describe("#editRow", () => {
    it("should emit a record edit when clicked", async(() => {
      const recordToEdit = PagedSearchFactory.getPagedSearchResult().searchResults[0];

      component.editRecord.subscribe((value) => { 
        let record = value; 
        expect(record).toBeTruthy();
        expect(record).toBe(recordToEdit);
      });

      fixture.whenStable().then(() => { 
        component.editRow(recordToEdit);
      });
    }));
  });

  describe('#GridFilters', () => {
    it("should have valid filterColumns when the paged search result is assigned to the component", async(() => {
      // ARRANGE
      component.pagedSearchResult = PagedSearchFactory.getPagedSearchResult();
      const simpleChanges = {
        pagedSearchResult: new SimpleChange(null, PagedSearchFactory.getPagedSearchResult(), false),
        resetGrid: new SimpleChange(null,false, false),
        showEditButton: new SimpleChange(null,false, false),
        enableBulkEdit: new SimpleChange(null,false, false),
        selectionMode: new SimpleChange(null, GridSelectionMode.Row, false)
      };

      // ACT
      fixture.detectChanges();
      component.ngOnChanges(simpleChanges);

      // ASSERT
      fixture.whenStable().then(() => { 
        fixture.detectChanges();

        expect(component.filterColumns.length).toEqual(10);
      });
      
    }));

    it("#GridFilters should have valid filterColumns when the paged search result is assigned to the component", async(() => {
      const simpleChanges = {
        pagedSearchResult: new SimpleChange(null,PagedSearchFactory.getPagedSearchResult(), true)
      };
      
      component.pagedSearchResult = PagedSearchFactory.getPagedSearchResult();
      fixture.detectChanges();
      component.ngOnChanges(simpleChanges);
      fixture.detectChanges();

      const debugElement: DebugElement = fixture.debugElement;
      const gridDebugElement: DebugElement = debugElement.query(By.directive(WjFlexGrid));
      const grid: WjFlexGrid = gridDebugElement.componentInstance;
      grid.refreshCells(true);
      const gridNativeElement: HTMLElement = gridDebugElement.nativeElement;

      fixture.whenStable().then(() => { 
        fixture.detectChanges();

        expect(component.filter.filterColumns.length).toEqual(10);
        _.forEach(component.filter.filterColumns, columnName => {
          expect(component.filter.getColumnFilter(columnName)).toBeTruthy();
          expect(component.filter.getColumnFilter(columnName).valueFilter).toBeTruthy();
          // test each valueFilter.uniqueValues collection to ensure it matches the length of the columns.filterValues property
        });
      });
    }));
  });

  describe("#WijmoGrid", () => {
    it(`should display the "Vendor" column header`, async(() => {
      const simpleChanges = {
        pagedSearchResult: new SimpleChange(null,PagedSearchFactory.getPagedSearchResult(), false),
        // resetGrid: new SimpleChange(null,false, false),
        // showEditButton: new SimpleChange(null,false, false),
        // enableBulkEdit: new SimpleChange(null,false, false),
        // selectionMode: new SimpleChange(null, GridSelectionMode.Row, false)
      };
      
      component.pagedSearchResult = PagedSearchFactory.getPagedSearchResult();
      fixture.detectChanges();
      component.ngOnChanges(simpleChanges);
      fixture.detectChanges();

      const debugElement: DebugElement = fixture.debugElement;
      const gridDebugElement: DebugElement = debugElement.query(By.directive(WjFlexGrid));
      const grid: WjFlexGrid = gridDebugElement.componentInstance;
      grid.refreshCells(true);
      const gridNativeElement: HTMLElement = gridDebugElement.nativeElement;

      fixture.whenStable().then(() => { 
        fixture.detectChanges();

        const colHeaderCellElement: Element | null = gridNativeElement.querySelectorAll('.wj-colheaders .wj-cell.wj-header')[0];
        expect(colHeaderCellElement).not.toBeNull();
        if (colHeaderCellElement) {
            expect(colHeaderCellElement.textContent).toEqual('Vendor');
        }
      });
    }));
    
    it(`should display the column headers`, async(() => {
      const simpleChanges = {
        pagedSearchResult: new SimpleChange(null,PagedSearchFactory.getPagedSearchResult(), false),
        resetGrid: new SimpleChange(null,false, false),
        showEditButton: new SimpleChange(null,false, false),
        enableBulkEdit: new SimpleChange(null,false, false),
        selectionMode: new SimpleChange(null, GridSelectionMode.Row, false)
      };

      // TODO: Update this test to use the PagedSearchFactory.getPagedSearchResult() object to read out the columnHeaders from the columns collection for the assertions
      component.pagedSearchResult = PagedSearchFactory.getPagedSearchResult();
      fixture.detectChanges();
      component.ngOnChanges(simpleChanges);
      fixture.detectChanges();

      const debugElement: DebugElement = fixture.debugElement;
      const gridDebugElement: DebugElement = debugElement.query(By.directive(WjFlexGrid));
      const grid: WjFlexGrid = gridDebugElement.componentInstance;
      grid.refreshCells(true);
      const gridNativeElement: HTMLElement = gridDebugElement.nativeElement;

      fixture.whenStable().then(() => { 
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
      });
    }));

    it(`should render the first row of search results`, async(() => {
      const simpleChanges = {
        pagedSearchResult: new SimpleChange(null,PagedSearchFactory.getPagedSearchResult(), false),
        resetGrid: new SimpleChange(null,false, false),
        showEditButton: new SimpleChange(null,false, false),
        enableBulkEdit: new SimpleChange(null,false, false),
        selectionMode: new SimpleChange(null, GridSelectionMode.Row, false)
      };

      // TODO: Update this test to read the first record from the PagedSearchFactory.getPagedSearchResult() object searchResults property for the assertions
      component.pagedSearchResult = PagedSearchFactory.getPagedSearchResult();
      fixture.detectChanges();
      component.ngOnChanges(simpleChanges);
      fixture.detectChanges();

      const debugElement: DebugElement = fixture.debugElement;
      const gridDebugElement: DebugElement = debugElement.query(By.directive(WjFlexGrid));
      const grid: WjFlexGrid = gridDebugElement.componentInstance;
      grid.refreshCells(true);
      const gridNativeElement: HTMLElement = gridDebugElement.nativeElement;

      fixture.whenStable().then(() => { 

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
      });
    }));
  });
});
