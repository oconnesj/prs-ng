import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  title: string ="User-List";
  // user will hold our list of user from the back end 
  // will be one way bound on our html to provide a table view of users 
  users: User[] = [];
  user: User = null;

  constructor(private userSvc: UserService,
    private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;
    // call our user service to populate the list of users 
    this.userSvc.list().subscribe(
      jr => {
        this.users = jr.data as User[];
      console.log("List of users",this.users);
      }
    
    );
  }

}

