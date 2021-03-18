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
  IonButton,
  IonFooter,
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInputVue,
} from "@ionic/vue";
import router from '@/router';

export default {
  name: "product-item",
  components: {
    IonButton,
    IonFooter,
    IonInput,
    IonList,
    IonItem,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonInputVue,
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
}
</script>
