<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title> Pedidos </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-margin">
      <div>
      <div v-if="orders.length>0"  style="font-size: 0.8em;">
      <ion-grid style="--ion-grid-column-padding-s">
        <ion-row class="row">
          <ion-col size="2">ID</ion-col>
          <ion-col size="2">State</ion-col>
          <ion-col size="3">Created</ion-col>
          <ion-col size="5">Reports/Incidents</ion-col>
         
        </ion-row>
        <ion-row v-for="(order, index) in orders" :key="index">
          <ion-col size="2">{{ order.id }}</ion-col>
          <ion-col size="3">{{ estados(order.state) }} </ion-col>
          <ion-col size="3">{{ dateformat(order.created_at) }} </ion-col>
          <ion-col size="4">
            <ion-button
              class="p2"
              expand="block"
              color="danger"
              syze="small"
              @click="reporteInsert(order)"
            >
              Report</ion-button>

            <div
              disabled
              hidden
              v-if="!order.report"
              variant="outline-primary"
              class="btn btn-sm"
            >
             <ion-icon name="checkbox"></ion-icon>
            </div>

            <ion-button
              disabled
              hidden
              v-if="order.report"
              variant="outline-primary"
              class="btn btn-sm"
              @click="clearReportOrder"
            >
             <ion-icon name="checkbox"></ion-icon>
            </ion-button>
            <ion-button v-if="order.report" class="boton"
              color="primary"
              size="small"
              @click="alertIonic(order.report)"
              >Incident</ion-button
            >

          
          <p v-if="!order.report"> Sin incidentes</p>
          </ion-col>
        
            
        </ion-row>
      </ion-grid>
      </div>
      <div v-if="orders.length==0">
      <h3 style=" text-align: center;">No hay ningún Pedido</h3>
      </div>
          
    

   
      <div>
        <ion-button expand="full" color="success" syze="small" @click="volver">
          Volver</ion-button>
       </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { useRouter } from "vue-router";
import apiService from "../apiService";
import { alertController } from "@ionic/core";

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
  IonIcon,
} from "@ionic/vue";
/*import router from '@/router';*/

export default {
  name: "orders",
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
    IonIcon,
  },

  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      id: localStorage.getItem("userID"),
      orders: [],
      states: [
        {
          name: "Preparado",
          id: 1,
        },
        {
          name: "Ruta",
          id: 2,
        },
        {
          name: "Entregado",
          id: 3,
        },
        {
          name: "No Entregado",
          id: 4,
        },
      ],
      reporte:"",
    };
  },

  mounted() {
    //  this.$store.dispatch("loadStates");
    this.loadOrders();
  },

  methods: {
    alertIonic(message) {
      return alertController
        .create({
          header: "Alert",
          subHeader: "Informacion",
          message: message,
          buttons: ["OK"],
        })
        .then((a) => a.present());
    },

    async reporteInsert(order) {

    
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Inserta el reporte',
          inputs: [
            {
              name: 'reporte',
              id: 'reporte-id',
              placeholder: 'Inserta el Reporte',
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel')
              },
            },
            {
              text: 'Ok',
              handler: () => {
                const report=document.getElementById("reporte-id").value;
             this.editOrderState(order, report)
               
             
              },
            },
          ],
        });
      return alert.present();
    },

    volver() {
      this.$router.push("/productos");
    },

    estados(id) {
      return this.states.find((item) => item.id == id).name;
    },
    dateformat(created) {
      const j = new Date(created);

      return j.toLocaleDateString() + " " + j.toLocaleTimeString();
    },

    loadOrders() {
    const iDD=  localStorage.getItem("userID");
      apiService.searchOrders
        .getOrders(iDD)
        .then(response => {
          this.orders = response.data;
        })
        .catch((response) => this.alertIonic(response.message));
    },
    editOrderState(order1, reporte) {
      order1.report=reporte;
      apiService.ordersApi
        .modify(order1)
        .then((response) => {
         this.order.report=response.data.report
        })
        .catch((response) => {
          this.alertIonic(response.message);
        });
    },
  },
};
</script>
<style>
.icon-big {
  display: block;
  color: white;
  margin-bottom: 5px;
}
.total {
  text-align: right;
}

.boton{
  --width: 40px;
  --height: 40px;
  --vertical-align: middle;
  --padding-start: 10px;
  --padding-end: 10px;
}
</style>