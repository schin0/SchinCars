import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CarService } from '../shared/car.service';

@Component({
  selector: 'app-novo-carro',
  templateUrl: './novo-carro.component.html',
  styleUrls: ['./novo-carro.component.scss']
})
export class NovoCarroComponent implements OnInit {

  selectedFile: any;
  currentFileUpload: any;
  siglas: Array<any> = [];
  cidades: Array<any> = [];

  rating: number = 3;
  starCount: number = 5;
  ratingArr: Array<number> = [];

  novoCarro = new FormGroup({
    nome: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    cidade: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
    contato: new FormControl('', Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private _http: HttpClient,
    public dialogRef: MatDialogRef<NovoCarroComponent>,
    private _carService: CarService,
  ) { }

  ngOnInit(): void {
    this.siglas = this.data.siglas;
    
    for(let index = 0; index < this.starCount; index++){
      this.ratingArr.push(index);
    }
  }

  onClick(rating: number) {
    this.rating = rating;
    return false;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onFileSelect(e: any) {
    if (e.target.files && e.target.files[0]) {
      this.currentFileUpload = e.target.files[0];
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = (ev) => {
        if (ev.target) {
          this.selectedFile = ev.target.result;
        }
      }
    }
  }

  buscaCidade(estado: any) {
    this.cidades = [];
    this._http.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado.sigla}/distritos`)
    .subscribe((cidades: any) => {
      cidades = cidades.sort((a: any, b: any) => (a.nome > b.nome) ? 1 : -1)
      cidades.forEach((cidade: any) => {
        this.cidades.push(cidade.nome);
      });
    });
  }

  salvarCarro(){
    const avaliacao = {
      nome: this.novoCarro.value.nome,
      estado: this.novoCarro.value.estado,
      cidade: this.novoCarro.value.cidade,
      descricao: this.novoCarro.value.descricao,
      valor: this.novoCarro.value.valor,
      contato: this.novoCarro.value.contato,
      autorCarro: this.data.usuario,
      criadoEm: new Date(),
      estrelas: this.rating
    }

    if (this.selectedFile) {
      this._carService.pushFileToStorage(avaliacao, this.currentFileUpload);
    } else {
      alert('Parece que não foi inserido nenhum arquivo de imagem.');
    }

    this.dialogRef.close();
  }

}
