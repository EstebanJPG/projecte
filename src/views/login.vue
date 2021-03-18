<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense" class="ion-padding">
        <ion-toolbar>
          <ion-title size="large">Login</ion-title>
        </ion-toolbar>
      </ion-header>

      <form @submit.prevent="submitForm">
        <ion-list>
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input placeholder="Enter Email" v-model="email"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input
              placeholder="Enter Password"
              v-model="password"
            ></ion-input>
          </ion-item>
        </ion-list>
        <ion-button color="success" type="submit">Submit</ion-button>
        <ion-button color="danger" type="reset">Reset</ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import apiService from "../apiService";
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
  name: "Tab1",
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
  setup() {
      const router = useRouter();
      return { router };
    },
  data: () => ({
    email: "",
    pass: "",
  }),
  methods: {
    getToken() {
      
return new Promise((resolve, reject) => {
        apiService.login.getToken(this.email, this.password)
          .then(response => {

            let token = response.data.token
            if (token) {
              localStorage.setItem('access_token', token)
              
              resolve()
            }
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })



      /*

      //Peticion Token al server
     apiService.login
        .getToken(this.email, this.password)
        .then((response) => {
          const token = response.data.token;
          if (token) {
            localStorage.setItem("access_token", token);

            //Loguear al Usuario
            apiService.search
              .getUser(this.email)
              .then((response) => {
                localStorage.setItem("userName", response.name);
                localStorage.setItem("userID", response.id);
                localStorage.setItem("userAddress", response.address);

                this['router'].push("/");
                console.log("ok");
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          alert(error);
        });*/
    },

    submitForm() {


      this.getToken()
      .then(()=>{
        apiService.search
              .getUser(this.email)
              .then((response) => {
                localStorage.setItem("userName", response.data.name);
                localStorage.setItem("userID", response.data.id);
                localStorage.setItem("userAddress", response.data.address);
                this.$router.push("/page/prod"),
                router.push("prod")
                console.log("ok");

              })
              .catch((error) => {
                console.log(error);
              })

      })
     .catch((error) => {
          alert(error);
        });
  },
    }
  
  
};
</script>