import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css'],
})
export class VendorDetailComponent implements OnInit {
  vendor: Vendor = new Vendor();
  title: string = 'Vendor-Detail';
  vendorId: number = 0;
  user: User = null;


  constructor(
    private vendorSvc: VendorService,
    private sysSvc: SystemService,

    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;
    // get the id from the route
    this.route.params.subscribe((parms) => (this.vendorId = parms['id']));

    //get the vendor for that vendor
    this.vendorSvc.get(this.vendorId).subscribe((jr) => {
      this.vendor = jr.data as Vendor;
      console.log('Vendor Found!', this.vendor);
    });
  }

  delete() {
    this.vendorSvc.delete(this.vendorId).subscribe((jr) => {
      if (jr.errors == null) {
        console.log(jr.data);
        this.router.navigateByUrl('/vendor/list');
      } else {
        console.log('*** Error deleting vendor!', this.vendorId, jr.errors);
      }
    });
  }
}
