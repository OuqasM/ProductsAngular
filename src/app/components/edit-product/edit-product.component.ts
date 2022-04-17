import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Productservice } from 'src/app/services/products.services';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productformgroup !: FormGroup
  submited : boolean=false
  productId : number
  constructor(private ps:Productservice,private activatedRoute:ActivatedRoute, private fb:FormBuilder) {
    this.productId = activatedRoute.snapshot.params.id;
   }

  ngOnInit(): void {
    
    this.ps.getOneProduct(this.productId).subscribe(data => {
      this.productformgroup =  this.fb.group({
        id : [data.id,Validators.required],
        name : [data.name,Validators.required],
        price : [data.price,Validators.required],
        quantity : [data.quantity,Validators.required],
        selected : [data.selected,Validators.required],
        available : [data.available,Validators.required]

      });
      
    })
  }


  updateproduct(){
    this.submited = true;
    if(this.productformgroup.invalid) return;
     this.ps.updateProduct(this.productformgroup.value).subscribe(data => {
      console.log(data)
  })
  console.log("1122")
  }

}
