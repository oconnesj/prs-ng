import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product.class';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css']
})

export class LineItemEditComponent implements OnInit {
  title: string = "Line-Item-Edit";
  submitBtnTitle: string = "Change";
  products: Product[] = [];
  user: User = null;
  lineItem: LineItem = new LineItem();
  lineItemId: number = 0;


  constructor(  
    private router: Router, 
    private route: ActivatedRoute,
    private lineItemSvc: LineItemService, 
    private productSvc: ProductService,
    private sysSvc: SystemService,

    ) { }
  
  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.user = this.sysSvc.loggedInUser;

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
        this.router.navigateByUrl("/request/request-lines/" + this.lineItem.request.id);
      }
      else {
        console.log("***Error editing line item.", this.lineItem, jr.errors);
      }
    });
  }


  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }


}