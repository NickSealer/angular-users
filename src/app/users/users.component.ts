import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  users: any = [];
  user: any = null;
  newUser: any = null;

  constructor(
    private usersService: UsersService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users = [];
    this.usersService.list().subscribe(res => {
      this.users = res;
    }, e => { console.log(e) })
  }

  getUser(id: string) {
    this.user = [];
    this.usersService.show(id).subscribe(res => {
      this.user = res;
    }, e => { console.log(e) })
  }

  deleteUser(id: string) {
    if (window.confirm('Are you sure to delete ' + this.user.name + ' user?')) {
      this.usersService.delete(id).subscribe(res => {
        this.user = null;
        this.getUsers();
        this.toastrService.success('', 'User delete');
      }, e => { console.log(e) })
    }
  }

  createUser() {
    this.usersService.store(this.newUser).subscribe(res => {
      this.user = res;
      this.newUser = null;
      this.toastrService.success('', 'User created');
    }, e => {
      let errorMessage = '';
      Object.entries(e.error.errors).forEach(function (error) {
        errorMessage += '<br>' + error[1];
      });
      this.toastrService.error(errorMessage, e.error.message, {
        enableHtml: true
      });
    })
  }

  updateUser(user) {
    this.usersService.update(this.user).subscribe(res => {
      this.user = res;
      this.user = null;
      this.getUsers();
      this.toastrService.success('', 'User updated: ' + user.name);
    }, e => {
      let errorMessage = '';
      Object.entries(e.error.errors).forEach(function (error) {
        errorMessage += '<br>' + error[1];
      });
      this.toastrService.error(errorMessage, e.error.message, {
        enableHtml: true
      });
    })
  }

}
