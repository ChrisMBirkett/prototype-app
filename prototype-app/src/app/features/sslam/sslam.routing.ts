import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SslamComponent } from './sslam.component';
import { SslamEditFormComponent } from './sslam-edit-form/sslam-edit-form.component';

// TODO: Remove the routing for SingleRecordEditor once it has been made into a pop-up form
const routes: Routes = [
  {
    path: 'sslam',
    component: SslamComponent,
    data: {
      pageTitle: "SSLAM Search"
    }
  },
  {
    path: 'sslam/singlerecordeditor',
    component: SslamEditFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SslamRoutingModule { }

export const routedComponents = [SslamComponent];
