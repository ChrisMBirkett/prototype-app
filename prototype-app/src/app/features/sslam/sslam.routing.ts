import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SslamComponent } from './sslam.component';

const routes: Routes = [
  {
    path: 'sslam',
    component: SslamComponent
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SslamRoutingModule { }

export const routedComponents = [SslamComponent];
