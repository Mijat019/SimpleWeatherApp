<template>
  <v-card flat>
    <v-card-title>{{ current.weather[0].main }}</v-card-title>
    <v-card-subtitle>{{ current.weather[0].description }}</v-card-subtitle>
    <v-card-text max-width="50%">
      <v-row>
        <v-col
          ><strong>Temperature:</strong> {{ " " }}
          {{ current.temp }} &deg;C</v-col
        >
        <v-col
          ><strong>Feels like:</strong> {{ " " }}
          {{ current.feels_like }} &deg;C</v-col
        >
        <v-col
          ><strong>Min:</strong> {{ " " }} {{ current.temp_min }} &deg;C</v-col
        >
        <v-col>
          <strong>Max:</strong> {{ " " }} {{ current.temp_max }} &deg;C</v-col
        >
      </v-row>
      <v-row>
        <v-col
          ><strong>Pressure:</strong> {{ " " }}
          {{ current.pressure }} hPa</v-col
        >
        <v-col
          ><strong> Humidity:</strong> {{ " " }} {{ current.humidity }} %</v-col
        >
      </v-row>
      <v-row
        ><v-col>
          <strong> Sunrise:</strong> {{ " " }} {{ sunrise }}</v-col
        ></v-row
      >
      <v-row
        ><v-col>
          <strong> Sunset: </strong> {{ " " }} {{ sunset }}</v-col
        ></v-row
      >
    </v-card-text>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  name: "CurrentWeather",
  data: () => ({}),
  props: ["current"],
  computed: {
    sunrise() {
      return moment.unix(this.current.sunrise).format("LT");
    },

    sunset() {
      return moment.unix(this.current.sunset).format("LT");
    },
  },
};
</script>

<style></style>
