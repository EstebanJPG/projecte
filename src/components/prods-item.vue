<template>
  <div class="espacio"></div>
  <ion-card>
    <ion-img :src="product.photo" @click="ver"></ion-img>
    <ion-card-header>
      <ion-card-subtitle>{{ product.stock }} en Stock</ion-card-subtitle>
      <ion-card-subtitle>{{ product.price}} €</ion-card-subtitle>
      <ion-card-title>{{ product.name }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      {{ product.description }}
    </ion-card-content>
    
    <ion-button color="danger" syze="small" @click="addShop">Añadir</ion-button>
    <ion-button style="float: right;" color="success" syze="small" @click="ver">Ver</ion-button>
  </ion-card>
</template>
<script>
import { useRouter } from "vue-router";

import {
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
} from "@ionic/vue";

export default {
  name: "product-item",
  components: {
    IonImg,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCard,
    IonButton,
  },
  props: ["product"],
  setup() {
    const router = useRouter();
    return { router };
  },
  data: () => ({
    email: "",
    pass: "",
    arrayCarrito: [],
    productoLocal: {},
  }),

  filters: {
    shortDescription(value) {
      if (value && value.length > 100) {
        return value.substring(0, 100) + "...";
      } else {
        return value;
      }
    },
  },

  methods: {
    ver() {
      this.$router.push("/productos/" + this.product.id);

      return;
    },

    addShop() {
      
      if (!localStorage.getItem("access_token")) {
        this.$router.push("/login");
        return;
      }


if (localStorage.getItem("carritoCompras")) {

 this.arrayCarrito=JSON.parse(localStorage.getItem("carritoCompras"));
  


    this.productoLocal = Object.assign({} , this.product);

    const productRepet= this.arrayCarrito.find(element => element.id == this.productoLocal.id);

      if (productRepet) {
        
        productRepet.quantity++;

        const indexRepet = this.arrayCarrito.findIndex(element => element.id == this.productoLocal.id);

        this.arrayCarrito.splice(indexRepet, 1, productRepet);
      }else{

        this.productoLocal.quantity = 1;
        this.arrayCarrito.push(this.productoLocal);
      }

  localStorage.removeItem("carritoCompras");
  localStorage.setItem("carritoCompras", JSON.stringify(this.arrayCarrito));
  this.$router.push("/carrito");

}else{
        this.productoLocal = Object.assign({} , this.product);
        
        this.productoLocal.quantity = 1;
       
        this.arrayCarrito.push(this.productoLocal);
        localStorage.setItem(
          "carritoCompras",
          JSON.stringify(this.arrayCarrito)
        );
   this.$router.push("/carrito");
}
       
    },
  },
};
</script>
