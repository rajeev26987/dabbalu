import { Component } from "@angular/core";

@Component({
    selector: 'user-addresses',
    templateUrl: 'addresses.component.html'
})
export class AddressesComponent
{
    isEditClicked: boolean = false;
    
    constructor() {
    }

    dismiss(){

    }

    editAddress(){
        this.isEditClicked = true;
    }
}