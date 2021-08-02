import { NovoCarroComponent } from './../novo-carro/novo-carro.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarroComponent } from '../carro/carro.component';
import { CarService } from '../shared/car.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.scss']
})
export class CarrosComponent implements OnInit {


  toSearch: any = '';
  siglas: Array<any> = [];

  carros: Array<any> = [];

  usuarioLogado: any;

  constructor(
    private _http: HttpClient, private dialog: MatDialog,
    private _carService: CarService,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.listarCarros();
    
    this._authService.user$
    .subscribe(userInfos => {
      this.usuarioLogado = userInfos;
    });

    this._http.get('https://servicodados.ibge.gov.br/api/v1/localidades/regioes/1|2|3|4|5/estados').subscribe((res: any) => {
      let estados = res;
      estados = estados.sort((a: any, b: any) => (a.nome > b.nome) ? 1 : -1);
      estados.forEach((estado: any) => {
        this.siglas.push({
          nome: estado.nome,
          sigla: estado.sigla
        })
      })
    })
  }

  async listarCarros() {
    await this._carService.listarCarros()
    .subscribe(rests => {
      this.carros = rests.map(rest => rest);
      this.carros = this.carros.sort((a, b) => b.criadoEm.seconds - a.criadoEm.seconds);
    });
  }

  novoCarro(){
    this.dialog.open(NovoCarroComponent, {
      width: '80%',
      height: 'max-content',
      data: {
        usuario: this.usuarioLogado,
        siglas: this.siglas
      }
    });
  }

  sair() {
    this._authService.sair();
  }

  abrirCarro(carro: any) {
    this.dialog.open(CarroComponent, {
      width: "80%",
      height: "98vh",
      data: carro,
      panelClass: "custom-dialog-container"
    })
  }

}
