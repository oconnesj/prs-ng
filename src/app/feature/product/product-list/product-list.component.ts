import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';

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

  constructor(private productSvc: ProductService) { }

  ngOnInit(): void {
    // call our product service to populate the list of products 
    this.productSvc.list().subscribe(
      jr => {
        this.products = jr.data as Product[];
      console.log("List of products",this.products);
      }
    
    );
  }

}

