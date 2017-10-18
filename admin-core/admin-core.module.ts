import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCoreRoutingModule } from './admin-core-routing.module';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AdminSharedModule } from "../admin-shared/admin-shared.module";

@NgModule({
  imports: [
    CommonModule,
    AdminCoreRoutingModule,
    AdminSharedModule
  ],
  declarations: [AdminTemplateComponent],
  providers: [AuthService]
})
export class AdminCoreModule {
  
 }
