import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() {
    const id = localStorage.getItem('UserID');
    if (id && id !== '') {
      this.login(id);
    }
  }

  ID = '';
  isLoggedin = false;

  login(id: string) {
    this.ID = id,
    this.isLoggedin = true;
    localStorage.setItem('UserID', this.ID);
  }

  logout() {
    localStorage.removeItem('UserID');
    this.isLoggedin = false;
    this.ID = '';
  }

}
