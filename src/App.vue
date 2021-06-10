<template>
  <ion-app>

    <!-- Menu Todo lo engloba el split panel para que este pueda ser mostrado en cada componente  -->
    <ion-split-pane contentId="main-content">
      <ion-menu contentId="main-content">
        <ion-header>
          <ion-toolbar>
            <ion-title>Menu</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>

          <!--La lista con las diferente opciones de navegacion -->
          <ion-list>
            <ion-menu-toggle auto-hide="false">
              <!--Opcion toogle para cambiar tema Ocuro/Claro -->
              <ion-item>
              <ion-label>DarkMode</ion-label>
              <ion-toggle @ionChange="change" value="dark" checked> </ion-toggle>
            </ion-item>
              <ion-item href="/productos">
                <ion-label
                  ><ion-icon name="home"></ion-icon> Productos
                </ion-label>
              </ion-item>
              <ion-item v-if="!logget" href="/login">
                <ion-icon name="person-outline"></ion-icon>
                <ion-label> Login </ion-label>
              </ion-item>
              <ion-item v-if="logget" href="/logout">
                <ion-icon  name="logout"></ion-icon>
                <ion-label> Logout </ion-label>
              </ion-item>
              <ion-item v-if="logget" href="/carrito">
                <ion-icon name="cart-outline"></ion-icon>
                <ion-label> Carrito </ion-label>
              </ion-item>
              <ion-item v-if="logget" href="/pedidos">
                <ion-icon name="bag-check-outline"></ion-icon>
                <ion-label> Pedidos </ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>

        <!-- VisTa Router --> 
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