import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Productservice } from 'src/app/services/products.services';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productformgroup !: FormGroup;
  submited : boolean = false;
  constructor(private productService:Productservice,private fb : FormBuilder) {
    this.productformgroup = this.fb.group({
      name : ["",Validators.required],
      price : [0,Validators.required],
      quantity : [0,Validators.required],
      selected : [true,Validators.required],
      available : [true,Validators.required]
    })
   }

  ngOnInit(): void {
  }

  addproduct(){
    this.submited = true;
    if(this.productformgroup.invalid) return;
   this.productService.addProduct(this.productformgroup.value).subscribe(data => {
    console.log(data)
  })

  }
}
