import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { VendorRatesComponent } from './features/vendor-rates/vendor-rates.component';
import { AssignmentsComponent } from './features/assignments/assignments.component';
import { SslamComponent } from './features/sslam/sslam.component';
import { VendorRatesGuard, AssignmentsGuard } from './core/security';
import { ErrorPageComponent } from './shared/components/ui-helpers/error-page/error-page.component';

const routes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent
  },
  {
      path: 'rates',
      component: VendorRatesComponent,
      canActivate: [VendorRatesGuard]
  },
  {
      path: 'assignments',
      component: AssignmentsComponent,
      canActivate: [AssignmentsGuard]
  },
  {
    path: 'error',
    component: ErrorPageComponent
  },
  {
      path: 'sslam',
      component: SslamComponent
  },
  {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
  },
  {
      path: '**',
      redirectTo: '/home',
      pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [AppComponent];
