import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product.class';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css']
})

export class LineItemEditComponent implements OnInit {
  title: string = "Line-Item-Edit";
  submitBtnTitle: string = "Change";
  products: Product[] = [];

  lineItem: LineItem = new LineItem();
  lineItemId: number = 0;

  constructor(  
    private router: Router, 
    private route: ActivatedRoute,
    private lineItemSvc: LineItemService, 
    private productSvc: ProductService,
    ) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(parms => this.lineItemId = parms["id"]);
    this.lineItemSvc.get(this.lineItemId).subscribe(jr => {
      this.lineItem = jr.data as LineItem;

    });
    
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
    });
  }

  save() {
    this.lineItemSvc.edit(this.lineItem).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/request/lines/" + this.lineItem.request.id);
      }
      else {
        console.log("*** Error editing line item.", this.lineItem, jr.errors);
      }
    });
  }

  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }


}