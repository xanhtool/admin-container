import { AskAnswerComponent } from './ask-answer/ask-answer.component';
import { EmailMarketingComponent } from './email-marketing/email-marketing.component';
import { AdminNotfoundComponent } from './admin-notfound/admin-notfound.component';
import { ProfileComponent } from './profile/profile.component';
import { FaqComponent } from './faq/faq.component';
import { CategoryComponent } from './category/category.component';
import { SettingWebsiteComponent } from './setting-website/setting-website.component';
import { AdminTemplateComponent } from './../admin-core/admin-template/admin-template.component';
import { AuthGuard } from './../admin-core/services/auth.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardHomeComponent } from "./dashboard-home/dashboard-home.component";

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
    pathMatch: 'full'
  },
  { 
    path: '', 
    component: AdminTemplateComponent,
    canActivateChild: [AuthGuard],
    children: [
      { 
        path: '', 
        component: DashboardHomeComponent 
      },
      {
        path:'setting-website',
        component: SettingWebsiteComponent 
      },
      { 
        path: 'category-list', 
        component: CategoryComponent,
      },
      { 
        path: 'faq', 
        component: FaqComponent,
      },
      { 
        path: 'profile', 
        component: ProfileComponent,
      },
      { 
        path: 'email-marketing', 
        component: EmailMarketingComponent,
      },
      { 
        path: 'ask-answer', 
        component: AskAnswerComponent,
      },
      { 
        path: '404', 
        component: AdminNotfoundComponent,
      },
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AdminSingleRoutingModule { }
