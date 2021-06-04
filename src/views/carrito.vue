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
      <ion-col>Producto</ion-col>
      <ion-col>Precio</ion-col>
      <ion-col>Cantidad</ion-col>
      <ion-col>Eliminar</ion-col>
      <ion-col></ion-col>
    </ion-row>
    <ion-row v-for="(producto, index) in carrito" :key="index">
      <ion-col><ion-img :src="producto.photo"></ion-img></ion-col>
      <ion-col>{{producto.price}}</ion-col>
      <ion-col>{{producto.quantity}}</ion-col>
      <ion-col><ion-button color="danger" syze="small"  @click="dellItemCart(producto.id)"> Añadir</ion-button></ion-col>
    </ion-row>
  </ion-grid>
<ion-button color="danger" syze="small"  @click="dellAll"> Eliminar todo carrito</ion-button>
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
    },
    dellAll(){
      localStorage.removeItem("carritoCompras");
    }
  },
};
</script>