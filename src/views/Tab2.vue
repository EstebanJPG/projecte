<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 2</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-item :key="t.id" v-for="t in todos">
          <ion-label>{{ t.content }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-input placeholder="Enter Item" v-model="inputState"></ion-input>
        <ion-button slot="end" v-on:click="addTodo" >Add</ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script>
import { IonButton, IonFooter, IonInput, IonList, IonItem, IonLabel, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default  {
  name: 'Tab1',
  components: { IonButton, IonFooter, IonInput, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data: () => ({
    inputState: '',
    todos: [
      { id: 1, content: "Do the laundry" },
      { id: 2, content: "Buy Christmas gifts" },
      { id: 3, content: "Spellcheck my draft" },
    ]
  }),
  methods: {
    addTodo() {
      this.todos.push({ id: this.todos.length, content: this.inputState })
      this.inputState = ''
    }
  }
}
</script>