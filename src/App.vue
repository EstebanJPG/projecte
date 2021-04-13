<template>
  <ion-app>
    <ion-split-pane contentId="main-content">
      <ion-menu contentId="main-content">
        <ion-header>
          <ion-toolbar>
            <ion-title>Menu</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-menu-toggle auto-hide="false">
              <ion-item href="/productos">
                <ion-icon slot="start" name="'productos'"></ion-icon>
                <ion-label> Productos </ion-label>
              </ion-item>
              <ion-item
                v-if="!logget"
                href="/login"
              >
                <ion-icon slot="start" name="'login'"></ion-icon>
                <ion-label> Login </ion-label>
              </ion-item>
              <ion-item
                v-if="logget"
                href="/logout"
              >
                <ion-icon slot="start" name="'logout'"></ion-icon>
                <ion-label> Logout </ion-label>
              </ion-item>
               <ion-item
                v-if="logget"
                href="/carrito"
              >
                <ion-icon slot="start" name="'carrito'"></ion-icon>
                <ion-label> Carrito </ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
      
      <ion-router-outlet id="main-content"></ion-router-outlet>
      
    </ion-split-pane>
  </ion-app>
</template>

<script lang="ts">
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
 
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    IonSplitPane,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    
  },
  data: () => ({
    logget:localStorage.getItem('access_token')
  }),
});
</script>