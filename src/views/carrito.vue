<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>
          Carrito
        </ion-title>
      </ion-toolbar>
    </ion-header>
    

<ion-content class="ion-margin">
  <ion-grid class="ion-margin">
    <ion-row>
      <ion-col>Product</ion-col>
      <ion-col>Price</ion-col>
      <ion-col>Quantity</ion-col>
      <ion-col>Subtotal</ion-col>
      <ion-col></ion-col>
    </ion-row>
    <ion-row *ngFor="let producto of carrito; index as i">
      <ion-col><ion-img :src="producto.photo"></ion-img></ion-col>
      <ion-col>{{producto.price}}</ion-col>
      <ion-col>{{producto.quantity}}</ion-col>
      <ion-col><ion-button color="danger" syze="small"  @click="dellItemCart(producto.id)"> Añadir</ion-button></ion-col>
    </ion-row>
  </ion-grid>

  <ion-item lines="none">
    <ion-button color="primary" size="small" slot="end" routerLink="/material">
      Material Design Table
    </ion-button>
  </ion-item>
</ion-content>

    

  </ion-page>
</template>

<script>

import { useRouter } from "vue-router";

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
  IonImg

} from "@ionic/vue";
/*import router from '@/router';*/

export default {
  name: "one-product",
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
    IonImg
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
    dellItemCart(id){
        return;
    }
  },
};
</script>