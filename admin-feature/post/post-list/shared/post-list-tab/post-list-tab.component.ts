import { AuthService } from './../../../../../admin-core/services/auth.service';
import { AdminPostService } from './../../../../../admin-shared/services/admin-post.service';
import { EventService } from './../../../../../admin-shared/services/event.service';
import { Component, OnInit, Input } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { ExampleDataSource } from './../data-source';

@Component({
  selector: 'app-post-list-tab',
  templateUrl: './post-list-tab.component.html',
  styleUrls: ['./post-list-tab.component.css']
})
export class PostListTabComponent implements OnInit {
  @Input() orderByChild: string;
  @Input() equalTo: boolean;
  // @Input() viewMode: string;

  displayedColumns: string[] = [
      'author', 
      'title', 
      'button',
    ];
  dataSource: ExampleDataSource | null;
  noData: any;

  constructor(
    public adminPostService: AdminPostService,
    public eventService: EventService,
    public authService: AuthService
  ) {
   }

  ngOnInit() {
     // loading data corresponding to viewmode
    // this.dataSource = new ExampleDataSource(this.adminPostService,this.queryByChild,this.equalTo);
    let posts$;
    if (this.orderByChild == 'postMark/isPublished' && this.equalTo == false) posts$ = this.adminPostService.getDraftPosts();
    else posts$ = this.adminPostService.getCustomPosts(this.orderByChild,
    this.equalTo)
    this.dataSource = new ExampleDataSource(posts$);
    
    // checking if there is no post, show 'không có dữ liệu'
    this.noData = this.dataSource.posts.map(posts => !posts.length)

  }

  viewPost(post) {
    this.eventService.emitEvent('userSelectedPost',post.postOption.slug)
  }

  deletePost(post) {
    this.adminPostService.deletePost(post);
  }
}
