import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { MyPreset } from '../styles';
import { routes } from './app.routes';

import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      translation: {
        apply: 'Aplicar',
        clear: 'Limpar'
      },
      ripple: true,
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: 'system'
        }
      }
    })
  ]
};
