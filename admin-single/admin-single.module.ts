import { AdminSharedModule } from '../admin-shared/admin-shared.module';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSingleRoutingModule } from './admin-single-routing.module';
import { SettingWebsiteComponent } from './setting-website/setting-website.component';
import { CategoryComponent } from './category/category.component';
import { FaqComponent } from './faq/faq.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminNotfoundComponent } from './admin-notfound/admin-notfound.component';
import { EmailMarketingComponent } from './email-marketing/email-marketing.component';
import { AskAnswerComponent } from './ask-answer/ask-answer.component';
import { DashboardHomeComponent } from "./dashboard-home/dashboard-home.component";


@NgModule({
  imports: [
    CommonModule,
    AdminSingleRoutingModule,
    AdminSharedModule
  ],
  declarations: [
    LoginComponent, 
    DashboardHomeComponent,
    SettingWebsiteComponent, 
    CategoryComponent,FaqComponent, ProfileComponent, AdminNotfoundComponent, EmailMarketingComponent, AskAnswerComponent, 
  ],

})
export class AdminSingleModule { }
