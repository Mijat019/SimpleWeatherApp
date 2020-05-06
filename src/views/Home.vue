<template>
  <div>
    <Snackbar />
    <v-container v-if="!getLocations.length" class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title>Enter location</v-card-title>
            <v-card-text>
              <v-text-field
                label="Enter city name here"
                v-model="location"
                v-on:keyup.enter="submit"
              ></v-text-field>
              <v-btn color="primary" @click="submit">Add</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <Locations />
      <Tabs />
    </v-container>
  </div>
</template>

<script>
import Locations from "../components/Locations";
import Tabs from "../components/Tabs";
import Snackbar from "../components/Snackbar";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    Locations,
    Tabs,
    Snackbar
  },
  computed: {
    ...mapGetters(["getLocations"])
  },
  data: () => ({
    location: ""
  }),

  methods: {
    ...mapActions(["addLocationAction"]),
    submit() {
      this.addLocationAction(this.location);
      this.location = "";
    }
  }
};
</script>
