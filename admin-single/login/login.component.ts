import { Router } from '@angular/router';
import { SnackbarService } from './../../admin-shared/services/snackbar.service';
import { AuthService } from './../../admin-core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  isLogged : boolean = false;
  constructor(
    private authService:AuthService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {
    this.checkAdmin();
   }

  ngOnInit() {
  }

  checkAdmin() {
    this.load();
    this.authService.afAuth.authState.subscribe(authState => {
      this.load();
      if (authState && authState.providerData[0].providerId == 'password') {
        this.router.navigate(['/admin'])
      } 
      else if (authState && authState.providerData[0].providerId != 'password') {
        this.isLogged = true;
      } else this.isLogged = false;
    });
  }

  logout() {
    this.load(true)
    this.authService.afAuth.auth.signOut()
    .then (() => this.load(false))
    .catch((err) => {
      this.load(false);
      switch (err.message) {
        case "There is no user record corresponding to this identifier. The user may have been deleted." : 
          this.snackbarService.openSnackBar("Lỗi không tồn tại người dùng này", "Đóng", 5000)
        case "The email address is badly formatted.": 
          this.snackbarService.openSnackBar("Lỗi email không đúng định dạng", "Đóng", 5000)
        case "The password is invalid or the user does not have a password.": 
          this.snackbarService.openSnackBar("Lỗi mật khẩu không đúng hoặc chưa nhập mật khẩu", "Đóng", 5000)
        case "A network error (such as timeout, interrupted connection or unreachable host) has occurred.":
          this.snackbarService.openSnackBar("Lỗi không truy cập được mạng, đang tự động refesh lại trang", "Đóng", 5000);
          this.router.navigate(['/login'])
        default:
          this.snackbarService.openSnackBar(err.message, "Đóng", 5000);
      }
    });
  }

  login(username, password) {
    this.load();
    this.authService.login(username, password)
    .then(() => {
      this.load();
    })
    .catch((err) => {
      this.loading = false;
      switch (err.message) {
        case "There is no user record corresponding to this identifier. The user may have been deleted." : 
          this.snackbarService.openSnackBar("Lỗi không tồn tại người dùng này", "Đóng", 5000)
        case "The email address is badly formatted.": 
          this.snackbarService.openSnackBar("Lỗi email không đúng định dạng", "Đóng", 5000)
        case "The password is invalid or the user does not have a password.": 
          this.snackbarService.openSnackBar("Lỗi mật khẩu không đúng hoặc chưa nhập mật khẩu", "Đóng", 5000)
        case "A network error (such as timeout, interrupted connection or unreachable host) has occurred.":
          this.snackbarService.openSnackBar("Lỗi không truy cập được mạng, đang tự động refesh lại trang", "Đóng", 5000);
          this.router.navigate(['/login'])
        default:
          this.snackbarService.openSnackBar(err.message, "Đóng", 5000);
      }
    });
  }

  loginFacebook() {
    this.load();
    this.authService.loginFB()
     .then(() => {
      this.load();
    })
    .catch((err) => {
      this.loading = false;
      switch (err.message) {
        case "There is no user record corresponding to this identifier. The user may have been deleted." : 
          this.snackbarService.openSnackBar("Lỗi không tồn tại người dùng này", "Đóng", 5000)
        case "The email address is badly formatted.": 
          this.snackbarService.openSnackBar("Lỗi email không đúng định dạng", "Đóng", 5000)
        case "The password is invalid or the user does not have a password.": 
          this.snackbarService.openSnackBar("Lỗi mật khẩu không đúng hoặc chưa nhập mật khẩu", "Đóng", 5000)
        case "A network error (such as timeout, interrupted connection or unreachable host) has occurred.":
          this.snackbarService.openSnackBar("Lỗi không truy cập được mạng, đang tự động refesh lại trang", "Đóng", 5000);
          this.router.navigate(['/login'])
        default:
          this.snackbarService.openSnackBar(err.message, "Đóng", 5000);
      }
    });
  }

  loginGoogle() {
    this.load();
    this.authService.loginGG()
     .then(() => {
      this.load();
    })
    .catch((err) => {
      this.loading = false;
      switch (err.message) {
        case "There is no user record corresponding to this identifier. The user may have been deleted." : 
          this.snackbarService.openSnackBar("Lỗi không tồn tại người dùng này", "Đóng", 5000)
        case "The email address is badly formatted.": 
          this.snackbarService.openSnackBar("Lỗi email không đúng định dạng", "Đóng", 5000)
        case "The password is invalid or the user does not have a password.": 
          this.snackbarService.openSnackBar("Lỗi mật khẩu không đúng hoặc chưa nhập mật khẩu", "Đóng", 5000)
        case "A network error (such as timeout, interrupted connection or unreachable host) has occurred.":
          this.snackbarService.openSnackBar("Lỗi không truy cập được mạng, đang tự động refesh lại trang", "Đóng", 5000);
          this.router.navigate(['/login'])
        default:
          this.snackbarService.openSnackBar(err.message, "Đóng", 5000);
      }
    });
  }

  load(value?) {
    this.loading = !this.loading;
    if (value) this.loading = value
  }

}
