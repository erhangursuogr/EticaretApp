
import { importProvidersFrom } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { NgxSpinnerModule } from "ngx-spinner";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/router";
// import {enableProdMode} from '@angular/core';
// enableProdMode();

bootstrapApplication(AppComponent,{
    providers: [
      provideHttpClient(),
      importProvidersFrom(
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        ToastrModule.forRoot({
          timeOut: 2000,
          closeButton: true,
          progressBar: true,
          // positionClass: 'toast-top-right',
          // preventDuplicates: true,
          // progressAnimation: 'increasing',
          // tapToDismiss: true,
          // newestOnTop: true,
          // enableHtml: true,
          // easing: 'ease-in',
        }),
        NgxSpinnerModule.forRoot({
          
        }),
        RouterModule.forRoot(routes)
      ),
    ],
    
})