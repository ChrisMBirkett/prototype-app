import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ln-pager',
  templateUrl: './pager.component.html'
})
export class PagerComponent implements OnInit, OnChanges {

  @Input() page: number;
  @Input() totalPages: number;
  @Input() totalResults: number;

  @Output() pageRequest = new EventEmitter<number>();

  pageStart: number;
  pageEnd: number;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes.page && changes.page.currentValue) || 
        (changes.totalPages && changes.totalPages.currentValue) || 
        (changes.totalResults && changes.totalResults.currentValue)) {
      
      setTimeout(() => {
        this.calculatedCurrentPageStartAndEnd();
      }, 0);
      
    } 
  }

  moveToFirstPage(): void {
    this.pageRequest.emit(1);
  }

  moveToPreviousPage(): void {
    const requestedPage = this.page - 1;
    if (requestedPage > 1) {
      this.pageRequest.emit(requestedPage);
    }
  }

  moveToNextPage(): void {
    const requestedPage = this.page + 1;
    if (requestedPage <= this.totalPages) {
      this.pageRequest.emit(requestedPage);
    }
  }

  moveToLastPage(): void {
    this.pageRequest.emit(this.totalPages);
  }

  disableMoveToPreviousPage(): boolean {
    return this.page <= 1;
  }

  disableMoveToNextPage(): boolean {
    return this.page >= this.totalPages;
  }

  private calculatedCurrentPageStartAndEnd(): void {
    this.pageStart = ((this.page - 1) * 50) + 1;
    if (this.page === this.totalPages) {
      this.pageEnd = this.totalResults;
    } else {
      this.pageEnd = this.pageStart + 49;
    }
  }

}
