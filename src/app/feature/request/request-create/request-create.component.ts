import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { RequestService } from 'src/app/service/request.service';
import { Request } from 'src/app/model/request.class';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css'],
})
export class RequestCreateComponent implements OnInit {
  title: string = 'Request Create';
  request: Request = new Request();
  submitBtnTitle: string = 'Create';

  user: User = null;

  constructor(
    private requestSvc: RequestService,
    private sysSvc: SystemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;
    console.log(this.user);
  }

  save() {
    this.request.user = this.user;
    this.requestSvc.create(this.request).subscribe((jr) => {
      // if jr.erros is null, save was successful
      if (jr.errors == null) {
        //sucess
        this.router.navigateByUrl('/request/list');
      } else {
        console.log('***Error creating new request:', this.request), jr.errors;
      }
    });
  }
 
  
}
