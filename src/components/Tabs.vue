<template>
  <v-row>
    <v-col md="6" lg="6" sm="12" cols="6">
      <v-row v-for="(location, index) in getLocations" :key="index">
        <Card :location="location" />
      </v-row>
    </v-col>
    <v-col md="6" lg="6" sm="12" cols="6">
      <v-card>
        <v-card-title>Hourly forecast for the next 48h</v-card-title>
        <v-card-text>
          <v-select v-model="valueType" :items="valueTypes" />
          <Graph :valueType="valueType" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Graph from "./Graph";
import Card from "./Card";
import { mapGetters } from "vuex";
export default {
  name: "Tabs",
  components: {
    Graph,
    Card
  },
  data: () => ({
    tab: null,
    valueType: "Temperature C",
    valueTypes: ["Temperature C", "Pressure hPa", "Humidity %"]
  }),
  computed: {
    ...mapGetters(["getLocations"])
  }
};
</script>

<style>
.fixed {
  position: absolute;
  top: 0;
  right: 0;
}

@media (max-width: 992px) {
  .fixed {
    position: relative;
  }
}
</style>
