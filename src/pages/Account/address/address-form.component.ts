import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'address-form',
    templateUrl: 'address-form.component.html'
})
export class AddressFormComponent
{
    private addressForm : FormGroup;

  constructor( private formBuilder: FormBuilder ) {
    this.addressForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });
  }
  
  logForm(){
    console.log(this.addressForm.value)
  }
}