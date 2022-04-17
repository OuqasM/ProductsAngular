import { Component, OnInit, Output ,EventEmitter } from '@angular/core';
import { ActionEvent, ActionEventType } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-navbar',
  templateUrl: './product-navbar.component.html',
  styleUrls: ['./product-navbar.component.css']
})
export class ProductNavbarComponent implements OnInit {

  @Output()
getAllEvent : EventEmitter<ActionEvent> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onGetAllProduct(){
    this.getAllEvent.emit({type :ActionEventType.ALL, data: null})
  }
  onSelectedProduct(){
    this.getAllEvent.emit({type :ActionEventType.SELECTED, data: null})

  }
  onAvailableProduct(){
    this.getAllEvent.emit({type :ActionEventType.AVAILABLE, data: null})
  }
  newproduct(){
    this.getAllEvent.emit({type :ActionEventType.NEW, data: null})
  }
  
  onSearsh(keyword : any){
    this.getAllEvent.emit({type :ActionEventType.SEARCH, data: keyword})

  }


}
