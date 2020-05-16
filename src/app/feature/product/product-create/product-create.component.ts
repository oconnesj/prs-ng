import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']

})

export class ProductCreateComponent implements OnInit {
  title: string = "Product Create";
  product: Product = new Product();
  submitBtnTitle: string = "Create";

  vendors: Vendor[] = [];

  constructor(private productSvc: ProductService, 
    private router: Router,
    private vendorSvc: VendorService,
    ) { }

 
    ngOnInit(): void {
      this.vendorSvc.list().subscribe((jr) => {
        this.vendors = jr.data as Vendor[];
      });
  
    }

    save(){
      this.productSvc.create(this.product).subscribe(jr => {
        // if jr.erros is null, save was successful
        if (jr.errors==null){
          //sucess
          this.router.navigateByUrl("/product/list");
        }
        else {
          console.log("***Error creating new product:", this.product), jr.errors;
        }
         
  
      }
  
      );
  
  
    }
  
  }
  