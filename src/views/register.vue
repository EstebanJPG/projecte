<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title> Register </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="row d-flex justify-content-center">
        <div class="col-sm-6 col-md-4 col-lg-4">
          <h1>Registrate en BatoiLogic</h1>

          <form @submit.prevent="onSubmit()" @reset.prevent="reset()">
            <ion-list>
              <div class="form-group">
                <ion-item>
                  <ion-label position="floating">Nombre</ion-label>
                  <ion-input
                    type="text"
                    class="form-control"
                    placeholder="name"
                    v-model="user.name"
                  ></ion-input>
                </ion-item>
              </div>

              <div class="form-group">
                <ion-item>
                  <ion-label position="floating">Surname</ion-label>
                  <ion-input
                    type="text"
                    class="form-control"
                    placeholder="surname"
                    v-model="user.surname"
                  ></ion-input>
                </ion-item>
              </div>

              <div class="form-group">
                <ion-item>
                  <ion-label position="floating">Email</ion-label>
                  <ion-input
                    type="email"
                    class="form-control"
                    placeholder="email"
                    v-model="user.email"
                  ></ion-input>
                </ion-item>
              </div>

              <div class="form-group">
                <ion-item>
                  <ion-label position="floating">Password</ion-label>
                  <ion-input
                    type="password"
                    class="form-control"
                    placeholder="password"
                    v-model="user.password"
                  ></ion-input>
                </ion-item>
              </div>

              <div class="form-group">
                <ion-item>
                  <ion-label position="floating">PasswordConfirm</ion-label>
                  <ion-input
                    type="password"
                    class="form-control"
                    placeholder="PasswordConfirm"
                    v-model="user.confirm"
                  ></ion-input>
                </ion-item>
              </div>

              <div class="form-group">
                <ion-item>
                  <ion-label position="floating">Address</ion-label>
                  <ion-input
                    type="text"
                    class="form-control"
                    placeholder="address"
                    v-model="user.address"
                  ></ion-input>
                </ion-item>
              </div>

              <div class="form-group">
                <ion-item>
                  <ion-checkbox v-model="confirm"></ion-checkbox>
                  He leido y acepto la politica de privacidad y el tratamiento
                  de mis datos personales
                </ion-item>
              </div>
              <div class="boton">
              <ion-button color="success" type="submit">Submit</ion-button>
              <ion-button color="danger" type="reset" >Reset</ion-button>
              </div>
            </ion-list>
          </form>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { alertController } from '@ionic/core'
import apiService from "../apiService"
import { useRouter } from "vue-router";

import {
  IonButton,
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonCheckbox,
} from "@ionic/vue";
import router from "@/router";

export default {
  name: "Tab1",
  components: {
    IonButton,
    IonPage,
    IonInput,
    IonList,
    IonItem,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,

    IonButtons,
    IonMenuButton,
    IonCheckbox,
  },
 

  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      user: {},
      confirm: false,
      
    };
  },
  methods: {


alertIonic(message) {
      return alertController
        .create({
          header: 'Alerta',
          subHeader: 'Informacion',
          message: message,
          buttons: ['OK'],
        })
        .then(a => a.present())
    },


    onSubmit(){




if(!this.user.password==this.user.confirm){
    this.alertIonic("Contraseñas diferentes")
}
if(!this.confirm){
this.alertIonic("Acepta El Checbox")
}

this.user.tipo="customer";
      this.user.rol="customer";
      delete this.user.confirm;

console.log(this.user);
        apiService.users
          .create(this.user)
          .then((response) => {
            if (response.data) {
              this.alertIonic("Se ha añadido con exito");
              this.$router.push("/login");
            }
          })
          .catch((response) => this.alertIonic(response.message));



    },

  
  },
};
</script>
<style scoped>

.boton{
  align-items: center;
  justify-content: center;
  text-align: center;
margin-top: 5vh;
}

form{
  margin: 5vh;
}

h1{
  text-align: center;
}
</style>