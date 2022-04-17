import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/products.model';
import { ActionEvent, ActionEventType } from 'src/app/state/product.state';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.css']
})
export class OneProductComponent implements OnInit {

  @Input()
  product !: Product;
  @Output()
  eventemiter : EventEmitter<ActionEvent> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  selectProduct(product : Product){
    this.eventemiter.emit({type :ActionEventType.SELECT, data: product})
  } 
  dropProduct(productId : number){
    this.eventemiter.emit({type :ActionEventType.DELETE, data: productId})
    
  }
  editProduct(productId : number){
    this.eventemiter.emit({type :ActionEventType.EDIT, data: productId})
    
  }

}
