import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title: string ="Product-List";
  // product will hold our list of product from the back end 
  // will be one way bound on our html to provide a table view of products 
  products: Product[] = [];
  user: User = null;
  constructor(private productSvc: ProductService,
    private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;
    // call our product service to populate the list of products 
    this.productSvc.list().subscribe(
      jr => {
        this.products = jr.data as Product[];
      console.log("List of products",this.products);
      }
    
    );
  }

}

