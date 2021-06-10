<template>
    <div>
    </div>
</template>

<script>

import { useRouter } from 'vue-router';
export default {
setup() {
      const router = useRouter();
      return { router };
    },

    created(){
        if (localStorage) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('userID');
        localStorage.removeItem('userName');
        localStorage.removeItem('userAddress');
        this.$router.go(0);
        return;
      }
         
       
    }
}
</script>