<template>
  <ion-page>
   <ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>     
    <ion-title>
      Register
    </ion-title>
  </ion-toolbar>
</ion-header>
<ion-content>



<div class="row d-flex justify-content-center">
    <div class="col-sm-6 col-md-4 col-lg-4">
      <h1>Registrate en BatoiLogic</h1>
      <ValidationObserver ref="form" v-slot="{ handleSubmit, reset}">
        <form @submit.prevent="handleSubmit(onSubmit)" @reset.prevent="resetear(reset)">
            <ion-list>
          <div class="form-group">
            <ValidationProvider
              vid="name"
              name="name"
              rules="required"
              v-slot="{ errors }"
            >   
        <ion-item>
            <ion-label position="floating">Nombre</ion-label>
            <ion-input type="text" class="form-control" placeholder="name" v-model="user.name"></ion-input>
          </ion-item>
        <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <ValidationProvider
              vid="surname"
              name="name"
              rules="required"
              v-slot="{ errors }"
            >

            <ion-item>
            <ion-label position="floating">Surname</ion-label>
            <ion-input type="text" class="form-control" placeholder="surname" v-model="user.surname"></ion-input>
          </ion-item>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <ValidationProvider
              vid="email"
              name="email"
              rules="required|email"
              v-slot="{ errors }"
            >

<ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input type="email" class="form-control" placeholder="email" v-model="user.email"></ion-input>
          </ion-item>

              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <ValidationProvider
              vid="password"
              name="password"
              rules="required|max:25|passwordStrong"
              v-slot="{ errors }"
            >
<ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input type="password" class="form-control" placeholder="password" v-model="user.password"></ion-input>
          </ion-item>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <ValidationProvider
              vid="confirm"
              name="confirm"
              rules="required|password:@password"
              v-slot="{ errors }"
            >

<ion-item>
            <ion-label position="floating">PasswordConfirm</ion-label>
            <ion-input type="password" class="form-control" placeholder="PasswordConfirm" v-model="user.confirm"></ion-input>
          </ion-item>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <ValidationProvider
              vid="address"
              name="address"
              rules="required|min:5|max:80"
              v-slot="{ errors }"
            >

<ion-item>
            <ion-label position="floating">Address</ion-label>
            <ion-input type="text" class="form-control" placeholder="address" v-model="user.address"></ion-input>
          </ion-item>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <ValidationProvider
              vid="checkbox"
              name="checkbox"
              :rules="{required: { allowFalse: false }}"
              v-slot="{ errors }"
            >

            <ion-item>
            
            <ion-input type="checkbox" class="form-control" v-model="confirm"></ion-input>
            He leido y acepto la politica de privacidad y el tratamiento de
              mis datos personales
          </ion-item>
              
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <ion-button color="success" type="submit">Submit</ion-button>
        <ion-button color="danger" type="reset">Reset</ion-button>
          </ion-list>
        </form>
        
      </ValidationObserver>
    </div>
  </div>
















 <!-- <div>
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
      </div>-->
    </ion-content>
   </ion-page>
</template>

<script>

import { ValidationProvider, ValidationObserver } from "vee-validate";
import { extend } from "vee-validate";
import {
  required,
  /*alpha_spaces,*/
  email,
  min,
  max,
  length,
  numeric,
} from "vee-validate/dist/rules";
import { localize } from "vee-validate";
extend("required", required);
/*extend("alpha_spaces", alpha_spaces);*/
extend("email", email);
extend("min", min);
extend("max", max);
extend("numeric", numeric);
extend("lenght", length);
extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Password no Coincide",
});
extend("passwordStrong",{
validate:(value)=>{
  return value.match("(?=.*[a-z])(?=.*[A-Z]).{8,}");
},
message:"El campo tiene que tener:1 Mayuscula, 1 Minuscula ,1 Numero  y tener min 8 caracteres"
});
import es from "vee-validate/dist/locale/es.json";



localize("es", es);


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
    IonMenuButton,
    ValidationProvider,
    ValidationObserver
   
  },
  setup() {
      const router = useRouter();
      return { router };
    },
 data() {
    return {
      user: {},
      confirm:false
    };
  },
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