import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private modalService: NgbModal,
    private userService: UserService
  ) { }

  formUserid: '';

  showLogin(form) {

    this.modalService.open(form).result.then((result) => {
        this.userService.login(this.formUserid);
        this.formUserid = '';
      }, (reason) => {
        this.formUserid = '';
      }
    );
  }

  logout() {
    this.userService.logout();
  }

}
