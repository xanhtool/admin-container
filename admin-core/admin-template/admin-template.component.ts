import { AdminComponentService } from './../../admin-shared/services/admin-component.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css'],
})
export class AdminTemplateComponent implements OnInit {
  websiteName:any;
  constructor(
    public authService: AuthService,
    public adminComponentService:AdminComponentService
  ) { }

  ngOnInit() {
    this.adminComponentService.getSetting().subscribe((setting:any) => {
      this.websiteName = setting.titleTag;
    });
  }

}
