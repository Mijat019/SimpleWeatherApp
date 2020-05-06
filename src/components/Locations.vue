<template>
  <v-row>
    <h3>Locations</h3>
    <v-col cols="12">
      <v-row>
        <v-chip
          v-for="(location, i) in getLocations"
          :key="i"
          small
          class="ma-2"
          close
          close-icon="mdi-close"
          @click:close="close(location)"
        >{{ location.name }}</v-chip>

        <v-btn
          v-if="!addingLocation || !getLocations"
          fab
          small
          dark
          depressed
          color="blue"
          @click="toggleAddLocation"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-row v-else>
          <v-col class="input-field">
            <v-text-field
              label="Enter a city name"
              v-model="location"
              v-on:keyup.enter="addLocationClicked"
              dense
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn color="primary" @click="addLocationClicked" small>Add</v-btn>
            {{" "}}
            <v-btn color="error" small @click="toggleAddLocation">cancel</v-btn>
          </v-col>
        </v-row>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Locations",
  data: () => ({
    addingLocation: false,
    location: ""
  }),
  mounted() {
    if (this.getLocations.length === 0) {
      this.addingLocation = true;
    }
  },
  computed: {
    ...mapGetters(["getLocations"])
  },
  methods: {
    ...mapMutations(["removeLocation"]),
    ...mapActions(["addLocationAction"]),

    close(location) {
      this.removeLocation(location);
    },

    toggleAddLocation() {
      this.location = "";
      this.addingLocation = !this.addingLocation;
    },

    async addLocationClicked() {
      if (!this.location) {
        return;
      }

      await this.addLocationAction(this.location);
      this.location = "";
      this.addingLocation = false;
    }
  }
};
</script>

<style>
.input-field {
  padding: 0;
  margin: 0;
}
</style>
