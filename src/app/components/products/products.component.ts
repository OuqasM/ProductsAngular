import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/model/products.model';
import { Productservice } from 'src/app/services/products.services';
import { ActionEvent, ActionEventType, AppDataState, DataStateEnum } from 'src/app/state/product.state';
import { map,startWith  , catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  showedproducts$:Observable<AppDataState<Product[]>>|null = null;
  readonly DataStateEnum = DataStateEnum;
  constructor(private productService:Productservice, private router:Router) { }

  ngOnInit(): void {

  }
  onGetAllProduct(){
    
      this.showedproducts$ = this.productService.getAllProducts().pipe(
        map(data => ({dataState : DataStateEnum.LOADED ,data : data})),
        startWith({dataState :DataStateEnum.LOADING}),
        catchError(err =>of({dataState :DataStateEnum.ERROR , errorMessage : err.message}))
      ); 
  }

  onSelectedProduct(){
    // this.productService.getSelectedProducts().subscribe(data =>{
    //   this.showedproducts = data
    // },err => {console.log("erreur ! :"+err)}
    // )

    this.showedproducts$ = this.productService.getSelectedProducts().pipe(
      map(data => ({dataState : DataStateEnum.LOADED ,data : data})),
      startWith({dataState :DataStateEnum.LOADING}),
      catchError(err =>of({dataState :DataStateEnum.ERROR , errorMessage : err.message}))
    );
  }
  onAvailableProduct(){
    // this.productService.getAvlaibaleProducts().subscribe(data =>{
    //   this.showedproducts = data
    // },err => {console.log("erreur ! :"+err)}
    // )

    this.showedproducts$ = this.productService.getAvlaibaleProducts().pipe(
      map(data => ({dataState : DataStateEnum.LOADED ,data : data})),
      startWith({dataState :DataStateEnum.LOADING}),
      catchError(err =>of({dataState :DataStateEnum.ERROR , errorMessage : err.message}))
    );
  }

  onSearsh(formData : any){
    this.showedproducts$ = this.productService.getSearchedProducts(formData.keyword).pipe(
      map(data => ({dataState : DataStateEnum.LOADED ,data : data})),
      startWith({dataState :DataStateEnum.LOADING}),
      catchError(err =>of({dataState :DataStateEnum.ERROR , errorMessage : err.message}))
    );
  }

  selectProduct(product : Product){
    this.productService.selectProduct(product).subscribe(data => {
      product.selected = data.selected;
    });
    //this.onGetAllProduct();
  }

  dropProduct(id : number){
    this.productService.deleteProduct(id).subscribe(data => {
      //this.showedproducts$
      this.onGetAllProduct();
    });
  }
  editProduct(id : number){
    this.router.navigateByUrl('/editproduct/'+id)

  }
  newproduct(){
    this.router.navigateByUrl('/newproduct')
  }

  Action($event : ActionEvent){

    switch ($event.type) {
      case ActionEventType.ALL : this.onGetAllProduct();
          break;
      case ActionEventType.SELECTED : this.onSelectedProduct();
          break;
      case ActionEventType.AVAILABLE : this.onAvailableProduct();
          break;
      case ActionEventType.NEW : this.newproduct(); 
          break;
      case ActionEventType.SEARCH : this.onSearsh($event.data); 
          break;
      case ActionEventType.DELETE : this.dropProduct($event.data); 
          break;
      case ActionEventType.SELECT : this.selectProduct($event.data); 
          break;
      case ActionEventType.EDIT : this.editProduct($event.data); 
          break;    
      default:
          console.log('invalid direction');
  }
  }
  
}
