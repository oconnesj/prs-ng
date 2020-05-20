import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css'],
})
export class VendorCreateComponent implements OnInit {
  title: string = 'Vendor-Create';
  vendor: Vendor = new Vendor();
  submitBtnTitle: string = 'Create';
  user: User = null;

  
  constructor(private vendorSvc: VendorService, 
    private router: Router,
    private sysSvc: SystemService) {}

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;

  }

  save() {
    this.vendorSvc.create(this.vendor).subscribe((jr) => {
      // if jr.erros is null, save was successful
      if (jr.errors == null) {
        //sucess
        this.router.navigateByUrl('/vendor/list');
      } else {
        console.log('***Error creating new vendor:', this.vendor), jr.errors;
      }
    });
  }
}
