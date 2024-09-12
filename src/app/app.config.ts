import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation, withViewTransitions } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,withHashLocation(),withViewTransitions()),
    provideHttpClient(withFetch()),
    importProvidersFrom(BrowserAnimationsModule),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ]
};
