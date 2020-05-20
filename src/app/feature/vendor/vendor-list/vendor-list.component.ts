import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  title: string ="Vendor-List";
  // vendor will hold our list of vendor from the back end 
  // will be one way bound on our html to provide a table view of vendors 
  vendors: Vendor[] = [];
  user: User = null;

  constructor(private vendorSvc: VendorService,
    private sysSvc: SystemService) { 
    
  }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;
    // call our vendor service to populate the list of vendors 
    this.vendorSvc.list().subscribe(
      jr => {
        this.vendors = jr.data as Vendor[];
      console.log("List of vendors",this.vendors);
      }
    
    );
  }

}
