export const options = {
  chart: {
    type: "candlestick",
    height: 300,
    // background: "beige",
  },
  title: {
    text: "CandleStick Chart",
    align: "left",
    style: {
      color: "#000",
      fontWeight: "semi-bold",
    },
  },
  xaxis: {
    labels: {
      type: "datetime",
      style: {
        colors: "#000",
        fontWeight: "semi-bold",
      },
      formatter: function (value) {
        const options = { month: "long", day: "numeric" };
        return new Date(value)?.toLocaleString("en-US", options);
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#000",
        fontWeight: "semi-bold",
      },
      formatter: function (val, index) {
        return val.toFixed(2);
      },
      tooltip: {
        enabled: true,
      },
    },
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: "#00B746",
        downward: "#EF403C",
      },
    },
  },
  theme: {
    monochrome: {
      color: {
        upword: {
          ranges: [],
        },
      },
    },
  },
  legend: {
    markers: {
      // fillColors: ["#00ff00", "#0000ff"],
    },
  },
  // stroke: {
  //   show: true,
  //   curve: "smooth",
  //   lineCap: "butt",
  //   // colors: ["#d1d1d1", "#00B746"],
  //   width: 2,
  //   dashArray: [6, 14],
  //   fill: "transparent",
  // },
};
