import { FiltroCarPipe } from './shared/filtro-car.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from "@angular/fire/storage";

// Requisições HttpClient
import { HttpClientModule } from '@angular/common/http';

// material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Componentes
import { environment } from 'src/environments/environment.prod';

//Tradução
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { LoginPageComponent } from './login-page/login-page.component';
import { NovoCarroComponent } from './novo-carro/novo-carro.component';
import { CarroComponent } from './carro/carro.component';
import { CarrosComponent } from './carros/carros.component';

registerLocaleData(localeBr, 'pt')

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    FiltroCarPipe,
    NovoCarroComponent,
    CarroComponent,
    CarrosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // Firebase
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),

    //Forms
    ReactiveFormsModule,
    FormsModule,

    // material
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }