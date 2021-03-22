<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title> Productos </ion-title>
      </ion-toolbar>
    </ion-header>
    <!-- List of Text Items -->
    <ion-content>
      <ion-list>
        <div class="row">
          <product-item
            v-for="product in products"
            :product="product"
            :key="product.id"
          >
          </product-item>
        </div>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import apiService from "../apiService";
/*import { useRouter } from 'vue-router';*/
import ProductItem from "../components/prods-item.vue";

import {
  IonList,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
} from "@ionic/vue";
/*import router from '@/router';*/

export default {
  name: "Products",
  components: {
    IonList,
    ProductItem,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
  },

  /*setup() {
      const router = useRouter();
      return { router };
    },*/
  data: () => ({
    products: [],
  }),
  mounted() {
    //  this.$store.dispatch("loadStates");
    this.loadProducts();
  },

  methods: {
    loadProducts() {
      apiService.products
        .getAll()
        .then((response) => {
          console.log(response.data);
          this.products = response.data;
        })
        .catch((err) => {
          alert(err.menssage || err);
        });
    },
  },
};
</script>
