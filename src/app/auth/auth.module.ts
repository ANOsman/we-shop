import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { MatButtonModule } from '@angular/material/button'


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
