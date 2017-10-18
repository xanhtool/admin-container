import { AdminPostService } from './../../../../admin-shared/services/admin-post.service';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';

export class ExampleDataSource extends DataSource<any> {

  posts:any;
  
  // constructor(
  //   private adminPostService: AdminPostService,
  //   orderByChild,
  //   equalTo?  
  // ) {
  //   super();
  //   if (orderByChild == 'postMark/isPublished'&& equalTo == false) this.posts = adminPostService.getDraftPosts();
  //   else this.posts = adminPostService.getCustomPosts(orderByChild,
  //   equalTo)
  // }


  constructor(posts$) {
    super();
    this.posts = posts$;
  }


  connect(): Observable<any[]> {
    return this.posts;
  }

  disconnect() {}

  // firstPost() {
  //   return this.connect().filter(data => data.length > 0).map(posts => posts[0])
  // }
}
