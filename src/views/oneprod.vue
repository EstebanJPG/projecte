<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>
          {{ product.name }}
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-title> {{ product.name }}</ion-title>
      <div>
        <ion-img :src="product.photo"></ion-img>

        <ion-card-subtitle>{{ product.stock }} en Stock</ion-card-subtitle>
      </div>
      <div>
        <h5>Descripcion</h5>
        <p>{{ product.description }}</p>
        <br />
        <h5>Envio</h5>
        <p>Envío y manipulación</p>
        <p>Envio Gratuito</p>
        <p>Express (Otro envío en 24 horas)</p>
        <p>Prevista el {{ date }}</p>
      </div>
      <div >
        <ion-button class="p2" expand="block"  color="danger" syze="small" @click="addShop">
          Añadir</ion-button
        >
         </div>
         <div>
        <ion-button expand="full"  color="success" syze="small" @click="volver">
          Volver</ion-button
        >
        </div>
     
    </ion-content>
  </ion-page>
</template>

<script>
import apiService from "../apiService";
import { useRouter } from "vue-router";

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonImg,
  IonCardSubtitle,
  IonButton,
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
    IonImg,
    IonCardSubtitle,
    IonButton,
  },

  props: ["id"],
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      product: {},
      date: new Date(),
      arrayCarrito: [],
    };
  },
  mounted() {
    this.producto();
  },
  methods: {
    producto() {
      apiService.products
        .getOne(this.id)
        .then((response) => {
          console.log("holaa" + response);
          this.product = response.data;
        })
        .catch((response) => {
          alert(response);
        });
    },

    addItem() {
      this.$store.dispatch("addToCard", this.product);
      this.$router.push("/carrito");
    },
    addShop() {
      if (!localStorage.getItem("access_token")) {
        this.$router.push("/login");
        return;
      }
      this.arrayCarrito = JSON.parse(localStorage.getItem("carritoCompras"));
      this.arrayCarrito.push(this.product);
      localStorage.setItem("carritoCompras", JSON.stringify(this.arrayCarrito));
    },
    volver(){
       this.$router.push("/productos");
    }
  },
};
</script>
