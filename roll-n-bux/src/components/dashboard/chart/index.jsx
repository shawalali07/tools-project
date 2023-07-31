import "./chart.css";
import ReactApexChart from "react-apexcharts";
import { options } from "../../../constants/chartOptions";
import { BTCIcon, ETHIcon } from "../../../assets/icons";

const Chart = ({ data }) => {
  const series = [{ data }];
  return (
    <div id="chart">
      <div className="chartHeader">
        <p className="chartHeader-crypto">
          <ETHIcon />
          ETH<span>/</span>BUSD
          <BTCIcon />
        </p>
        <div>
          <p>
            0.06162<span>BTC</span>
          </p>
        </div>
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="candlestick"
        height={500}
      />
    </div>
  );
};

export default Chart;
