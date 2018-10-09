import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import * as _ from "lodash";

import { ColumnDefinition, Column } from '../../../models';

@Component({
  selector: 'ln-grid-columns',
  templateUrl: './grid-columns.component.html'
})
export class GridColumnsComponent implements OnInit, OnChanges {

  @Input() columns: Column[];

  gridColumns: ColumnDefinition[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns && changes.columns.currentValue) {
      setTimeout(() => {
        this.gridColumns = this.generateGridColumnCollection(this.columns);
      }, 0);
    } 
  }

  private generateGridColumnCollection(columns: Column[]): ColumnDefinition[] {
    let columnDefinitions: ColumnDefinition[] = [];

    _.forEach(columns, column => {
      columnDefinitions.push({
        header: column.columnHeader,
        binding: column.columnId,
        width: column.width,
        format: column.format // TODO: Get this working correctly to apply custom formatting as needed to the Wijmo FlexGrid
      });
    });

    return columnDefinitions;
  }

}
