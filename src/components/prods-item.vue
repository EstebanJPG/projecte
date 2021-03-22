<template>
    <ion-item>
    <ion-thumbnail slot="start">
        <ion-img :src="product.photo"></ion-img>
      </ion-thumbnail>
      <ion-label>{{product.name}}</ion-label>
      <ion-label>{{product.stock}} Nº Stock</ion-label>
      <ion-label>{{ product.description }}</ion-label>

    </ion-item>
</template>
<script>
import { useRouter } from 'vue-router';

import {
  
  IonItem,
  IonLabel,
  IonImg,
  IonThumbnail
} from "@ionic/vue";
/*import router from '@/router';*/

export default {
  name: "product-item",
  components: {
   
    IonItem,
    IonLabel, 
    IonImg,
    IonThumbnail
  },
  props:["product"],
  /*setup() {
      const router = useRouter();
      return { router };
    },*/
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
}
</script>
