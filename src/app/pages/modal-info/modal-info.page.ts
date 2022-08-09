/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit {

  // @Input() imgen: string;
  @Input() nombre: string;
  @Input() precio: string;

  constructor(
    private modalController: ModalController,
    public alertController: AlertController
  ) {

  }

  ngOnInit() {
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
  guardarModal() {
    //const img = (<HTMLInputElement>document.getElementById('txtimg')).value;
    const name = (<HTMLInputElement>document.getElementById('txtnombre')).value;
    const country = (<HTMLInputElement>document.getElementById('txtprecio')).value;
    if (name == '') {
      /*alert("!Por favor escriba un nombre¡");*/
      this.Alertas();

    } else if (country == '') {
      this.Alertas();
    } else {
      this.modalController.dismiss({
        //imagen: img,
        nombre: name,
        precio: country,
      });
      this.exito();
    }

  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  async Alertas() {
    const alert = await this.alertController.create({
      header: '¡Alerta!',
      subHeader: 'Campos Vacios',
      message: 'Llene todos los campos',
      buttons: ['Aceptar']
    });

    await alert.present();
  }
  async exito() {
    const alert = await this.alertController.create({
      header: '¡Exito!',
      message: 'Producto guardado exitosamente',
      buttons: ['Ok']
    });

    await alert.present();
  }

}
