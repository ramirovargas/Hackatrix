import { Offer } from './models/offer';
import { Sale } from './models/sale';
import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name: string;
  price: number;
  sale: Sale;
  myActualOffer: Offer;

  itemsCollection: AngularFirestoreCollection<any>;
  sales: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.sales = db.collection('Sale').valueChanges();
    this.itemsCollection = db.collection<any>('Sale');
  }

  ngOnInit() {}

  isAValidTender() {}

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
