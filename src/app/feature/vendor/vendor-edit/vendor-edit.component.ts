import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {
  vendor: Vendor = new Vendor();
  title: string = 'Vendor-Detail';
  vendorId: number = 0;
 

  constructor(private vendorSvc: VendorService,
  
    
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get the id from the route
    this.route.params.subscribe(parms => this.vendorId = parms['id']);

    //get the vendor for that vendor
    this.vendorSvc.get(this.vendorId).subscribe(jr => {
      this.vendor = jr.data as Vendor;
      console.log("Vendor Found!", this.vendor);
    });


  }
  create(){
    this.vendorSvc.edit(this.vendor).subscribe(jr => {
      if (jr.errors==null){
        this.router.navigateByUrl("/vendor/list");
        //do nothing.. success
      }
      else{
        console.log("*** Error editing vendor: ",this.vendor,jr.errors);
      alert( "Error creating Vendor. Try Again.");

      }
    });
    
  }
}
