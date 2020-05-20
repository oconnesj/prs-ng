import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { RequestService } from 'src/app/service/request.service';
import { Request } from 'src/app/model/request.class';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit {
  request: Request = new Request();
  title: string = 'Request-Edit';
  requestId: number = 0;
  users: User[] = []
  user: User = null;
  
  constructor(private requestSvc: RequestService,
    private userSvc: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;
    // get the id from the route
    this.route.params.subscribe(parms => this.requestId = parms['id']);

    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
      console.log("Request Found!", this.request);
    });

    this.userSvc.list().subscribe((jr) => {
      this.users = jr.data as User[];
    });


  
  }
  save(){
    this.requestSvc.edit(this.request).subscribe(jr => {
      if (jr.errors==null){
        this.router.navigateByUrl("/request/list");
        //do nothing.. success
      }
      else{
        console.log("*** Error editing request: ",this.request,jr.errors);
      alert( "Error creating Request. Try Again.");

      }
    });
    
  }
  compUser(a: User, b: User): boolean {
    return a && b && a.id === b.id;
  }

}