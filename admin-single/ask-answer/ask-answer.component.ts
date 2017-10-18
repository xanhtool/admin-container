import { AdminComponentService } from './../../admin-shared/services/admin-component.service';
import { EventService } from './../../admin-shared/services/event.service';
import { AuthService } from './../../admin-core/services/auth.service';
import { AskSource } from './ask-source';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ask-answer',
  templateUrl: './ask-answer.component.html',
  styleUrls: ['./ask-answer.component.css']
})
export class AskAnswerComponent implements OnInit {
  displayedColumns: string[] = [
      'mode', 
      'email', 
      'question',
      'button'
    ];
  noData: boolean;
  tabs = [
    {
      name: 'Chưa trả lời',
      mode: false,
      dataSource: null
    },
    {
      name: 'Đã trả lời',
      mode: true,
      dataSource: null
    }
  ]

  constructor(
    public adminComponentService: AdminComponentService,
    public eventService: EventService,
    public authService: AuthService
  ) {
   }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.tabs.forEach(tab => {
      this.eventService.addEvent(tab.name,true);
      let posts$ = this.adminComponentService.getAsks(tab.mode,tab.name)
      tab['dataSource']= new AskSource(posts$);
    })
  }

  markDone(ask) {
    this.adminComponentService.updateAsk(ask);
  }

  deleteAsk(ask) {
    this.adminComponentService.deleteAsk(ask);
  }

}
