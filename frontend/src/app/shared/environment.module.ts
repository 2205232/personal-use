import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

export interface Environment{
  production: boolean;
  URL: string;
  authUrl: string;
}
 
export const ENVIRONMENT = new InjectionToken<Environment>('environment');

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [{
    provide: ENVIRONMENT, useValue: environment
  }]
})
export class EnvironmentModule { }
