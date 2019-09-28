import { Sale } from './../models/sale.model';

import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  product: string;
  product_name: string;
  name: string;
  price: number;
  sale: Sale;
  validName = false;

  itemsCollection: AngularFirestoreCollection<any>;
  sales: Observable<any[]>;
  constructor(db: AngularFirestore, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.product = params['id'] + '';
      this.product_name = params['name'] + '';
    });
    this.sales = db.collection(this.product + '_Sale').valueChanges();
    this.itemsCollection = db.collection<any>(this.product + '_Sale');
  }

  ngOnInit() {}

  beginOffer() {
    if (this.name !== '') {
      this.validName = true;
    }
  }

  makeATender(tender) {
    console.log(this.name);
    this.itemsCollection.add({
      name: this.name,
      value: tender
    });

    const tenderParsed = Number(tender);
    if (tenderParsed > this.price || this.price === undefined) {
      this.price = tenderParsed;
    }
  }
}
