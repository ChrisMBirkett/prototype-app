import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

import * as wjcCore from "wijmo/wijmo";

if (environment.production) {
  enableProdMode();
}

// Register the Wijmo licensed controls
wjcCore.setLicenseKey(environment.wijmoDistributionLicense);

platformBrowserDynamic().bootstrapModule(AppModule);
