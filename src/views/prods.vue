<template>
  <!-- List of Text Items -->
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
</template>

<script>
import apiService from "../apiService";
import { useRouter } from 'vue-router';
import ProductItem from "../components/prods-item.vue"

import {
  
  IonList,
  IonItem,

} from "@ionic/vue";
import router from '@/router';

export default {
  name: "Products",
  components: {
   
    IonList,
    IonItem,
  },
  components:{
ProductItem
  },
  setup() {
      const router = useRouter();
      return { router };
    },
  data: () => ({
    products:[]
  }),
mounted() {
    //  this.$store.dispatch("loadStates");
    this.loadProducts();
  },

  methods: {

      loadProducts(){
 apiService.products.getAll()
        .then((response) => {
          console.log(response.data)
          this.products=response.data;
        })
        .catch((err) => {
          alert(err.menssage || err);
        });
      }
  },
}
</script>