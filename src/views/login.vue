<template>
  <ion-page>
   <ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>     
    <ion-title>
      Login
    </ion-title>
  </ion-toolbar>
</ion-header>
<ion-content>
  <div>
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
         <ion-button small href="/register" class="botonRegister">Register</ion-button>
      </form>
      </div>
    </ion-content>
   </ion-page>
</template>

<script>
import apiService from "../apiService";
import { useRouter } from 'vue-router';

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
  IonMenuButton
  
} from "@ionic/vue";
import router from '@/router';

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
    IonMenuButton
   
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

           response.data.token
            if (response.data.token) {
              localStorage.setItem('access_token', response.data.token)
              
              resolve()
            }
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
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
                this.$router.push("/productos"),
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
<style scoped>
.botonRegister{

 font-size:10px;
        font-family:Verdana,Helvetica;
        font-weight:bold;
        color:white;
        background:#638cb5;
        border:0px;
        width:80px;
        height:19px;
}
</style>