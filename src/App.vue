<template>
  <v-app class="main__page">
    <vheader />
    <router-view />

    
  </v-app>
</template>

<script>
import vheader from "./views/Header";

export default {
  name: "App",

  components: {
    vheader,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
#app {
  background-color: rgb(255, 255, 255);
}
</style>
