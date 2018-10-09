import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../../core/service/page-title.service';

@Component({
  selector: 'ln-page-title',
  templateUrl: './page-title.component.html'
})
export class PageTitleComponent implements OnInit {

  pageTitle: string = "";

  constructor(private pageTitleService: PageTitleService) { }

  ngOnInit() {
    this.pageTitleService.pageTitleSubject$.subscribe(
      (title) => {
        this.pageTitle = title;
      },
      error => { 
        console.log('PageTitleComponent: OnInit...PageTitleService', error);
      });
  }

}
