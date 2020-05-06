import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import config from "../config";
import moment from "moment-timezone";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locations: [],
    snackbar: {
      text: "",
      show: false,
      color: "",
    },
  },
  mutations: {
    addLocation(state, location) {
      location.hourly = location.hourly.map((el) => ({
        ...el,
        dt: (() => {
          const date = moment.unix(el.dt);
          date.tz(location.timezone);
          return date.format("MM.DD LT");
        })(),
      }));

      state.locations.push(location);
    },

    removeLocation(state, location) {
      const index = state.locations.findIndex((el) => el === location);
      state.locations.splice(index, 1);
    },

    showSnackbar(state, data) {
      state.snackbar.text = data.text;
      state.snackbar.show = true;
      state.snackbar.color = data.color;
      console.log(state.snackbar);
    },

    closeSnackbar(state) {
      state.snackbar.text = "";
      state.snackbar.show = false;
      state.snackbar.color = "";
    },

    setSnackbar(state, value) {
      state.snackbar.show = value;
    },
  },
  actions: {
    async addLocationAction({ dispatch, commit }, locationName) {
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${config.apiKey}&units=metric`
        );
        const location = { ...data.coord, ...data };
        dispatch("getDataForLocation", location);
      } catch (error) {
        commit("showSnackbar", {
          text: "Location doesn't exist.",
          color: "error",
        });
        console.log(error);
      }
    },

    async getDataForLocation({ commit }, location) {
      try {
        const { lon, lat } = location;
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${config.apiKey}&units=metric`
        );
        data.name = location.name;
        data.current.temp_max = location.main.temp_max;
        data.current.temp_min = location.main.temp_min;
        data.country = location.sys.country;
        commit("addLocation", data);
      } catch (error) {
        commit("showSnackbar", {
          text: "Location doesn't exist.",
          color: "error",
        });
        console.log(error);
      }
    },
  },
  getters: {
    getLocations: (state) => state.locations,
    getSnackbar: (state) => state.snackbar.show,
    getText: (state) => state.snackbar.text,
    getColor: (state) => state.snackbar.color,
  },
  modules: {},
});
