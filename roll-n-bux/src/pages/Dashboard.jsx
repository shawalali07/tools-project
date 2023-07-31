import "./dashboard.css";
import Chart from "../components/dashboard/chart";
import { useChart, usePrediction } from "../hooks/useCrypto";
import Skeleton from "../components/skeleton/Skeleton";
import CurrencyDetails from "../components/dashboard/currenctDetails";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { newData, isLoading, data } = useChart("ETHBUSD", "1m", 50);
  const { prediction } = usePrediction();
  const [binanceData, setBinanceData] = useState();

  useEffect(() => {
    if (newData?.length && prediction?.length) {
      const combinedData = [...newData, prediction[0]];
      setBinanceData(combinedData);
    } else if (newData?.length) {
      setBinanceData(newData);
    }
  }, [newData, prediction]);

  return (
    <div className="dashboard">
      {isLoading ? (
        <Skeleton type="chart" />
      ) : (
        <>
          <Chart data={binanceData} />
          <CurrencyDetails data={data?.data?.data} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
