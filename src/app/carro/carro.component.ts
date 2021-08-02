import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';
import { CarService } from '../shared/car.service';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.scss']
})
export class CarroComponent implements OnInit {

  usuarioLogado: any;

  mediaGeral: Array<any> = [];

  ratingArr: Array<number> = [];
  rating: number = 5;
  starCount: number = 5;

  usuario_rating: number = 3;
  usuario_ratingArr: Array<number> = [];
  comentarios_usuarios_ratingArr: Array<number> = [];

  comentario_usuario: any;
  comentarios_usuarios: Array<any> = [];

  constructor(
    public dialogRef: MatDialogRef<CarroComponent>,
    @Inject(MAT_DIALOG_DATA) public carro: any,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _carService: CarService,
    public _authService: AuthService,
  ) { }

  ngOnInit(): void {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }

    for (let index = 0; index < this.starCount; index++) {
      this.usuario_ratingArr.push(index);
    }

    for (let index = 0; index < this.starCount; index++) {
      this.comentarios_usuarios_ratingArr.push(index);
    }

    this._authService.user$
    .subscribe(userInfos => {
      this.usuarioLogado = userInfos;
    });

    this.listarComentarios(this.carro.estrelas);
  }

  showIcon(contagem: number, index: number) {
    if (contagem >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onClick(rating: number) {
    this.usuario_rating = rating;
    return false;
  }

  enviarComentario() {
    this._carService
    .criaComentarioDousuario(this.carro.id, this.usuarioLogado.uid, {
      comentario: this.comentario_usuario,
      estrelas: this.usuario_rating,
      comentadoEm: new Date(),
      autor: {
        nome: this.usuarioLogado.displayName,
        foto: this.usuarioLogado.photoURL,
        uid: this.usuarioLogado.uid
      }
    }).then(() => this.comentario_usuario = '');
  }

  listarComentarios(param: number) {
    this.mediaGeral = [];
    this._carService.listaComentariosDoCarro(this.carro.id)
    .subscribe(comentarios => {
      this.comentarios_usuarios = comentarios.map(comentario => comentario);
      comentarios.forEach(comentario => {
        return this.mediaGeral.push(comentario.estrelas);
      });
      this.mediaGeral.push(param);
      const sum = this.mediaGeral.reduce((a: number, b: number) => a + b, 0);
      const toDisplay = Math.round(sum / this.mediaGeral.length);
      return this.rating = toDisplay;
    });
  }

  excluirComentario(comentario: any) {
    if (window.confirm('Deseja mesmo excluir esse comentário?')) {
      this._carService.excluirComentario(this.carro.id, comentario.autor.uid);
      this.snackBar.open('Comentário excluido com sucesso.', 'X', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 5000
      })
    }
  }

  formataData(seconds: number) {
    const data = new Date(seconds * 1000).toLocaleDateString();
    const horario = new Date(seconds * 1000).toLocaleTimeString();
    
    return `${data} às ${horario}`;
  }
}
