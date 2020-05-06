<script>
import { Line } from "vue-chartjs";
import { mapGetters } from "vuex";
export default {
  extends: Line,
  name: "Graph",
  props: ["valueType"],
  data() {
    return {
      config: {
        datasets: [],
        labels: [],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Hour",
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Temperature",
              },
              ticks: {
                max: 0,
                min: 0,
                stepSize: 5,
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.show();
  },
  computed: {
    ...mapGetters(["getLocations"]),
    type() {
      if (this.valueType === "Temperature C") {
        return "temp";
      } else if (this.valueType === "Pressure hPa") {
        return "pressure";
      }

      return "humidity";
    },
  },
  methods: {
    generateRandomColor() {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
    },

    show() {
      this.config.labels = [];
      this.config.datasets = [];
      this.config.labels = this.getLocations[0].hourly.map((el) => el.dt);
      this.options.scales.yAxes[0].ticks.min = 0;
      this.options.scales.yAxes[0].ticks.max = 0;
      this.options.scales.yAxes[0].scaleLabel.labelString = this.valueType;
      this.getLocations.forEach((location) => {
        const temps = location.hourly.map((el) => el[this.type]);
        const min = Math.min(...temps);
        const max = Math.max(...temps);
        if (this.options.scales.yAxes[0].ticks.min > min) {
          this.options.scales.yAxes[0].ticks.min = min;
        }

        if (this.options.scales.yAxes[0].ticks.max < max) {
          this.options.scales.yAxes[0].ticks.max = max;
        }

        const color = this.generateRandomColor();
        this.config.datasets.push({
          label: location.name,
          data: temps,
          fill: false,
          backgroundColor: color,
          borderColor: color,
        });
      });
      this.renderChart(this.config, this.options);
    },
  },
  watch: {
    getLocations() {
      this.show();
    },

    valueType() {
      this.show();
    },
  },
};
</script>

<style></style>
