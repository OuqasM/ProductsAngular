import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/products.model';
import { ActionEvent, ActionEventType, AppDataState, DataStateEnum } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input()
  showedproducts$:Observable<AppDataState<Product[]>>|null = null;
  @Output()
  productEvent: EventEmitter<ActionEvent>= new EventEmitter<ActionEvent>();
  readonly DataStateEnum = DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }

  selectProduct(product : Product){
    this.productEvent.emit({type :ActionEventType.SELECT, data: product})
  } 
  dropProduct(productId : number){
    this.productEvent.emit({type :ActionEventType.DELETE, data: productId})
    
  }
  editProduct(productId : number){
    this.productEvent.emit({type :ActionEventType.EDIT, data: productId})
    
  }

  Action($event : ActionEvent){
    switch ($event.type) { 
      case ActionEventType.DELETE : this.dropProduct($event.data); 
          break;
      case ActionEventType.SELECT : this.selectProduct($event.data); 
          break;
      case ActionEventType.EDIT : this.editProduct($event.data); 
          break;    
      default:
          console.log('invalid action type');
  }
}
  
}
