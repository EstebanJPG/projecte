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
        <ion-card-subtitle>{{ product.price }} €</ion-card-subtitle>
      </div>
      <div>
        <h5>Descripcion</h5>
        <p>{{ product.description }}</p>
        <br>
        <h5>Envio</h5>
        <p>Envío y manipulación</p>
        <p>Envio Gratuito</p>
        <p>Express (Otro envío en 24 horas)</p>
        <p>Envio Previsto el {{ sumarFecha() }}</p>
      </div>
      <div>
        <ion-button
          class="p2"
          expand="block"
          color="danger"
          syze="small"
          @click="addShop"
        >
          Añadir</ion-button
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
      arrayCarrito: [],
    };
  },
  mounted() {
    this.producto();
  },
  methods: {
    sumarFecha() {
      const fecha= new Date();
      fecha.setDate(fecha.getDate() + 10);
      return fecha.getDay()+ " "+ fecha.getMonth()+ " "+fecha.getFullYear();
    },

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

      if (localStorage.getItem("carritoCompras")) {
        this.arrayCarrito = JSON.parse(localStorage.getItem("carritoCompras"));

        this.productoLocal = Object.assign({}, this.product);

        const productRepet = this.arrayCarrito.find(
          (element) => element.id == this.productoLocal.id
        );

        if (productRepet) {
          productRepet.quantity++;

          const indexRepet = this.arrayCarrito.findIndex(
            (element) => element.id == this.productoLocal.id
          );

          this.arrayCarrito.splice(indexRepet, 1, productRepet);
        } else {
          this.productoLocal.quantity = 1;
          this.arrayCarrito.push(this.productoLocal);
        }

        localStorage.removeItem("carritoCompras");
        localStorage.setItem(
          "carritoCompras",
          JSON.stringify(this.arrayCarrito)
        );
        this.$router.push("/carrito");
      } else {
        this.productoLocal = Object.assign({}, this.product);

        this.productoLocal.quantity = 1;

        this.arrayCarrito.push(this.productoLocal);
        localStorage.setItem(
          "carritoCompras",
          JSON.stringify(this.arrayCarrito)
        );
        this.$router.push("/carrito");
      }
    },
    volver() {
      this.$router.push("/productos");
    },
  },
};
</script>
