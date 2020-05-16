import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product = new Product();
  title: string = 'Product-Detail';
  productId: number = 0;
  vendors: Vendor[] = []

  constructor(private productSvc: ProductService,
    private vendorSvc: VendorService,

    
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get the id from the route
    this.route.params.subscribe(parms => this.productId = parms['id']);

    //get the product for that product
    this.productSvc.get(this.productId).subscribe(jr => {
      this.product = jr.data as Product;
      console.log("Product Found!", this.product);
    });

    this.vendorSvc.list().subscribe((jr) => {
      this.vendors = jr.data as Vendor[];
    });


  }
  create(){
    this.productSvc.edit(this.product).subscribe(jr => {
      if (jr.errors==null){
        this.router.navigateByUrl("/product/list");
        //do nothing.. success
      }
      else{
        console.log("*** Error editing product: ",this.product,jr.errors);
      alert( "Error creating Product. Try Again.");

      }
    });
    
  }
  compVendor(a: Vendor, b: Vendor): boolean {
    return a && b && a.id === b.id;
  }

}
