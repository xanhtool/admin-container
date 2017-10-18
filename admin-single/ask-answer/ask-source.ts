import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';

export class AskSource extends DataSource<any> {
  posts:any;
  constructor(posts$) {
    super();
    this.posts = posts$;
  }
  connect(): Observable<any[]> {
    return this.posts;
  }
  disconnect() {}

}
