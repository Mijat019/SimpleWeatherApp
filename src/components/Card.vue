<template>
  <v-card class="table-card" min-width="100%">
    <v-card-title>{{ location.name }}, {{ location.country }}</v-card-title>
    <v-card-subtitle>{{ time }}</v-card-subtitle>
    <v-card-text>
      <v-select
        v-model="select"
        :items="['Hourly (48h forecast)', 'Current weather']"
        label="Show data"
      />
      <v-data-table
        v-if="select === 'Hourly (48h forecast)'"
        :headers="headersHourly"
        :items="location.hourly"
      ></v-data-table>

      <CurrentWeather v-if="select === 'Current weather'" :current="location.current" />
    </v-card-text>
  </v-card>
</template>

<script>
import moment from "moment-timezone";
import CurrentWeather from "./CurrentWeather";
export default {
  name: "Card",
  components: { CurrentWeather },
  props: ["location"],
  data: () => ({
    select: "Current weather",
    showCurrent: false,
    headersHourly: [
      { text: "Time", value: "dt" },
      { text: "Temperature C", value: "temp", sortable: false },
      { text: "Pressure hPa", value: "pressure", sortable: false },
      { text: "Humidity %", value: "humidity", sortable: false }
    ]
  }),

  methods: {
    toggleShowCurrent() {
      this.showCurrent = !this.showCurrent;
    }
  },

  computed: {
    time() {
      const date = moment.unix(this.location.current.dt);
      date.tz(this.location.timezone);
      return date.format("LLLL");
    }
  }
};
</script>

<style>
.table-card {
  margin-bottom: 1em;
}
</style>
