import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  title: string ="Request-List";
  // request will hold our list of request from the back end 
  // will be one way bound on our html to provide a table view of requests 
  requests: Request[] = [];

  constructor(private requestSvc: RequestService) { }

  ngOnInit(): void {
    // call our request service to populate the list of requests 
    this.requestSvc.list().subscribe(
      jr => {
        this.requests = jr.data as Request[];
      console.log("List of requests",this.requests);
      }
    
    );
  }

}

