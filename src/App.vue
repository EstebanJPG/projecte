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
              <ion-item>
              <ion-label>DarkMode</ion-label>
              <ion-toggle @ionChange="change" value="dark"> </ion-toggle>
            </ion-item>
              <ion-item href="/productos">
                <ion-label
                  ><ion-icon name="home"></ion-icon> Productos
                </ion-label>
              </ion-item>
              <ion-item v-if="!logget" href="/login">
                <ion-icon name="contact"></ion-icon>
                <ion-label> Login </ion-label>
              </ion-item>
              <ion-item v-if="logget" href="/logout">
                <ion-icon slot="start" name="'logout'"></ion-icon>
                <ion-label> Logout </ion-label>
              </ion-item>
              <ion-item v-if="logget" href="/carrito">
                <ion-icon slot="start" name="'carrito'"></ion-icon>
                <ion-label> Carrito </ion-label>
              </ion-item>
              <ion-item v-if="logget" href="/pedidos">
                <ion-icon slot="start" name="'pedidos'"></ion-icon>
                <ion-label> Pedidos </ion-label>
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
  IonToggle,
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
    IonToggle,
  },
  data: () => ({
    logget: localStorage.getItem("access_token"),
    darkMode: false,
  }),

  mounted() {
    this.changeDarkMode();
  },
  methods: {
    changeDarkMode() {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
      if (prefersDark.matches) {
        document.body.classList.toggle("dark");
      }
    },
    change() {
      if (this.darkMode == false) {
        document.body.classList.toggle("dark");
      } else {
        this.darkMode = true;
        document.body.classList.toggle("dark");
      }
    },
  },
});
</script>
<style>

</style>