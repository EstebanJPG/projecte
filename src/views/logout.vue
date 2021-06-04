<template>
    <div>
    </div>
</template>

<script>
import router from '@/router';
import { useRouter } from 'vue-router';
export default {
setup() {
      const router = useRouter();
      return { router };
    },

    created(){
        if (localStorage) {
        this.$router.push("/productos");
        localStorage.removeItem('access_token');
        localStorage.removeItem('userID');
        localStorage.removeItem('userName');
        localStorage.removeItem('userAddress');
        return;
      }
         
       
    }
}
</script>