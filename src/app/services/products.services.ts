import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../model/products.model";

@Injectable({providedIn: "root"})
export class Productservice {

    host = environment.host;  

    constructor (private http:HttpClient){

    }

    getAllProducts():Observable<Product[]>{
        return this.http.get<Product[]>(this.host+"/products");
    }
    getOneProduct(id:number):Observable<Product>{
        return this.http.get<Product>(this.host+"/products/"+id);
    }
    getSelectedProducts():Observable<Product[]>{
        return this.http.get<Product[]>(this.host+"/products?selected=true");
    }
    getAvlaibaleProducts():Observable<Product[]>{
        return this.http.get<Product[]>(this.host+"/products?available=true");
    }
    getSearchedProducts(value : string):Observable<Product[]>{

        return this.http.get<Product[]>(this.host+"/products?name_like="+value);
    }
    
    editProduct(p : Product):Observable<Product>{
        p.selected = !p.selected;
        return this.http.put<Product>(this.host+"/products/"+p.id,p);
    }
    
    
    selectProduct(p : Product):Observable<Product>{
        p.selected = !p.selected;
        return this.http.put<Product>(this.host+"/products/"+p.id,p);
    }

    deleteProduct(id : number):Observable<void>{
        return this.http.delete<void>(this.host+"/products/"+id);
    }

    addProduct(product : Product):Observable<Product>{
        return this.http.post<Product>(this.host+"/products",product);
    }

    updateProduct(p : Product):Observable<Product>{
        return this.http.put<Product>(this.host+"/products/"+p.id,p);
    }

}