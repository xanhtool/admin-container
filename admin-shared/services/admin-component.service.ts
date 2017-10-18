import { SnackbarService } from './snackbar.service';
import { EventService } from './event.service';
import { AuthService } from './../../admin-core/services/auth.service';
import { AngularFireDatabase} from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class AdminComponentService {
  user: firebase.User;
  userUid: any;
  
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private snackBarService: SnackbarService,
    private eventService: EventService
  ) {
      // get user infomation
      this.authService.user.subscribe(user => {
        this.user = user;
        this.userUid = this.user.uid;
      })

      // create new event
      this.eventService.addEvent('postUploading',false)
   }


  getSetting() {
    return this.db.object('/web-setting/').valueChanges()
    .do(web => console.log('web setting',web));
  }

  updateSetting(setting) {
    return this.db.object('/web-setting/').update(setting)
    .then(() => {
      this.snackBarService.openSnackBar("Đã lưu cấu hình!");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }


  getNavbar() {
    return this.db.object('/navbar/').valueChanges();
  }

  updateNavbar(place,setting) {
    return this.db.object('/navbar/'+place).update(setting)
    .then(() => {
      this.snackBarService.openSnackBar("Đã lưu cấu hình!");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }

  getFooter() {
    return this.db.object('/footer/').valueChanges();
  }

  updateFooter(setting) {
    return this.db.object('/footer/').update(setting)
    .then(() => {
      this.snackBarService.openSnackBar("Đã lưu cấu hình!");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }

  getCategories() {
    return this.db.list('/categories/').snapshotChanges()
    .map(itemChanges => 
      itemChanges.map(itemChange => 
        ({ $key:itemChange.payload.key,...itemChange.payload.val()})
      )
    )
    .do(cs => console.log('caetegories in email',cs))
  }

  addCategory(setting) {
    return this.db.list('/categories/').push(setting)
    .then(
      () => this.snackBarService.openSnackBar("Đã thêm danh mục"),
      (e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000)
    )
  }

  updateCategory(key,setting) {
    return this.db.list('/categories/').update(key,setting)
    .then(() => {
      this.snackBarService.openSnackBar("Đã sửa danh mục");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }

  deleteCategory(key) {
    return this.db.list('/categories/').remove(key)
    .then(() => {
      this.snackBarService.openSnackBar("Đã xoá danh mục");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }

  swapCategory(setting) {
    return this.db.object('/').update(setting)
    .then(() => {
      this.snackBarService.openSnackBar("Đã đổi vị trí danh mục");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }

  getNavbarCategories() {
    return this.db.list('/categories/',ref => ref.orderByChild('onNavbar').equalTo(true)).snapshotChanges()
    .map(itemChanges => 
      itemChanges.map(itemChange => 
        ({ $key: itemChange.payload.key, ...itemChange.payload.val() })
      )
    );
  }

   getFaq() {
    return this.db.list('/faq/').snapshotChanges()
    .map(itemChanges => 
      itemChanges.map(itemChange => 
        ({ $key:itemChange.payload.key,...itemChange.payload.val()})
      )
    );
  }

  addFaq(setting) {
    return this.db.list('/faq/').push(setting)
    .then(
      () => this.snackBarService.openSnackBar("Đã thêm câu hỏi"),
      (e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000)
    )
  }
  
  updateFaq(key,setting) {
    return this.db.list('/faq/').update(key,setting)
    .then(
      () => this.snackBarService.openSnackBar("Đã thêm câu hỏi"),
      (e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000)
    )
  }

  swapFaq(setting) {
    return this.db.object('/').update(setting)
     .then(
      () => this.snackBarService.openSnackBar("Đã đổi vị trí câu hỏi"),
      (e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000)
    )
  }

  deleteFaq(key) {
    return this.db.list('/faq/').remove(key)
    .then(() => this.snackBarService.openSnackBar("Đã xóa câu hỏi"),
    (e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000))
  }


  getQuote() {
    return this.db.list('/quotes/').snapshotChanges()
    .map(itemChanges => 
      itemChanges.map(itemChange => 
        ({ $key: itemChange.payload.key, ...itemChange.payload.val() })
      )
    );
  }

  addQuote(data) {
    return this.db.list('/quotes/').push(data).then(
      () => this.snackBarService.openSnackBar("Đã thêm trích dẫn"),
      (e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000)
    )
  }

  updateQuote(key,data) {
    return this.db.list('/quotes/').update(key,data)
    .then(
      () => this.snackBarService.openSnackBar("Đã lưu trích dẫn!"),
      (e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000)
    )
  }

  deleteQuote(key) {
    return this.db.list('/quotes/').remove(key).then(
      () => this.snackBarService.openSnackBar("Đã xóa trích dẫn!"),
      (e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000)
    )
  }

  swapQuote(setting) {
    return this.db.object('/').update(setting)
    .then(
      () => this.snackBarService.openSnackBar("Đã đổi vị trí trích dẫn"),
      (e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000)
    )
  }

  sendValuation(value) {
    return this.db.object('/valuation/'+this.userUid).update(value)
    .then(() => {
      this.snackBarService.openSnackBar("Cảm ơn bạn đã gửi đánh giá!");
    })
    .catch((e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000));
  }

  getValuation(){
    return this.db.object('/valuation/'+this.userUid)
    .valueChanges();
  }

  sendBug(bug){
    return this.db.list('/bugs/').push(bug).then(
      () => this.snackBarService.openSnackBar("Đã gửi bug bạn gặp đến bác sĩ điều trị!"),
      (e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000))
  }

  sendFeature(data){
    return this.db.list('/features/').push(data).then(
      () => this.snackBarService.openSnackBar("Đã gửi tính năng mới của bạn đến hòm ý tưởng!"),
      (e) => this.snackBarService.openSnackBar("Lỗi: "+e,"Đóng",3000))
  }

  getAsks(isDone,tabName) {
    return this.db.list('asks',ref => ref.orderByChild('done').equalTo(isDone)).snapshotChanges()
    .map(itemChanges => 
      itemChanges.map(itemChange => 
        ({ $key: itemChange.payload.key, ...itemChange.payload.val() })
      )
    )
    .do(() =>this.eventService.emitEvent(tabName,false))
    ;
  }

  deleteAsk(ask) {
    return this.db.list('asks').remove(ask)
  }

  updateAsk(ask) {
    return this.db.list('asks').update(ask.$key,{done:true})
  }
  
}
