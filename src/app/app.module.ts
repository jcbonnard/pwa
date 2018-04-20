import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { 
  MatToolbarModule,
  MatCardModule,
  MatButtonModule 
} from '@angular/material';

import { AppComponent } from './app.component';
import { ImgCardComponent } from './img-card/img-card.component';

// Import the package's module
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    AppComponent,
    ImgCardComponent
  ],
  imports: [
    BrowserModule,
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    // ZXing scanner module
    ZXingScannerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
