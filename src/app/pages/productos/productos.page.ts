/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable eqeqeq */
/* eslint-disable no-var */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

import { ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { ModalInfoPage } from '../modal-info/modal-info.page';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],

})
export class ProductosPage implements OnInit {


  @ViewChild(IonModal) modal: IonModal;

  public producto: any = [{
    id: '1',
    nombre: 'Blusa',
    precio: ' 5'
  }];
  public nuevousuario = { id: '0', nombre: '', precio: '' };
  constructor(
    public modalController: ModalController,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public Controller: ActionSheetController,
    public alertController: AlertController,

  ) { }

  ngOnInit() {
  }
  eliminar(indice) {
    this.mensaje(indice);
    this.producto.splice(indice, 1);
  }

  async abrirModal(pro) {
    const modal = await this.modalController.create({
      component: ModalInfoPage,
      componentProps: {
        //imagen: pro.imagen,
        nombre: pro.nombre,
        precio: pro.precio,

      }
    });

    await modal.present();
    //recuperar informacion del modal
    var { data } = await modal.onWillDismiss();
    if (data != undefined) {
      if (pro.id == 0) {
        data.id = new Date().getTime();
        this.producto.push(data);
      } else {
        //pro.imagen = data.imagen;
        pro.nombre = data.nombre;
        pro.precio = data.precio;
      }

      console.log(data);
    }
  }
  async mensaje(indice) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: '¿Está seguro que quiere eliminar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.producto.splice(indice, 1);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  //--------------------------------------------------------------------------------------------
  async mostrarOpciones(titulo) {
    const actionSheet = await this.Controller.create({
      header: titulo,
      backdropDismiss: false,
      cssClass: 'my-custom-class',

      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.eliminar('');
          console.log('Delete clicked');
        }
      }, {
        text: 'Editar',
        icon: 'pencil',
        handler: () => {
          this.abrirModal('');
          console.log('Editar clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
