import { SaleService } from './../services/sale.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any;
  constructor(private saleS: SaleService) {
    this.products = [{ name: 'x' }, { name: 'y' }, { name: 'z' }];
    console.log(this.products);
    this.saleS
      .getSale()
      .subscribe(data => this.products = data.price, err => console.error(err));
  }

  ngOnInit() {}
}
