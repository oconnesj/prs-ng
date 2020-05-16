import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User = new User();
  title: string = 'User-Detail';
  userId: number = 0;
 

  constructor(private userSvc: UserService,
  
    
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get the id from the route
    this.route.params.subscribe(parms => this.userId = parms['id']);

    //get the user for that user
    this.userSvc.get(this.userId).subscribe(jr => {
      this.user = jr.data as User;
      console.log("User Found!", this.user);
    });


  }
  create(){
    this.userSvc.edit(this.user).subscribe(jr => {
      if (jr.errors==null){
        this.router.navigateByUrl("/user/list");
        //do nothing.. success
      }
      else{
        console.log("*** Error editing user: ",this.user,jr.errors);
      alert( "Error creating User. Try Again.");

      }
    });
    
  }
}
