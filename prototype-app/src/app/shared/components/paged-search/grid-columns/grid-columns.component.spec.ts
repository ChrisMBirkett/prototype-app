import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WjGridModule, WjFlexGrid } from "wijmo/wijmo.angular2.grid";

import * as _ from "lodash";

import { GridColumnsComponent } from './grid-columns.component';
import { PagedSearchFactory } from '../../../../test-helpers/paged-search-factory';

describe('GridColumnsComponent', () => {
  let component: GridColumnsComponent;
  let fixture: ComponentFixture<GridColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridColumnsComponent ],
      imports: [
        WjGridModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridColumnsComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have ten columns when column input is set', () => {
    component.columns = PagedSearchFactory.getPagedSearchResult().columns;

    expect(component.columns.length).toBe(PagedSearchFactory.getPagedSearchResult().columns.length);
  });

  it('should have valid column definitions when the column input is set', () => {
    component.columns = PagedSearchFactory.getPagedSearchResult().columns;

    fixture.detectChanges();

    expect(component.gridColumns).toBeTruthy();
    _.forEach(component.gridColumns, gridColumn => {
      let foundColumn = _.find(component.columns, (col) => { return col.columnId === gridColumn.binding; });
      expect(foundColumn).toBeTruthy();
      expect(gridColumn.header).toBe(foundColumn.columnHeader);
      expect(gridColumn.width).toBe(foundColumn.width);
    });
  });
});
