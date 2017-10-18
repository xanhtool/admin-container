import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminEmailService {

  constructor(
    private http: HttpClient
  ) { }

  getTemplates() {
    return this.http.get('/api/v1/templates').map((data:any) => data.templates)
  }
  

  getRecipients() {
    return this.http.get('/api/v1/recipients').map((data:any) => data.recipients)
  }

  sendCampain(form) {
    return this.http.post('api/v1/campain',form)
  }
}
