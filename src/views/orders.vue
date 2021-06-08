<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title> Orders </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-margin">
      <ion-grid class="ion-margin">
        <ion-row>
          <ion-col>ID</ion-col>
          <ion-col>State</ion-col>
          <ion-col>Created</ion-col>
          <ion-col>Reportar</ion-col>
          <ion-col>Incidentes</ion-col>
        </ion-row>
        <ion-row v-for="(order, index) in orders" :key="index">
          <ion-col>{{ order.id }}</ion-col>
          <ion-col>{{ estados(order.state) }} €</ion-col>
          <ion-col>{{ dateformat(order.created_at) }} </ion-col>
          <ion-col>
            <ion-button
              class="p2"
              expand="block"
              color="danger"
              syze="small"
              @click="reportOrder"
            >
              Report</ion-button
            >

            <div
              disabled
              hidden
              v-if="!order.report"
              variant="outline-primary"
              class="btn btn-sm"
            >
             <ion-icon name="checkbox"></ion-icon>
            </div>

            <button
              disabled
              hidden
              v-if="order.report"
              variant="outline-primary"
              class="btn btn-sm"
              @click="clearReportOrder"
            >
             <ion-icon name="checkbox"></ion-icon>
            </button>
          </ion-col>
          <ion-col v-if="order.report"
            ><ion-button
              color="primary"
              size="small"
              @click="verReport(order)"
              >Ver incidente</ion-button
            ></ion-col>

            <ion-col v-if="!order.report"
            >Sin incidentes</ion-col>
        </ion-row>
      </ion-grid>

      

      <div>
        <ion-button
          class="p2"
          expand="block"
          color="danger"
          syze="small"
          @click="presentConfirm"
        >
          Procesar</ion-button
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
  IonImg,
  IonInput,
  IonIcon
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
    IonImg,
    IonInput,
    IonIcon
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

    presentConfirm() {
      const alert = this.alertCtrl.create({
        title: "Confirma",
        message: "Estas Seguro de querer continuar?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            },
          },
          {
            text: "Ok",
            handler: () => {
              console.log("Buy clicked");
              this.addOrder();
            },
          },
        ],
      });
      alert.present();
    },

    volver() {
      this.$router.push("/productos");
    },

    estados(id) {
      return orders.find((item) => item.id == id);
    },

    loadOrders() {
      apiService.searchOrders
        .getOrders(this.id)
        .then((response) => {
          this.orders = response.data;
        })
        .catch((response) => this.alertIonic(response.message));
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
</style>