<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title> Carrito </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-margin">
      <ion-grid class="ion-grid-width-sm">
        <ion-row>
          <ion-col>Producto</ion-col>
          <ion-col>Precio</ion-col>
          <ion-col>Cantidad</ion-col>
          <ion-col>Subtotal</ion-col>
          <ion-col></ion-col>
        </ion-row>
        <ion-row class="tabla" v-for="(producto, index) in carrito" :key="index">
          <ion-col><ion-img :src="producto.photo"></ion-img></ion-col>
          <ion-col>{{ producto.price }} €</ion-col>
          <ion-col
            ><ion-input
              type="number"
              v-model="producto.quantity"
              @change="editarCantidad(producto)"
            ></ion-input
          ></ion-col>
          <ion-col>{{ subtotal(producto) }} €</ion-col>
          <ion-col
            ><ion-button
              color="primary"
              size="small"
              @click="deleteProd(producto)"
              >Delete</ion-button
            ></ion-col
          >
        </ion-row>
      </ion-grid>

      <h3 class="total">Total {{ total() }} €</h3>

      <div>
        <ion-button
          class="p2"
          expand="block"
          color="danger"
          syze="small"
          @click="presentConfirm"
        >
          Procesar</ion-button
        >
      </div>
      <div>
        <ion-button expand="full" color="success" syze="small" @click="volver">
          Volver</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { useRouter } from "vue-router";
import apiService from "../apiService";
import { alertController } from "@ionic/core";

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonImg,
  IonInput,
} from "@ionic/vue";
/*import router from '@/router';*/

export default {
  name: "carrito",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonImg,
    IonInput,
  },

  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      carrito: JSON.parse(localStorage.getItem("carritoCompras")),
      date: new Date(),
    };
  },

  methods: {
    alertIonic(message) {
      return alertController
        .create({
          header: "Alert",
          subHeader: "Informacion",
          message: message,
          buttons: ["OK"],
        })
        .then((a) => a.present())
    },

    presentConfirm() {
      const alert = this.alertCtrl.create({
        title: "Confirma",
        message: "Estas Seguro de querer continuar?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            },
          },
          {
            text: "Buy",
            handler: () => {
              console.log("Buy clicked");
              this.addOrder();
            },
          },
        ],
      });
      alert.present();
    },

    dellAll() {
      localStorage.removeItem("carritoCompras");
    },
    subtotal(producto) {
      return producto.price * producto.quantity;
    },
    total() {
      let suma = 0;
      this.carrito.forEach((element) => {
        suma += element.price * element.quantity;
      });

      return suma;
    },

    editarCantidad(producto) {
      const carritoIndepe = this.carrito;
      const indexProd = carritoIndepe.findIndex(
        (element) => element.id == producto.id
      );
      carritoIndepe.splice(indexProd, 1, producto);

      localStorage.removeItem("carritoCompras");
      localStorage.setItem("carritoCompras", JSON.stringify(carritoIndepe));
    },

    deleteProd(producto) {
      const carritoIndepe = this.carrito;
      const indexProd = carritoIndepe.findIndex(
        (element) => element.id == producto.id
      );
      carritoIndepe.splice(indexProd, 1);

      localStorage.removeItem("carritoCompras");
      localStorage.setItem("carritoCompras", JSON.stringify(carritoIndepe));
    },

    volver() {
      this.$router.push("/productos");
    },

    addOrder() {
      if (localStorage.getItem("access_token")) {
        if (localStorage.getItem("carritoCompras")) {
          const order = {
            state: "1",
            address: localStorage.getItem("userAddress"),
            user_id: localStorage.getItem("userID"),
          };

          apiService.ordersApi
            .create(order)
            .then((response) => {
              const productos = JSON.parse(
                localStorage.getItem("carritoCompras")
              );

              productos.forEach((element) => {
                const orderLine = {
                  quantity: element.quantity,
                  price: element.price,
                  discount: 0,
                  product_id: element.id,
                  order_id: response.data.id,
                };

                apiService.ordersLineApi
                  .create(orderLine)
                  .then(() => {this.alertIonic("todoBien")})
                  .catch((response) => this.alertIonic(response.message));

                this.$router.push("/productos");
              });
            })
            .catch((response) => this.alertIonic(response.message));
        }
      } else {
        this.$router.push("/login");
      }

      return;
    },
  },
};
</script>
<style>
.icon-big {
  display: block;
  color: white;
  margin-bottom: 5px;
}
.total {
  text-align: right;
}



</style>