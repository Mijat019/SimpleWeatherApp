<template>
  <v-app>
    <Toolbar />
    <v-content>
      <Home />
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar";
import Home from "./views/Home";

export default {
  name: "App",

  components: {
    Toolbar,
    Home
  },

  data: () => ({})
};
</script>
