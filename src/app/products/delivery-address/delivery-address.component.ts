import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.css']
})
export class DeliveryAddressComponent implements OnInit {

  addressForm: FormGroup | undefined

  constructor(
    private formBuilder: FormBuilder,
    private router: Router) { 
    this.addressForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  processForm() {
    console.log(`First name: ${this.addressForm?.get('firstName')?.value}`)
    console.log(`City: ${this.addressForm?.value.city}`);
    this.router.navigateByUrl('/payment')
  }

}
