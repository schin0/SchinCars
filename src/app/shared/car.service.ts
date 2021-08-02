import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private basePath = '/carros';

  constructor(
    private _fireStore: AngularFirestore,
    private _fireStorage: AngularFireStorage
  ) { }

  criaCarro(avaliacao: any, fileUpload: any) {
    const carros = this._fireStore.collection('carros');
    carros.add({...avaliacao, downloadUrl: fileUpload}).then(doc => doc.update({ id: doc.id }));
  }

  listarCarros() {
    return this._fireStore.collection('carros').valueChanges();
  }

  pushFileToStorage(avaliacao: any, fileUpload: any) {
    const filePath = `${this.basePath}/${fileUpload.name}_${avaliacao.nome}_${new Date()}`;
    const storageRef = this._fireStorage.ref(filePath);
    const uploadTask = this._fireStorage.upload(filePath, fileUpload);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          this.criaCarro(avaliacao, fileUpload.url);
        });
      })
    ).subscribe();
  }

  criaComentarioDousuario(idCarro: string, idUsuario: string, avaliacao: object) {
    return this._fireStore.collection('carros')
    .doc(idCarro).collection('avaliações').doc(idUsuario).set(avaliacao);
  }

  listaComentariosDoCarro(idCarro: string) {
    return this._fireStore.collection('carros')
    .doc(idCarro).collection('avaliações').valueChanges();
  }

  excluirComentario(idCarro: string, idUsuario: string) {
    return this._fireStore.collection('carros')
    .doc(idCarro).collection('avaliações').doc(idUsuario).delete();
  }

}
