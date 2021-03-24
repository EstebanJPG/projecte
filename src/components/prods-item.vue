<template>
<div class="espacio"></div>
<ion-card>
         <ion-img :src="product.photo"></ion-img>
        <ion-card-header>
          <ion-card-subtitle>{{product.stock}} en Stock</ion-card-subtitle>
          <ion-card-title>{{product.name}}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          {{product.description}}
        </ion-card-content>
        
        <ion-button color="danger" syze="small"  @click="addShop">Añadir</ion-button>
        <ion-button color="success" syze="small" @click="ver">Ver</ion-button>
      </ion-card>


</template>
<script>
import { useRouter } from 'vue-router';

import {
  
IonImg,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton
  
} from "@ionic/vue";
import router from '@/router';

export default {
  name: "product-item",
  components: {
   
    IonImg,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCard,
    IonButton
  
  },
  props:["product"],
  setup() {
      const router = useRouter();
      return { router };
    },
  data: () => ({
    email: "",
    pass: "",
  }),

  filters: {
    shortDescription(value) {
      if (value && value.length > 100) {
        return value.substring(0, 100) + '...';
      } else {
        return value;
      }
    }
  },

  methods:{

    ver(){
      console.log("sssH")
this.$router.push("/productos/"+this.product.id)

return;
    },

    addShop(){
return;
    }
  }
}
</script>
