import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentForm: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder) { 
    this.paymentForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required]],
      cVv: ['', [Validators.required, Validators.length]],
      expirationDate: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    
  }

  processPayment() {
    console.log(this.paymentForm?.value);
  }

}
